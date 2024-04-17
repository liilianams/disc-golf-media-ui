import { NextResponse } from 'next/server';
import { ENV } from '@src/utils/constants';
import { cookies } from 'next/headers';

export const GET = async (): Promise<NextResponse<boolean>> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return NextResponse.json(cookies().has('jwt_token'));
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/check`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        credentials: 'include',
      },
    );
    const body = await response.json();
    return NextResponse.json(body === 'Authenticated');
  } catch (error) {
    return NextResponse.json(false);
  }
}