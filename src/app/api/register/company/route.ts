import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaclient';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import EmailTemplate from '@/components/providers/email-template';

export async function POST(request: NextRequest) {
  try {
    const { name, email, designation, password, yourName } =
      await request.json();

    const existingCompany = await prisma.user.findFirst({
      where: {
        email: email,
        isCompany: true,
      },
    });

    if (existingCompany) {
      return NextResponse.json(
        {
          message: 'Company already registered',
          status: 409,
        },
        { status: 409 },
      );
    }

    const salt = bcrypt.genSaltSync(17);
    const hash = bcrypt.hashSync(password, salt);
    const identifier = uuid();
    const companyCode = uuid();

    const newUser = await prisma.user.create({
      data: {
        name: yourName,
        email,
        role: designation,
        organisation: name,
        isCompany: true,
        password: hash,
        emailVerified: false,
        companyCode: companyCode,
        setUP: true,
      },
    });

    const verification = await prisma.verificationToken.create({
      data: {
        identifier: identifier,
        userID: newUser.id,
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['developer.colhive@gmail.com'],
      subject: 'Verify your Email - Colhive',
      react: EmailTemplate({
        type: 'REGISTER',
        name: newUser.name,
        url: `${process.env.URL}/verify-email?identifier=${verification.identifier}`,
      }),
    });

    return NextResponse.json(
      {
        message: 'Account created Successfully',
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log('Registration Error', error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        status: 500,
      },
      { status: 500 },
    );
  }
}
