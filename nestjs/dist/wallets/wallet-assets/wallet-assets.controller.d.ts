import { WalletAssetsService } from './wallet-assets.service';
export declare class WalletAssetsController {
    private walletAssetsService;
    constructor(walletAssetsService: WalletAssetsService);
    all(wallet_id: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    create(wallet_id: string, body: {
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
