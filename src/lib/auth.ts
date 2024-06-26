import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prismaclient';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email || '',
          },
        });

        if (!user) {
          throw new Error(
            '{"message":"User doesn\'t exists in Database.","status":"404"}',
          );
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password!,
        );

        if (!isPasswordCorrect) {
          throw new Error('{"message":"Incorrect Password","status":"403"}');
        }

        if (user.emailVerified === false) {
          throw new Error(
            '{"message":"Unverified Email Address","status":"403"}',
          );
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
