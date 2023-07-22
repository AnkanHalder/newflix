"use client";
import React, { useEffect } from 'react'
import "@/styles/nav.css";
import { useState } from 'react';
import { UserAuth } from '@/context/authContext';

export default function Nav() {
    const {logOut} = UserAuth();
    const [show,handleShow] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleShow(!true);
        }
        else{
            handleShow(!false);
        }
    }
    useEffect(()=>{
        transitionNavBar();
        window.addEventListener("scroll", transitionNavBar);
        return ()=>{
            window.removeEventListener("scroll",transitionNavBar);
        }
    },[]);
  return (
    <div className={"nav " + ((show)?"":"nav__black")}>
        <h1 className='nav__heading'>NEWFLIX</h1>
        <button className="logOutBtn" onClick={logOut}>LOG OUT</button>
    </div>
  )
}
