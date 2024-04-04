'use client';

import { Grid, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Video } from '@src/models/Video';
import { areDatesEqual } from '@src/utils/helpers';
import { useFavoriteChannels } from '@src/contexts/FavoritesContext';
import { DateFilter } from './DateFilter';
import { TitleFilter } from './TitleFilter';
import { FavoritesFilter } from './FavoritesFilter';
import { DesktopTableHeaders, MobileTableHeaders } from './VideosTable/TableHeaders';
import { DesktopTableRows, MobileTableRows } from './VideosTable/TableRows';
import { useSmallBreakpoint } from '@src/utils/hooks';
import Loading from '@src/components/Loading';
import Title from '@src/components/Title';

type FiltersStateProps = {
  selectedDate: Date | null;
  searchTerm: string;
  showFavorites: boolean;
}

const sortByDate = (data: Video[]) => {
  return data.sort((a, b) => {
    return new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf();
  });
};

const Videos: React.FC = () => {
  // const { isAuthenticated, isLoadingAuth } = useAuth();
  const isAuthenticated = true;
  const isLoadingAuth = false;
  const {
    favoriteChannels,
    isLoadingChannels,
    isChannelFavorite,
    addFavoriteChannel,
    removeFavoriteChannel
  } = useFavoriteChannels();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltersStateProps>({
    selectedDate: null,
    searchTerm: '',
    showFavorites: isAuthenticated && favoriteChannels.length > 0,
  });
  const isSmallScreen = useSmallBreakpoint();
  const isLoading = useMemo(() => (isLoadingVideos || isLoadingAuth || isLoadingChannels),
    [isLoadingVideos, isLoadingAuth, isLoadingChannels]);

  useEffect(() => {
    if (!isLoading) {
      setFilters({ ...filters, showFavorites: isAuthenticated && favoriteChannels.length > 0 });
    }
    // eslint-disable-next-line
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    const fetchVideos = async () => {
      // const response = await getVideos();
      // const sorted = sortByDate(response.map((video: VideoResponseData) => new Video(video)));
      // setVideos(sorted);
      setIsLoadingVideos(false);
    };

    void fetchVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const includesSelectedDate = !filters.selectedDate || areDatesEqual(filters.selectedDate, video.publishedDate);
      const includesSearchTerm = (
        video.title?.toLowerCase().includes(filters.searchTerm) ||
        video.channelTitle?.toLowerCase().includes(filters.searchTerm)
      );

      if (filters.showFavorites) {
        const channelIds = favoriteChannels.map((channel) => channel.id);
        return includesSelectedDate && includesSearchTerm && channelIds.includes(video.channelId);
      }
      return includesSelectedDate && includesSearchTerm;
    });
  }, [favoriteChannels, filters, videos]);

  if (isLoading) {
    return <Loading/>;
  }

  const handleDateChange = (date: Date | null) => {
    setFilters({ ...filters, selectedDate: date });
  };

  const handleTitleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setFilters({ ...filters, searchTerm: newSearchTerm });
  };

  const handleTitleClear = () => {
    setFilters({ ...filters, searchTerm: '' });
  };

  const handleShowFavorites = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shouldShowFavorites = event.target.checked;
    setFilters({ ...filters, showFavorites: shouldShowFavorites });
  };

  const handleVideoTitleClick = (event: React.MouseEvent, videoUrl: string) => {
    event.preventDefault();
    window.open(videoUrl, '_blank');
    return false;
  };

  const handleFavoriteIconClick = (channelId: string, channelTitle: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    if (isChannelFavorite(channelId)) {
      removeFavoriteChannel(channelId);
    } else {
      addFavoriteChannel(channelId, channelTitle);
    }
  };

  return (
    <>
      <Title>Recent videos</Title>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={3}>
          <DateFilter value={filters.selectedDate} onChange={handleDateChange}/>
        </Grid>
        <Grid item xs={12} md={isAuthenticated ? 7 : 9}>
          <TitleFilter value={filters.searchTerm} onChange={handleTitleSearch} onClear={handleTitleClear}/>
        </Grid>
        {isAuthenticated && (
          <Grid item xs={12} md={2}>
            <FavoritesFilter checkedValue={filters.showFavorites} onChange={handleShowFavorites}/>
          </Grid>
        )}
      </Grid>
      <TableContainer id={isSmallScreen ? 'mobile-table-container' : 'desktop-table-container'}>
        <Table size="small" sx={{ mt: 1.5 }}>
          <TableHead>
            {isSmallScreen ? <MobileTableHeaders/> : <DesktopTableHeaders/>}
          </TableHead>
          <TableBody>
            {isSmallScreen ?
              <MobileTableRows
                videos={filteredVideos}
                handleVideoTitleClick={handleVideoTitleClick}
                handleFavoriteIconClick={handleFavoriteIconClick}
              /> :
              <DesktopTableRows
                videos={filteredVideos}
                handleVideoTitleClick={handleVideoTitleClick}
                handleFavoriteIconClick={handleFavoriteIconClick}
              />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Videos;
