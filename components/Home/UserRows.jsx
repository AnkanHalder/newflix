import React, { useEffect, useState } from 'react';
import { UserAuth } from '@/context/authContext';
import Row from './Row';
import "@/styles/Home/userRowStyles.css";

const UserRows = () => {
  const { user, userSettings } = UserAuth();
  const [userVideos, setUserVideos] = useState({
    likedVideos:[],
    watchList: [],
    watchedVideos: []});

  const getUserVideos = async () => {
    if (user && userSettings !== null && userSettings !== undefined) {
      return userSettings;
    } else {
      return [];
    }
  };
  const getUserWatched = (userWatched) => {
      if (userWatched==null || userWatched==[]) return [];
      const data = userWatched.map((watchedVideo) => watchedVideo.videoDetails);
      return data;
  };

  useEffect(() => {
    const fetchUserLikedVideos = async () => {
      const videos = await getUserVideos();
        if (videos) {
            // Update only the changed parts of the userVideos state
            setUserVideos((prevUserVideos) => ({
            ...prevUserVideos,
            likedVideos: videos.userLiked,
            watchList: videos.userWatchList,
            watchedVideos: getUserWatched(videos.userWatched)
            }));
        }      
    };
    fetchUserLikedVideos();
  }, [user, userSettings]);


  return (
    <div className='userVideos'>
        <div className='userRow'>
            {userSettings&&userVideos&& <Row params="watched" getCardDataFunction={async ()=>userVideos.watchedVideos} heading="Your Watched" />}
        </div>
        <div className='userRow'>
            {userSettings&&userVideos&& <Row params="liked" getCardDataFunction={async ()=>userVideos.likedVideos} heading="Your Liked" />}
        </div>
        <div className='userRow'>
            {userSettings&&userVideos&& <Row params="watchlist" getCardDataFunction={async ()=>userVideos.watchList} heading="Your WatchList" />}
        </div>
    </div>
  );
};

export default UserRows;
