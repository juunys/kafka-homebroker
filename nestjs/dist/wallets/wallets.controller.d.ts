import { WalletsService } from './wallets.service';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    all(): import(".prisma/client").Prisma.PrismaPromise<({
        id: string;
        created_at: Date;
        updated_at: Date;
    } & {})[]>;
    create(body: {
        id: string;
    }): import(".prisma/client").Prisma.Prisma__WalletClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
}
