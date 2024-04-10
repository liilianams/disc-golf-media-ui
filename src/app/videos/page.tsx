import * as React from 'react';
import Videos from '@src/app/videos/Videos';
import { getVideos } from '@src/utils/video-helpers';

const VideosPage = async () => {
  const videos = await getVideos();

  return (
    <Videos initialVideos={videos}/>
  );
};

export default VideosPage;