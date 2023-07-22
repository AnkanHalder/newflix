"use client"
import "@/styles/Home/Home.css"
import Banner from '@/components/Home/Banner'
import Row from '@/components/Home/Row'
import { useEffect } from "react";
import withAuth from "@/utils/withAuth";
import Nav from "@/components/Nav";
import apiCaller from "@/api/apiCaller";
import UserRows from "@/components/Home/UserRows";
const  Home = () => {
  return (
    <main>
      <Nav />
      <Banner/>
      <UserRows />
      <Row params="Romedy" getCardDataFunction={apiCaller.searchByCatagory} heading="Romedy"  />
      <Row params="Action" getCardDataFunction={apiCaller.searchByCatagory} heading="Action" />
      <Row params="Horror" getCardDataFunction={apiCaller.searchByCatagory} heading="Horror" />
      <Row params="Thriller" getCardDataFunction={apiCaller.searchByCatagory} heading="Thriller"/>
      <Row params="Animated" getCardDataFunction={apiCaller.searchByCatagory} heading="Animated" />
      <h1>Welcome To NewFlix</h1>
    </main>
  
  )
}
export default withAuth(Home);