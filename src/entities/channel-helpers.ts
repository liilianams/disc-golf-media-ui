import { ENV } from '@src/utils/constants';
import mockChannels from '@src/mocks/favoriteChannels.json';
import { Channel, ChannelResponseData } from '@src/entities/Channel';

const sortByTitle = (channels: Channel[]) => {
  return [...channels].sort((a, b) => a.title.localeCompare(b.title));
}

export const convertToChannelEntities = (data: ChannelResponseData[]): Channel[] => {
  return sortByTitle(data.map((channel: ChannelResponseData) => new Channel(channel)));
}

// TODO: get actual data from the backend
export const getChannels = async (): Promise<ChannelResponseData[]> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return mockChannels.data;
  }
}