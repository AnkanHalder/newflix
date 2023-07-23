"use client"
import { useState,useRef,useEffect } from "react";
import "@/styles/Home/Card.css";
import { LikeBtn,WatchListBtn, PlayBtn} from "@/utils/icons";
import Link from "next/link";
import YouTubePlayer from "react-player/youtube";
import {BsInfo} from "react-icons/bs";


export const Card = (props) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [percentWatched, setPercentWatched] = useState(0);
  const videoRef = useRef(null);
  const vidDetails = props.vidDetails;
  const handleMouseEnter = () => {
    setIsVideoPlaying(true);
    if (videoRef.current != null)videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsVideoPlaying(false);
    if (videoRef.current != null) videoRef.current.pause();

  };
  // SHOW CARDS OR POSTERS DEPENDING on scrEEN SIZE 
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setSmallScreen(isSmallScreen);
    };
    const watchedDuration = JSON.parse(localStorage.getItem(`watched_${props.vidDetails._id}`))?.played*100;
    setPercentWatched(watchedDuration?watchedDuration:0);
  
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [vidDetails]);

  //WAIT TILL VID DETAILS LOAD
 
  return (
    <div className='card' onPointerEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}>
        <Link href={"/videoDetails/" + vidDetails?._id} >
        {isVideoPlaying && !smallScreen &&  
        <YouTubePlayer style={{pointerEvents:"none"}} className="card__video" playing="true" muted="false" url={vidDetails?.vidYTBVideoLink}
              loop="true" width="100%" height="100%"/>}
        <img className='card__image' src={(smallScreen)?vidDetails.vidPosterLink : vidDetails.vidBackdropLink}
         alt={vidDetails.vidName}></img>
      </Link>  
      {!smallScreen && <div className="card__content">
          <h1 className="card__title">{vidDetails.vidName}</h1>
          <div className="card__buttons">
          <div className="card__button"><PlayBtn id={vidDetails._id}/></div>
          <div className="card__button"><WatchListBtn  data={vidDetails} /></div>
          <div className="card__button"><LikeBtn data={vidDetails} /></div>
          <div className="card__button"><Link href={"/videoDetails/"+vidDetails?._id}><BsInfo /></Link></div>            
          </div>
        </div>} 
        <div className="progress-bar" style={{color:"red"}}>
          <div className="progress-bar__bar" 
            style={{
                height: "100%",
                width: `${percentWatched}%`,
              }}>

          </div>
        </div> 
    </div>
  )
}
