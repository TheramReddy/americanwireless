import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    anyApiRoute: publicProcedure.query(() => {
        return 'hello'
    }),
})


export type AppRouter = typeof appRouter

export function createExpressMiddleware(arg0: {}): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.");
}
