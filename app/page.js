"use client"
import Home from "@/PageComponents/Home";
import LoginSignUpPage from "@/PageComponents/LoginSignUpPage";
import { UserAuth } from '@/context/authContext';

export default function Index() {
  const {user} = UserAuth();
  return (
    <main>
    {(user==null)?<LoginSignUpPage/>:
       <Home/> }
    </main>
  
  )
}
