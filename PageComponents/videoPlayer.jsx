"use client"
import "@/styles/playVideo/playVideo.css"
import React, { useEffect, useState } from 'react';
import requests from "@/api/requests";
import serverInstance from "@/api/axios";

const PlayVideo = (props) => {
  const [vidDetails,setVidDetails] = useState(null);
  useEffect(()=>{
    serverInstance.get(requests.searchById + props.id).then((response) =>{
      setVidDetails(response.data);
    });
  })
  return (
    <div className='playVideo'>
        <video  className='playVideo__video'
        src={vidDetails?.vidVideoLink}
        controls autoPlay 
        oncontextmenu="return false;"
        controlslist="nodownload"
        />
        
    </div>
  )
}
export default PlayVideo;