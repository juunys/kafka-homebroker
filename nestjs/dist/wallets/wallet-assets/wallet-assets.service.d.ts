import { PrismaService } from '../../prisma/prisma/prisma.service';
export declare class WalletAssetsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    all(filter: {
        wallet_id: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
        Asset: {
            id: string;
            symbol: string;
            price: number;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        wallet_id: string;
        asset_id: string;
        shares: number;
        version: number;
    } & {})[]>;
    create(input: {
        wallet_id: string;
        asset_id: string;
        shares: number;
    }): import(".prisma/client").Prisma.Prisma__WalletAssetClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        wallet_id: string;
        asset_id: string;
        shares: number;
        version: number;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
}
