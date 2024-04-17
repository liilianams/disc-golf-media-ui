import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ENV } from '@src/utils/constants';

export const POST = async (): Promise<NextResponse> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    cookies().delete('jwt_token');
    return NextResponse.json('Success', { status: 200 });
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      },
    );

    const responseBody = await response.text();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    return NextResponse.json('Error logging out', { status: 500 });
  }
}