"use client"
import React,{useState} from 'react'
import "@/styles/popUp.css";

const PopUp = () => {
    const [close,setClose] = useState(false);
  return (
    <div className='popUp'>
        <div className="popUp__container" style={{display:(close)?"none":"grid"}}>
        <button className='popUp__close' onClick={()=>{setClose(true)}}>Close</button>
            <p className='popUp__text'>
                This is An Open-Source OTT Platform built with Next Js as a soft clone of NetFlix. This is in no way
                meant to be a commercial project and is completely free software built to showcase personal skills. ALL MEDIA CONTENT used in this website is
                NOT OWNED BY ME AND NOT FOR COMMERCIAL USE. If you have Any Problems with the media hosted in this website, click on the YouTube icon to get 
                redirected to  the Original Source. We just use Embeded YouTube Videos. Even Then, for any concerns and if you want this content taken down
                contact us: halderankanpredator@gmail.com
            </p>
            <button className='popUp_close' style={{height:"4rem"}} onClick={()=>{setClose(true)}}>Close</button>
        </div>
    </div>
  )
}

export default PopUp