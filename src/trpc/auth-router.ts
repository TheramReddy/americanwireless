import { getPayloadClient } from '../get-payload';
import { publicProcedure, router } from './trpc';
import {
    AuthCredentialsValidator
} from '../lib/validator/account-credentials-validator';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
    createPayloadUser: publicProcedure
      .input(AuthCredentialsValidator)
      .mutation(async ({ input }) => {
        const { email, password } = input;
        const payload = await getPayloadClient();

        // Check if user already exists
        const { docs: users } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        });

        // If user already exists, throw a conflict error
        if (users.length !== 0) {
          throw new TRPCError({ code: 'CONFLICT', message: 'User already exists.' });
        }

        // Proceed to create the user
        await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            role: 'user',
          },
        });

        // Return simplified structure
        return {
          success: true,
          sentToEmail: email,
        };
    }),
});
