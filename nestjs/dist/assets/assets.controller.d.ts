import { AssetsService } from './assets.service';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    all(): import(".prisma/client").Prisma.PrismaPromise<({
        symbol: string;
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
    } & {})[]>;
    create(body: {
        id: string;
        symbol: string;
        price: number;
    }): import(".prisma/client").Prisma.Prisma__AssetClient<{
        symbol: string;
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
}
