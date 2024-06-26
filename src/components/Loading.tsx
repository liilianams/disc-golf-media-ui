import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" size={40} thickness={4}/>
    </div>
  );
};

export default Loading;
