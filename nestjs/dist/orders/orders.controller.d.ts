import { OrdersService } from './orders.service';
import { InitTransactionDto, InputExecuteTransactionDto } from './order.dto';
type ExecuteTransactionMessage = {
    order_id: string;
    investor_id: string;
    asset_id: string;
    order_type: string;
    status: 'OPEN' | 'CLOSED';
    partial: number;
    shares: number;
    transactions: {
        transaction_id: string;
        buyer_id: string;
        seller_id: string;
        asset_id: string;
        shares: number;
        price: number;
    }[];
};
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    all(wallet_id: string): import(".prisma/client").Prisma.PrismaPromise<({
        Transactions: ({
            id: string;
            price: number;
            created_at: Date;
            updated_at: Date;
            shares: number;
            order_id: string;
            related_investor_id: string;
            broker_transaction_id: string;
        } & {})[];
        Asset: {
            id: string;
            symbol: string;
        };
    } & {
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
        wallet_id: string;
        asset_id: string;
        shares: number;
        version: number;
        type: import(".prisma/client").OrderType;
        status: import(".prisma/client").OrderStatus;
        partial: number;
    } & {})[]>;
    initTransactionDto(wallet_id: string, body: Omit<InitTransactionDto, 'wallet_id'>): Promise<{
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
        wallet_id: string;
        asset_id: string;
        shares: number;
        version: number;
        type: import(".prisma/client").OrderType;
        status: import(".prisma/client").OrderStatus;
        partial: number;
    } & {}>;
    executeTransactionRest(wallet_id: string, body: InputExecuteTransactionDto): Promise<void>;
    executeTransactionConsumer(message: ExecuteTransactionMessage): Promise<void>;
}
export {};
