"use client";
import "@/styles/Home/Banner.css";
import { useEffect, useState } from "react";
import { PlayBtn,WatchListBtn } from "@/utils/icons";
import Link from 'next/link';
import apiCaller from "@/api/apiCaller";

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
    apiCaller.search(limit).then((videoData) => {
      setBannerDetails(videoData[Math.floor(Math.random()*videoData.length)]);
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
                  <div className="banner__button"><PlayBtn id={bannerDetails._id}/></div>
                  <div className="banner__button"><WatchListBtn  data={bannerDetails} /></div>
                    <Link href={"/videoDetails/" + bannerDetails?._id} ><button className="banner__button moreDetailsBtn"><p>More..</p></button>
                    </Link>
                  </div>}
              </div>
            </>
            <video className="banner__video" onCanPlay={handleVideoReady} src={bannerDetails?.vidVideoLink} autoPlay loop />  
          </div>
        )}
    </div>
  )
}
export default Banner;