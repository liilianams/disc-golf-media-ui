import * as React from 'react';
import Videos from '@src/app/videos/Videos';
import { getVideos } from '@src/entities/video-helpers';
import { getChannels } from '@src/entities/channel-helpers';

const VideosPage = async () => {
  const videos = await getVideos();
  const favoriteChannels = await getChannels();

  return (
    <Videos initialVideos={videos} initialChannels={favoriteChannels}/>
  );
};

export default VideosPage;