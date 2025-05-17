import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { id } = useParams();
  
  return (
    <div>
      <video controls width="100%">
        <source src={`/api/videos/${id}/stream`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;