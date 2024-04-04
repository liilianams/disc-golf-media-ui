import { Video } from '@src/models/Video';
import * as React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import { formatDate } from '@src/utils/helpers';
import { Star, StarBorder } from '@mui/icons-material';
import { useFavoriteChannels } from '@src/contexts/FavoritesContext';
import FavoriteIconButton from '@src/components/FavoriteIconButton';

type TableRowsProps = {
  videos: Video[];
  handleVideoTitleClick: (event: React.MouseEvent, videoUrl: string) => boolean;
  handleFavoriteIconClick: (channelId: string, channelTitle: string, event?: React.MouseEvent) => void;
}

const DesktopTableRows: React.FC<TableRowsProps> = ({
  videos,
  handleVideoTitleClick,
  handleFavoriteIconClick
}) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const { isChannelFavorite } = useFavoriteChannels();

  return (
    <>
      {videos.map((video) =>
        <TableRow hover key={video.id}>
          <TableCell>{formatDate(video.publishedDate, 'MMM d, yyyy')}</TableCell>
          <TableCell onClick={event => handleVideoTitleClick(event, video.url)} sx={{ cursor: 'pointer' }}>
            <div dangerouslySetInnerHTML={{ __html: video.title }}/>
          </TableCell>
          <TableCell align="right">
            {video.channelTitle}
          </TableCell>
          {isAuthenticated && (
            <TableCell>
              {isChannelFavorite(video.channelId) ? (
                <FavoriteIconButton
                  tooltipTitle="Remove from Favorites"
                  buttonIcon={<Star/>}
                  onClick={(event) => handleFavoriteIconClick(video.channelId, video.channelTitle, event)}
                />
              ) : (
                <FavoriteIconButton
                  tooltipTitle="Add to Favorites"
                  buttonIcon={<StarBorder/>}
                  onClick={(event) => handleFavoriteIconClick(video.channelId, video.channelTitle, event)}
                />
              )}
            </TableCell>
          )}
        </TableRow>
      )}
    </>
  );
};

const MobileTableRows: React.FC<TableRowsProps> = ({
  videos,
  handleVideoTitleClick,
  handleFavoriteIconClick
}) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const { isChannelFavorite } = useFavoriteChannels();

  return (
    <>
      {videos.map((video) =>
        <TableRow hover key={video.id}>
          <TableCell padding="none" align="center" sx={{ verticalAlign: 'top' }}>
            <Typography fontSize="secondaryFontSize" color="grey.500" sx={{ mt: 1 }}>
              {formatDate(video.publishedDate, 'MMM')}
            </Typography>
            <Typography variant="h5">
              {formatDate(video.publishedDate, 'd')}
            </Typography>
            <Typography fontSize="secondaryFontSize" color="grey.500" sx={{ mb: 1 }}>
              {formatDate(video.publishedDate, 'yyyy')}
            </Typography>
          </TableCell>
          <TableCell
            padding="none"
            onClick={event => handleVideoTitleClick(event, video.url)}
            sx={{ cursor: 'pointer', verticalAlign: 'top', pl: 1.5 }}>
            <Typography fontSize="secondaryFontSize" color="grey.500" sx={{ mt: 1 }}>
              {video.channelTitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1 }}
              dangerouslySetInnerHTML={{ __html: video.title }}
            />
          </TableCell>
          {isAuthenticated && (
            <TableCell padding="none" sx={{ ml: 1 }}>
              {isChannelFavorite(video.channelId) ? (
                <FavoriteIconButton
                  tooltipTitle="Remove from Favorites"
                  buttonIcon={<Star/>}
                  onClick={(event) => handleFavoriteIconClick(video.channelId, video.channelTitle, event)}
                />
              ) : (
                <FavoriteIconButton
                  tooltipTitle="Add to Favorites"
                  buttonIcon={<StarBorder/>}
                  onClick={(event) => handleFavoriteIconClick(video.channelId, video.channelTitle, event)}
                />
              )}
            </TableCell>
          )}
        </TableRow>
      )}
    </>
  );
};

export { DesktopTableRows, MobileTableRows };