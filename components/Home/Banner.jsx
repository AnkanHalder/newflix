"use client";
import "@/styles/Home/Banner.css";
import serverInstance from "@/api/axios";
import requests from "@/api/requests";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";


function truncate(str,n) {
  return str?.length > n ? str.substr(0,n-1) + ' ...' : ''; 
}

const Banner = () => {
  const limit = 1000;
  const [bannerDetails, setBannerDetails] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false); 
  // TO HANDEL THE RENDERING OF BUTTONS WHEN VIDEO IS READY
  const handleVideoReady = () => {
    setIsVideoReady(true); // Set isVideoReady to true when video is ready
  };
  useEffect(() => { 
    serverInstance.get(requests.search + limit.toString()).then((response) =>{
      setBannerDetails(response.data[Math.floor(Math.random()*response.data.length)]);
      console.log(response.data,bannerDetails);
    });


  },[]);
  return (
    <div className="banner">
         {bannerDetails!=null && ( 
            <div className="banner__container">          
            <>
              <div className="banner__content">
                <div className="banner__title">{bannerDetails?.vidName}</div>
                <div className="banner__description">{truncate(bannerDetails?.vidDescription, 150)}</div>
                  {isVideoReady && <div className="banner__buttons">
                    <button className="banner__button playBtn">{">"}</button>
                    <button className="banner__button watchListBtn">+</button>
                    <button className="banner__button moreDetailsBtn">More</button>
                  </div>}
              </div>
            </>
            <video className="banner__video" onCanPlay={handleVideoReady} src={bannerDetails?.vidVideoLink} autoPlay loop muted />  
          </div>
        )}
    </div>
  )
}
export default Banner;