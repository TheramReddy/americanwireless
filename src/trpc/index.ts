import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    anyApriRoute: publicProcedure.query(() => {
        return 'hello'
    }),
})


export type AppRouter = typeof appRouter