import { NextRequest, NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/users/channels`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        credentials: 'include'
      },
    );

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error fetching user channels', { status: 500 });
  }
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();

  try {
    await fetch(
      `${process.env.SERVER_BASE_URL}/users/channels`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    );
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    return NextResponse.json('Error saving user channels', { status: 500 });
  }
}

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();

  try {
    await fetch(
      `${process.env.SERVER_BASE_URL}/users/channels`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      },
    );
    return NextResponse.json('Success', { status: 200 });
  } catch (error) {
    return NextResponse.json('Error deleting user channels', { status: 500 });
  }
}
