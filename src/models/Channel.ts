type ChannelResponseData = {
  channelId: string;
  channelTitle: string;
  userId?: string;
}

class Channel {
  id: string;
  title: string;
  userId?: string;

  constructor(data: ChannelResponseData) {
    this.id = data.channelId;
    this.title = data.channelTitle;
    this.userId = data.userId;
  }
}

export { Channel };
export type { ChannelResponseData };
