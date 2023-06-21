import { PrismaService } from '../prisma/prisma/prisma.service';
export declare class AssetsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    all(): import(".prisma/client").Prisma.PrismaPromise<({
        symbol: string;
        id: string;
        price: number;
        created_at: Date;
        updated_at: Date;
    } & {})[]>;
    create(data: {
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
