"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const order_dto_1 = require("./order.dto");
const microservices_1 = require("@nestjs/microservices");
let OrdersController = exports.OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    all(wallet_id) {
        return this.ordersService.all({ wallet_id });
    }
    initTransactionDto(wallet_id, body) {
        return this.ordersService.initTransaction({
            ...body,
            wallet_id,
        });
    }
    executeTransactionRest(wallet_id, body) {
        return this.ordersService.executeTransaction(body);
    }
    async executeTransactionConsumer(message) {
        const transaction = message.transactions[message.transactions.length - 1];
        await this.ordersService.executeTransaction({
            order_id: message.order_id,
            status: message.status,
            related_investor_id: message.order_type === 'BUY'
                ? transaction.seller_id
                : transaction.buyer_id,
            broker_transaction_id: transaction.transaction_id,
            negotiated_shares: transaction.shares,
            price: transaction.price,
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('wallet_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('wallet_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "initTransactionDto", null);
__decorate([
    (0, common_1.Post)('execute'),
    __param(0, (0, common_1.Param)('wallet_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.InputExecuteTransactionDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "executeTransactionRest", null);
__decorate([
    (0, microservices_1.MessagePattern)('output'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "executeTransactionConsumer", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('wallets/:wallet_id/orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map