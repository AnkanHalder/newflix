"use client"
import { useState,useRef } from "react";
import "@/styles/Home/Card.css";
import { LikeBtn,WatchListBtn, PlayBtn} from "@/utils/icons";


export const Card = (props) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const vidDetails = props.vidDetails;

  const handleMouseEnter = () => {
    setIsVideoPlaying(true);
    if (videoRef.current != null) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsVideoPlaying(false);
    if (videoRef.current != null) videoRef.current.pause();
  };

  return (
    <div className='card' onMouseEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}>
        <div className="card__content">
          <h1 className="card__title">{vidDetails.vidName}</h1>
          <div className="card__buttons">
            <PlayBtn />
            <WatchListBtn added={false}  />
            <LikeBtn liked={true} />
          </div>
        </div>
        <video ref={videoRef} className="card__video" src={vidDetails.vidVideoLink} alt={vidDetails.vidName} loop muted playsInline></video>
        <img className='card__image' src={vidDetails.vidBackdropLink} alt={vidDetails.vidName}></img>
       
    </div>
  )
}
