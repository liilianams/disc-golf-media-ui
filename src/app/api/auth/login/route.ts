import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { lowercaseFirstLetter } from '@src/utils/helpers';

const sampleCookies = [
  'jwt_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNzEyNzAzNTg1LCJleHAiOjE3MTI3MDcxODV9.3x0b-PmXJmZCck2qLt3IG43lbf_Ul-Xbwd6sUx_fVEc; Path=/; HttpOnly; SameSite=Strict;',
  'jwt_token2=some-jwt-token-2; Path=/; HttpOnly; SameSite=lax;'
];


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