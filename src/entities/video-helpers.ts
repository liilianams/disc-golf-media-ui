import { ENV } from '@src/utils/constants';
import mockVideos from '@src/mocks/videos.json';
import { Video, VideoResponseData } from '@src/entities/Video';

const sortByDate = (data: Video[]) => {
  return data.sort((a, b) => {
    return new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf();
  });
};

export const convertToSortedVideoEntities = (data: VideoResponseData[]): Video[] => {
  return sortByDate(data.map((video) => new Video(video)));
};

export const getVideos = async (): Promise<VideoResponseData[]> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return mockVideos.data;
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_BASE_URL}/videos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          referer: process.env.CLIENT_DOMAIN!,
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    return await response.json();
  } catch (error) {
    console.error('Error fetching videos', error);
    return [];
  }
}