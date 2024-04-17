import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { lowercaseFirstLetter } from '@src/utils/helpers';
import { ENV } from '@src/utils/constants';

const extractAndSetJwtToken = (cookieStrings: string[]): void => {
  cookieStrings.forEach(cookieString => {
    if (cookieString.includes('jwt_token=')) {
      let value = '';
      const options = {};

      cookieString.split('; ').forEach(part => {
        if (part.startsWith('jwt_token=')) {
          value = part.split('=')[1];
        } else {
          const [key, value] = part.split('=');
          options[lowercaseFirstLetter(key)] = value?.replace(';', '') || true;
        }
      });

      if (value !== '') {
        cookies().set('jwt_token', value, options);
      }
    }
  });
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    extractAndSetJwtToken(['jwt_token=test_token; Path=/; HttpOnly; SameSite=Strict;']);
    return NextResponse.json('Success', { status: 302 });
  }

  const body = await request.json();
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        body: JSON.stringify(body),
      },
    );

    const responseBody = await response.text();

    if (response.status === 302) {
      extractAndSetJwtToken(response.headers.getSetCookie());
    }

    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    return NextResponse.json('Error fetching jwt token with username and password', { status: 500 });
  }
}