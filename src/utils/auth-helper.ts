import { ENV } from '@src/utils/constants';
import { NextResponse } from 'next/server';

export const checkAuth = async (): Promise<boolean> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return localStorage.getItem('jwt') === 'jwt';
  }

  try {
    const response = await fetch(
      `api/auth/check`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const login = async (formData: FormData): Promise<NextResponse> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    localStorage.setItem('jwt', 'jwt');
    return NextResponse.json({ message: 'Success' }, { status: 302 });
  }

  try {
    const response = await fetch(
      `api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData?.get('email'),
          password: formData?.get('password')
        })
      },
    );

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    return NextResponse.json('Error logging in with username and password', { status: 500 });
  }
}