import { formatDateTime } from '../utils/helpers';

type VideoResponseData = {
  id: string;
  url: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
};

class Video {
  id: string;
  url: string;
  title: string;
  description: string;
  publishedDate: string;
  channelTitle: string;
  channelId: string;

  constructor(data: VideoResponseData) {
    this.id = data.id;
    this.url = data.url;
    this.title = data.title;
    this.description = data.description;
    this.publishedDate = formatDateTime(data.publishedAt, 'dd-MM-yyyy');
    this.channelTitle = data.channelTitle;
    this.channelId = data.channelId;
  }
}

export { Video };
export type { VideoResponseData };