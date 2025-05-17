import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get('/api/videos');
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map(video => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          {/* Другая информация о видео */}
        </div>
      ))}
    </div>
  );
};

export default VideoList;