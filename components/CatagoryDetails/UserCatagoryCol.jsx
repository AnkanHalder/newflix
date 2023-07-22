import React from 'react'
import Link from 'next/link';
import { LikeBtn,PlayBtn,WatchListBtn } from '@/utils/icons';

function truncate(str,n) {
  return str?.length > n ? str.substr(0,n-1) + ' ...' : ''; 
}

function getRow(element){
  return (
    <div className='catagoryDetails__row'>
    <div className='catagoryDetails__image-container'>
    <Link href={"/videoDetails/"+element._id}><img className='catagoryDetails__image' src={element.vidPosterLink} />
    </Link>
    </div>
    <div className='catagoryDetails__content'>
      <Link href={"/videoDetails/"+element._id}><h1 className='catagoryDetails__title'>{element.vidName}</h1></Link>
      <div className='catagoryDetails__buttons'>
        <div className='catagoryDetails__button'><PlayBtn id={element._id}/></div>
        <div className='catagoryDetails__button'><WatchListBtn data={element}/></div>
        <div className='catagoryDetails__button'><LikeBtn data={element}/></div>
      </div>
      <Link href={"/videoDetails/"+element._id}><p className='catagoryDetails__description'>{truncate(element.vidDescription,120)}</p>      
      </Link>
    </div>
    </div>
  )
}
const UserCatagoryCol = (props) => {
  return (
    <div >
      {props.list.map((ele)=>getRow(ele))}
    </div>
  )
}

export default UserCatagoryCol