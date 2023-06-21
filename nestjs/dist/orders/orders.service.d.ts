import { PrismaService } from '../prisma/prisma/prisma.service';
import { InitTransactionDto, InputExecuteTransactionDto } from './order.dto';
import { OrderStatus, OrderType } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
export declare class OrdersService {
    private prismaService;
    private readonly kafkaClient;
    constructor(prismaService: PrismaService, kafkaClient: ClientKafka);
    all(filter: {
        wallet_id: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
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
        type: OrderType;
        status: OrderStatus;
        partial: number;
    } & {})[]>;
    initTransaction(input: InitTransactionDto): Promise<{
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
        wallet_id: string;
        asset_id: string;
        shares: number;
        version: number;
        type: OrderType;
        status: OrderStatus;
        partial: number;
    } & {}>;
    executeTransaction(input: InputExecuteTransactionDto): Promise<void>;
}
