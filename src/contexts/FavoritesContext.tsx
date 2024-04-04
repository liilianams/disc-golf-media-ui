'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Channel } from '../models/Channel';

const pendingChangesActions = {
  ADD: 'add',
  REMOVE: 'remove'
};

const delay = 5000;

type FavoritesContextType = {
  favoriteChannels: Channel[];
  isLoadingChannels: boolean;
  addFavoriteChannel: (channelId: string, channelTitle: string) => void;
  removeFavoriteChannel: (channelId: string) => void;
  isChannelFavorite: (channelId: string) => boolean;
}

type FavoritesProviderProps = {
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

function sortByTitle(channels: Channel[]) {
  return [...channels].sort((a, b) => a.title.localeCompare(b.title));
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const [favoriteChannels, setFavoriteChannels] = useState<Channel[]>([]);
  const [isLoadingChannels, setIsLoadingChannels] = useState<boolean>(true);
  const [pendingChanges, setPendingChanges] = useState<{
    add: Set<string>,
    remove: Set<string>
  }>({ add: new Set([]), remove: new Set([]) });

  const fetchFavoriteChannels = async () => {
    // const response = await getChannels(isAuthenticated);
    // const sorted = sortByTitle(response.map((channel: ChannelResponseData) => new Channel(channel)));
    // setFavoriteChannels(sorted);
  };

  useEffect(() => {
    if (isAuthenticated) {
      void fetchFavoriteChannels();
    } else {
      setFavoriteChannels([]);
    }
    setIsLoadingChannels(false);
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    const postAndDeleteChannels = () => {
      const { add, remove } = pendingChanges;
      // void saveChannels(isAuthenticated, add);
      // void deleteChannels(isAuthenticated, remove);
    };

    const timer = setTimeout(() => {
      postAndDeleteChannels();
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      value={{ addFavoriteChannel, favoriteChannels, isLoadingChannels, removeFavoriteChannel, isChannelFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
