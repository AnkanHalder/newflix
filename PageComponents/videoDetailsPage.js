"use client"
import React, { useEffect,useState } from 'react'
import withAuth from '@/utils/withAuth'
import "@/styles/videoDetails/videoDetails.css";
import Row from '@/components/Home/Row';
import apiCaller from '@/api/apiCaller';
import { PlayBtn,WatchListBtn,LikeBtn } from '@/utils/icons';
const VideoDetailsPage = (props) => {
    const [videoDetails,setVideoDetails] = useState(null);
  useEffect(()=>{ 
    apiCaller.searchById(props.id).then((results)=>{
        setVideoDetails(results);
    });
    
  },[]);
  async function getRandomVideos(){
    const limit = 10;
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      const data = await apiCaller.search(1090);
      shuffleArray(data);
      return data.slice(0,limit);
  }
  return (
    <div className='videoDetailsPage'>
        {(videoDetails!=null) && <div className='videoDetails'>
            <div className='videoImage__container'>
                <div className='videoImage'>
                    <img className='videoImg' src={videoDetails?.vidPosterLink} />
                </div>
            </div>
            <div className='videoDetails__content'>
                <h1 className='videoDetails__title'>{videoDetails?.vidName}</h1>
                <div className='videoDetails__buttons'>
                    <div className='videoDetails__button'><PlayBtn id={videoDetails?._id}/></div>
                    <div className='videoDetails__button'><WatchListBtn data={videoDetails}/></div>
                    <div className='videoDetails__button'><LikeBtn data={videoDetails}/></div>
                </div>
                <p className='videoDetails__description'>{videoDetails?.vidDescription}</p>
                <div className='videoDetails__buttons'></div>
                <div className='videoDetails__actors'><p className='List'><h3>Actors:</h3>{(videoDetails?.vidActors).map((actor)=>{
                    return <p className='list_element'>{actor + "   "}</p>
                })}</p></div>
                <div className='videoDetails__genres'><p className='List'><h3>Genres:</h3>{(videoDetails?.vidTags).map((cat)=>{
                    return <p className='list_element'>{cat + "   "}</p>
                })}</p></div>
            </div>
            <div className='moreVideos'>
                <Row getCardDataFunction={getRandomVideos} params="More" heading="More" />
            </div>
        </div>}
        
    </div>
  )
}

export default VideoDetailsPage;