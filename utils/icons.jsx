"use client"
import { BsPlayFill,BsPlus,BsCheck2,BsHandThumbsUp,BsHandThumbsUpFill} from 'react-icons/bs';
import Link from 'next/link';
import "@/styles/utils.css";
import apiCaller from '@/api/apiCaller';
import { UserAuth } from '@/context/authContext';
import { useEffect,useState } from 'react';
import isObjectInArrayById  from './checkObjectInArray';
// import { MdOutlineDone } from 'react-icons/md';

  
const handleWatchList=()=>{};
const handleLike=()=>{};
export const PlayBtn = (props) => {
    return (
        <div className="playBtn">
            <Link href={"/playVideo/" + props.id} ><BsPlayFill /></Link>
        </div>
    )
}
export const WatchListBtn = (props) => {
    const {user,userSettings,setUserSettings} = UserAuth();
    const [inWatchList, setInWatchList] = useState(false);
    useEffect(()=>{
        if(userSettings !== null && userSettings !== undefined
             && isObjectInArrayById(props.data, userSettings.userWatchList)){
            //if GIVEN VIDEO ALREADY IN WATCHLIST:
            setInWatchList(true);
        }
        else{
            setInWatchList(false);
        }
    },[userSettings]);
    return (
        <div className="watchListBtn" 
            onClick={()=>{ 
                apiCaller.addToWatchList(user.email, props.data).then((success)=>{
                    if(success){
                        if(!inWatchList){
                            const updatedUserSettings = {
                                ...userSettings,
                                userWatchList: [...userSettings.userWatchList, props.data]
                            };
                            setUserSettings(updatedUserSettings);
                        } else{
                            const updatedUserSettings = {
                                ...userSettings,
                                userWatchList: userSettings.userWatchList.filter(item => item._id !== props.data._id)
                            };
                            setUserSettings(updatedUserSettings);
                        }   
                    }
                    setInWatchList((success)?(!inWatchList):inWatchList);
                });
                }}>
        {(inWatchList)?<BsCheck2 className='active'/>:<BsPlus />}
        </div>
    )
}
export const LikeBtn = (props) => {
    const {user,userSettings,setUserSettings} = UserAuth();
    const [inLikedVideos, setInLikedVideos] = useState(false);
    useEffect(()=>{
        if(userSettings !== null && userSettings !== undefined
             && isObjectInArrayById(props.data, userSettings.userLiked)){
            //if GIVEN VIDEO ALREADY IN WATCHLIST:
            setInLikedVideos(true);
        }
        else{
            setInLikedVideos(false);
        }
    },[userSettings]);
    return (
        <div className="likeBtn" 
            onClick={()=>{ 
                apiCaller.addToLikedVideos(user.email, props.data).then((success)=>{
                    if(success){
                        if(!inLikedVideos){
                            const updatedUserSettings = {
                                ...userSettings,
                                userLiked: [...userSettings.userLiked, props.data]
                            };
                            setUserSettings(updatedUserSettings);
                        } else{
                            const updatedUserSettings = {
                                ...userSettings,
                                userLiked: userSettings.userLiked.filter(item => item._id !== props.data._id)
                            };
                            setUserSettings(updatedUserSettings);
                        }   
                    }
                    ((success)?(!inLikedVideos):inLikedVideos);
                });
                }}>
        {(inLikedVideos)?<BsHandThumbsUpFill className='active'/>:<BsHandThumbsUp />}
        </div>
    )
}

