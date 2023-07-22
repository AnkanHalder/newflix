"use client"
import React from 'react'
import CatagoryVideosPage from '@/PageComponents/CatagoryVideosPage';
import withAuth from '@/utils/withAuth';

function page({params}) {
  return (
    <div>
        <CatagoryVideosPage type={params.catagoryType}  />
    </div>
  )
}

export default withAuth(page);