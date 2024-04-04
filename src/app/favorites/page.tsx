import * as React from 'react';
import { getChannels } from '@src/entities/channel-helpers';
import FavoriteChannels from '@src/app/favorites/FavoriteChannels';

const FavoriteChannelsPage = async () => {
  const favoriteChannels = await getChannels();

  return (
    <FavoriteChannels initialChannels={favoriteChannels}/>
  );
};

export default FavoriteChannelsPage;