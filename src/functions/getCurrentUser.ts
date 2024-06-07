import { auth } from '@/lib/auth';
import prisma from '@/lib/prismaclient';

export default async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const data = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  return data;
}
