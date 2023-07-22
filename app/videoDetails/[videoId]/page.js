"use client";
import React from 'react'
import VideoDetailsPage from '@/PageComponents/videoDetailsPage'
import Nav from '@/components/Nav';
import withAuth from '@/utils/withAuth';

const page = ({params}) => {
  return (
    <div>
        <Nav />
        <VideoDetailsPage id={params.videoId}/>
    </div>
  )
}
export default withAuth(page);