package entity

import (
	"container/heap"
	"sync"
)

type Book struct {
	Order         []*Order
	Transactions  []*Transaction
	OrdersChan    chan *Order // input
	OrdersChanOut chan *Order
	Wg            *sync.WaitGroup
}

func NewBook(orderChan chan *Order, orderChanOut chan *Order, wg *sync.WaitGroup) *Book {
	return &Book{
		Order:         []*Order{},
		Transactions:  []*Transaction{},
		OrdersChan:    orderChan,
		OrdersChanOut: orderChanOut,
		Wg:            wg,
	}
}

func (b *Book) Trade() {
	buyOrders := make(map[string]*OrderQueue)
	sellOrders := make(map[string]*OrderQueue)

	for order := range b.OrdersChan {
		asset := order.Asset.ID

		if buyOrders[asset] == nil {
			buyOrders[asset] = NewOrderQueue()
			heap.Init(buyOrders[asset])
		}

		if sellOrders[asset] == nil {
			sellOrders[asset] = NewOrderQueue()
			heap.Init(sellOrders[asset])
		}

		if order.IsBuyOrder() {
			b.BuyTrade(order, asset, buyOrders, sellOrders)
		} else if order.IsSellOrder() {
			b.SellTrade(order, asset, buyOrders, sellOrders)
		}
	}
}

func (b *Book) BuyTrade(order *Order, asset string, buyOrders, sellOrders map[string]*OrderQueue) {
	buyOrders[asset].Push(order)
	if sellOrders[asset].Len() > 0 && sellOrders[asset].Orders[0].Price <= order.Price {
		sellOrder := sellOrders[asset].Pop().(*Order)
		if sellOrder.HasPendingShares() {
			transaction := NewTransaction(sellOrder, order, order.Shares, sellOrder.Price)
			b.AddTransaction(transaction, b.Wg)

			sellOrder.Transactions = append(sellOrder.Transactions, transaction)
			order.Transactions = append(order.Transactions, transaction)

			b.OrdersChanOut <- sellOrder
			b.OrdersChanOut <- order

			if sellOrder.HasPendingShares() {
				sellOrders[asset].Push(sellOrder)
			}
		}
	}
}

func (b *Book) SellTrade(order *Order, asset string, buyOrders, sellOrders map[string]*OrderQueue) {
	sellOrders[asset].Push(order)
	if buyOrders[asset].Len() > 0 && buyOrders[asset].Orders[0].Price >= order.Price {
		buyOrder := buyOrders[asset].Pop().(*Order)
		if buyOrder.HasPendingShares() {
			transaction := NewTransaction(order, buyOrder, order.Shares, buyOrder.Price)
			b.AddTransaction(transaction, b.Wg)

			buyOrder.Transactions = append(buyOrder.Transactions, transaction)
			order.Transactions = append(order.Transactions, transaction)

			b.OrdersChanOut <- buyOrder
			b.OrdersChanOut <- order

			if buyOrder.HasPendingShares() {
				buyOrders[asset].Push(buyOrder)
			}
		}
	}
}

func (b *Book) AddTransaction(transaction *Transaction, wg *sync.WaitGroup) {
	defer wg.Done()

	sellingShares := transaction.SellingOrder.PendingShares
	buyingShares := transaction.BuyingOrder.PendingShares

	minShares := sellingShares
	if buyingShares < minShares {
		minShares = buyingShares
	}

	transaction.SellingOrder.Investor.UpdateAssetPosition(transaction.SellingOrder.Asset.ID, -minShares)
	transaction.AddSellOrderPendingShares(-minShares)

	transaction.BuyingOrder.Investor.UpdateAssetPosition(transaction.BuyingOrder.Asset.ID, minShares)
	transaction.AddBuyOrderPendingShares(-minShares)

	transaction.CalculateTotal(transaction.Shares, transaction.BuyingOrder.Price)
	transaction.CloseBuyOrder()
	transaction.CloseSellOrder()
	b.Transactions = append(b.Transactions, transaction)
}
