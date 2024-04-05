import { ENV } from '@src/utils/constants';
import mockChannels from '@src/mocks/favoriteChannels.json';
import { Channel, ChannelResponseData } from '@src/entities/Channel';

const sortByTitle = (channels: Channel[]) => {
  return [...channels].sort((a, b) => a.title.localeCompare(b.title));
}

export const convertToChannelEntities = (data: ChannelResponseData[]): Channel[] => {
  return sortByTitle(data.map((channel: ChannelResponseData) => new Channel(channel)));
}

export const getChannels = async (): Promise<ChannelResponseData[]> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return mockChannels.data;
  }

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

    return await response.json();
  } catch (error) {
    console.error('Error fetching user channels', error);
    return [];
  }
}

export const saveChannels = async (channelIds: string[]): Promise<void> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return;
  }

  try {
    const response = await fetch(
      '/api/channels',
      {
        method: 'POST',
        body: JSON.stringify(channelIds),
      },
    );

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteChannels = async (channelIds: string[]): Promise<void> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return;
  }

  try {
    const response = await fetch(
      '/api/channels',
      {
        method: 'DELETE',
        body: JSON.stringify(channelIds),
      },
    );

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
  } catch (error) {
    console.error(error);
  }
}