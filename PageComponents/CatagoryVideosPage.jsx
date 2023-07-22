
import React, { useState,useEffect } from 'react'
import apiCaller from '@/api/apiCaller';
import { UserAuth } from '@/context/authContext';
import "@/styles/CatagoryDetails/catagoryDetails.css";
import UserCatagoryCol from '@/components/CatagoryDetails/UserCatagoryCol';
import Nav from '@/components/Nav';

const CatagoryVideosPage = (props) => {
    const [videoList,setVideoList] = useState([]);
    const {user,userSettings} = UserAuth();
    useEffect(() =>{
        console.log(props.type,userSettings,videoList);
        if(["Romedy","Action","Thriller","Horror","Animated"].includes(props.type)) {
            apiCaller.searchByCatagory(props.type).then((data)=>{
                if(data!=null||data!=undefined) setVideoList(data);
            });
    
        } else  if(["watched","liked","watchlist"].includes(props.type)){
            if(user && userSettings){
                if(props.type=="watched"){setVideoList(userSettings.userWatched.map((vid)=>vid.videoDetails));}
                else if(props.type=="liked") setVideoList(userSettings.userLiked);
                else setVideoList(userSettings.userWatchList);
            } 
            else setVideoList([]);
        }
        else {
            apiCaller.search(1000).then((data)=>{
                if(data!=null||data!=undefined) setVideoList(data);
            });
        }
    },[userSettings]);

    if (!videoList || videoList.length === 0) return null;
    console.log(videoList);
    return (
        <div className='catDetails'>
            <Nav />
            <div className='catDetails__container'>
                <h1 style={{marginTop:"2rem", color:"white", fontSize:"4rem"}}>{"View "+props.type+" Videos"}</h1>
                <UserCatagoryCol list={videoList} />
            </div>
        </div>
    )
}

export default CatagoryVideosPage;