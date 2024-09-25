import { getPayloadClient } from '../get-payload';
import { publicProcedure, router } from './trpc';
import {
    AuthCredentialsValidator
} from '../lib/validator/account-credentials-validator';
import { TRPCError } from '@trpc/server';
import VerifyEmail from '@/app/components/VerifyEmail';
import { z } from 'zod';

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

    verifyEmail : publicProcedure
    .input(z.object({token:z.string()}))
    .query(async({input}) => {
      const{token} = input

      const payload = await getPayloadClient()

      const isVerified = await  payload.verifyEmail({
        collection:'users',
        token,
      })

      if(!isVerified)
        throw new TRPCError({code: 'UNAUTHORIZED'})
      return {success : true}

    }),

    signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const {res} = ctx

      const payload = await getPayloadClient()

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),    


});
