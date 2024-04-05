'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Channel, ChannelResponseData } from '@src/entities/Channel';
import { convertToChannelEntities, deleteChannels, saveChannels } from '@src/entities/channel-helpers';

const pendingChangesActions = {
  ADD: 'add',
  REMOVE: 'remove'
};

const delay = 5000;

type FavoritesContextType = {
  favoriteChannels: Channel[];
  addFavoriteChannel: (channelId: string, channelTitle: string) => void;
  removeFavoriteChannel: (channelId: string) => void;
  isChannelFavorite: (channelId: string) => boolean;
}

type FavoritesProviderProps = {
  initialChannels: ChannelResponseData[];
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavoriteChannels = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('FavoritesContext is undefined');
  }
  return context;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ initialChannels, children }) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const [favoriteChannels, setFavoriteChannels] = useState<Channel[]>(convertToChannelEntities(initialChannels));
  const [pendingChanges, setPendingChanges] = useState<{
    add: Set<string>,
    remove: Set<string>
  }>({ add: new Set([]), remove: new Set([]) });

  useEffect(() => {
    const { add, remove } = pendingChanges;

    const saveAndDeleteChannels = async () => {
      if (add.size > 0) {
        void saveChannels(Array.from(add));
      }
      if (remove.size > 0) {
        void deleteChannels(Array.from(remove));
      }
    };

    const timer = setTimeout(() => {
      void saveAndDeleteChannels();
    }, delay);

    return () => clearTimeout(timer);
  }, [pendingChanges]);

  const isChannelFavorite = (channelId: string) => {
    return favoriteChannels.some((channel) => channel.id === channelId);
  };

  const updatePendingChanges = (action: string, channelId: string) => {
    setPendingChanges((prevChanges) => {
      const channelsToAdd = new Set(prevChanges.add);
      const channelsToRemove = new Set(prevChanges.remove);

      if (action === pendingChangesActions.ADD) {
        channelsToAdd.add(channelId);
        channelsToRemove.delete(channelId);
      } else if (action === pendingChangesActions.REMOVE) {
        channelsToRemove.add(channelId);
        channelsToAdd.delete(channelId);
      }

      return {
        add: channelsToAdd,
        remove: channelsToRemove
      };
    });
  };

  const addFavoriteChannel = (channelId: string, channelTitle: string) => {
    if (!isAuthenticated) {
      throw new Error('Unable to add to Favorites, cannot find User');
    }
    const newChannel: Channel = {
      id: channelId,
      title: channelTitle
    };
    setFavoriteChannels([...favoriteChannels, newChannel]);
    updatePendingChanges(pendingChangesActions.ADD, channelId);
  };


  const removeFavoriteChannel = (channelId: string) => {
    setFavoriteChannels((prevFavorites) =>
      prevFavorites.filter((channel) => channel.id !== channelId)
    );
    updatePendingChanges(pendingChangesActions.REMOVE, channelId);
  };

  return (
    <FavoritesContext.Provider
      value={{ addFavoriteChannel, favoriteChannels, removeFavoriteChannel, isChannelFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
