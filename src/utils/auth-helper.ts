import { NextResponse } from 'next/server';

export const checkAuth = async (): Promise<boolean> => {
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

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(
      `api/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    return NextResponse.json('Error logging in with username and password', { status: 500 });
  }
}