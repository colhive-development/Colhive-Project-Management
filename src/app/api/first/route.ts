import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaclient';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const { role } = await request.json();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: 'Invalid Request',
          status: 401,
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.update({
      where: {
        email: session.user.email || '',
      },
      data: {
        role,
        setUP: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Data Recorded Successfully',
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        status: 500,
      },
      { status: 401 },
    );
  }
}
