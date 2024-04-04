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
}

// TODO: get actual data from the backend
export const getVideos = async (): Promise<VideoResponseData[]> => {
  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    return mockVideos.data;
  }
}