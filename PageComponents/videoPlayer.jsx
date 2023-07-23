import "@/styles/playVideo/playVideo.css";
import React, { useEffect, useRef, useState } from "react";
import requests from "@/api/requests";
import serverInstance from "@/api/axios";
import withAuth from "@/utils/withAuth";
import apiCaller from "@/api/apiCaller";
import { UserAuth } from "@/context/authContext";
import YouTubePlayer from "react-player/youtube";



const PlayVideo = (props) => {
  const [vidDetails, setVidDetails] = useState(null);
  const [isSaving , setIsSaving] = useState(false);
  const {user,userSettings,setUserSettings} = UserAuth();
  const videoRef = useRef(null);
  if (!user) return null;

  useEffect(() => {
    serverInstance.get(requests.searchById + props.id).then((response) => {
      setVidDetails(response.data);
    });
  }, [props.id]);
  useEffect(() => {
    if (videoRef.current) {
      if(userSettings && vidDetails && userSettings.userWatched!=null&&userSettings.userWatched!=undefined){  
        const index = userSettings.userWatched.findIndex((obj)=> obj.videoDetails._id.toString() == vidDetails._id.toString());
        if(index!=-1){
          videoRef.current.currentTime = parseFloat(userSettings.userWatched[index].percentWatched).toFixed(2);
        } else{
          const newUserWatched = {
            percentWatched: 0.00, 
            videoDetails: vidDetails 
          }
          setUserSettings({...userSettings, userWatched : [...userSettings.userWatched,newUserWatched]});
        } 
      } 
    }
}, [videoRef.current]);
  //USE EFFECT to backUP to server once immediately and once every 15 mins
  useEffect(()=>{
    let watchedDuration = JSON.parse(localStorage.getItem(`watched_${props.id}`))?.played*100;
    //BACKUP ONCE IMMEDIATELY
    if (isNaN(watchedDuration) || watchedDuration == null || watchedDuration == undefined) watchedDuration=0;
      // Make the API call to back up the data immediately
    if (vidDetails != null)apiCaller.addToWatchedVideos(user.email, vidDetails, watchedDuration);
    //BACK UP WATCHED DATA EVERY 15 MINUTES
    const backupInterval = setInterval(() => {
      watchedDuration = JSON.parse(localStorage.getItem(`watched_${props.id}`))?.played*100;
      if(isNaN(watchedDuration) || watchedDuration==null || watchedDuration==undefined) watchedDuration = 0
        // Make the API call to back up the data
        if (vidDetails != null)apiCaller.addToWatchedVideos(user.email,vidDetails, watchedDuration)
    }, 900000); // 900000 milliseconds = 15 minutes
    return ()=>{
      clearInterval(backupInterval); // Clear the interval when the component unmounts
    }
  },[vidDetails]);

  //USE EFFECT to update userSetting locally (not backed up to server)
  useEffect(() => {
    let watchedDuration = JSON.parse(localStorage.getItem(`watched_${props.id}`))?.played*100;
    const updatedUserSettingsInterval = setInterval(() => {
            watchedDuration = JSON.parse(localStorage.getItem(`watched_${props.id}`))?.played*100;
            // Update the userSettings state to keep the data in sync
            // obj Structure >>> userWatched<ObjectArray>[x]: {percentWatched: Number, videoDetails: Object(Details of the video)} 
            if(isNaN(watchedDuration) || watchedDuration==null || watchedDuration==undefined) watchedDuration = 0;
            if(vidDetails){
              const updatedUserWatched = userSettings.userWatched.map((obj) =>
              obj.videoDetails._id.toString() === vidDetails._id.toString() ? 
              { ...obj, percentWatched:watchedDuration } : obj
            );
            setUserSettings({ ...userSettings, userWatched: updatedUserWatched });
            }
      },10000); // 10000 milliseconds = 10s

    return () => {
      clearInterval(updatedUserSettingsInterval); // Clear the interval when the component unmounts
    };
  }, [vidDetails,userSettings]);

  // const handleMetadataLoaded = () => {
  //   const watchedDuration = localStorage.getItem(`watched_${props.id}`);
  //   if (watchedDuration && videoRef.current != null && !isNaN(watchedDuration)) {
  //     const currentTimeToSet = Math.round((parseFloat(watchedDuration) / 100) * videoRef.current.duration);
  //     videoRef.current.currentTime = currentTimeToSet;
  //   }
  // };

  // const handleVideoTimeUpdate = () => {
  //   if (videoRef.current) {
  //     const watchedDuration = videoRef.current.currentTime;
  //     const totalDuration = videoRef.current.duration;
  //     localStorage.setItem(`watched_${props.id}`, (watchedDuration/totalDuration)*100);
  //   }
  // };
  const handleProgress = (data) => {
    localStorage.setItem(`watched_${props.id}`, JSON.stringify(data));
  }
  const handlePlay =() =>{
    let _played = JSON.parse(localStorage.getItem(`watched_${props.id}`))?.played;
    _played=((!_played)?0:_played);
    if(videoRef.current){
      console.log("seeking to:",_played)
      videoRef.current.seekTo(_played,"fraction");
      videoRef.current.playing="true";
    }
  } 
    /* <video
        ref={videoRef}
        className="playVideo__video"
        src={(vidDetails&&vidDetails.vidVideoLink)?(vidDetails.vidVideoLink):"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        controls
        autoPlay
        onContextMenu={() => false}
        controlsList="nodownload"
        onTimeUpdate={handleVideoTimeUpdate}
  /> */
  if (!vidDetails) return null;

  return (

      <div className="playVideo">
      <div className="playVideo__video" style={{ width:"100%" , height:"100%"}}>
        <YouTubePlayer ref={videoRef} url={vidDetails?.vidYTBVideoLink}
        onReady={handlePlay} light="true" loop="true"
        onProgress={handleProgress} controls="true" width="100%" height="100%"/>
      </div>
    </div>
  );
};

export default withAuth(PlayVideo);
