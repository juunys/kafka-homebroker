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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma/prisma.service");
const client_1 = require("@prisma/client");
const microservices_1 = require("@nestjs/microservices");
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(prismaService, kafkaClient) {
        this.prismaService = prismaService;
        this.kafkaClient = kafkaClient;
    }
    all(filter) {
        return this.prismaService.order.findMany({
            where: {
                wallet_id: filter.wallet_id,
            },
            include: {
                Transactions: true,
                Asset: {
                    select: {
                        id: true,
                        symbol: true,
                    },
                },
            },
            orderBy: {
                updated_at: 'desc',
            },
        });
    }
    async initTransaction(input) {
        const order = await this.prismaService.order.create({
            data: {
                asset_id: input.asset_id,
                wallet_id: input.wallet_id,
                shares: input.shares,
                partial: input.shares,
                price: input.price,
                type: input.type,
                status: client_1.OrderStatus.PENDING,
                version: 1,
            },
        });
        this.kafkaClient.emit('input', {
            order_id: order.id,
            investor_id: order.wallet_id,
            asset_id: order.asset_id,
            shares: order.shares,
            price: order.price,
            order_type: order.type,
        });
        return order;
    }
    async executeTransaction(input) {
        return this.prismaService.$transaction(async (prisma) => {
            const order = await prisma.order.findUniqueOrThrow({
                where: { id: input.order_id },
            });
            await prisma.order.update({
                where: { id: input.order_id, version: order.version },
                data: {
                    partial: order.partial - input.negotiated_shares,
                    status: input.status,
                    Transactions: {
                        create: {
                            broker_transaction_id: input.broker_transaction_id,
                            related_investor_id: input.related_investor_id,
                            shares: input.negotiated_shares,
                            price: input.price,
                        },
                    },
                    version: { increment: 1 },
                },
            });
            if (input.status === client_1.OrderStatus.CLOSED) {
                await prisma.asset.update({
                    where: { id: order.asset_id },
                    data: {
                        price: input.price,
                    },
                });
                const walletAsset = await prisma.walletAsset.findUnique({
                    where: {
                        wallet_id_asset_id: {
                            asset_id: order.asset_id,
                            wallet_id: order.wallet_id,
                        },
                    },
                });
                if (walletAsset) {
                    console.log(walletAsset);
                    await prisma.walletAsset.update({
                        where: {
                            wallet_id_asset_id: {
                                asset_id: order.asset_id,
                                wallet_id: order.wallet_id,
                            },
                            version: walletAsset.version,
                        },
                        data: {
                            shares: order.type === client_1.OrderType.BUY
                                ? walletAsset.shares + order.shares
                                : walletAsset.shares - order.shares,
                            version: { increment: 1 },
                        },
                    });
                }
                else {
                    await prisma.walletAsset.create({
                        data: {
                            asset_id: order.asset_id,
                            wallet_id: order.wallet_id,
                            shares: input.negotiated_shares,
                            version: 1,
                        },
                    });
                }
            }
        });
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('ORDERS_PUBLISHER')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        microservices_1.ClientKafka])
], OrdersService);
//# sourceMappingURL=orders.service.js.map