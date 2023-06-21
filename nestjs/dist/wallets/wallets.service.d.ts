import { PrismaService } from '../prisma/prisma/prisma.service';
export declare class WalletsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    all(): import(".prisma/client").Prisma.PrismaPromise<({
        id: string;
        created_at: Date;
        updated_at: Date;
    } & {})[]>;
    create(input: {
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
