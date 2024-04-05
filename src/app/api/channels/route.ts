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
      },
    );

    const data = await response.json();
    return NextResponse.json({ message: 'Success', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user channels' }, { status: 500 });
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
        body: JSON.stringify(body),
      },
    );
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving user channels' }, { status: 500 });
  }
}

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();

  try {
    const input = `${process.env.SERVER_BASE_URL}/users/channels`;
    console.log('### SERVER BASE URL ###: ', input);
    await fetch(
      input,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        body: JSON.stringify(body),
      },
    );
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user channels' }, { status: 500 });
  }
}
