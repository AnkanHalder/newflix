"use client"
import React,{useState} from 'react'
import "@/styles/LoginSignUp/LoginSignUp.css";
import GoogleButton from 'react-google-button'
import { UserAuth } from '@/context/authContext';
import PopUp from '@/utils/PopUp';

const LoginSignUpPage = () => {
  const {user,googleSignIn,logOut} = UserAuth();
  const handleGoogleLogin = async () =>{
    try{
      await googleSignIn();
    } catch(e){
      console.log(e);
    }
  } 
  return (
    <div className='loginSignUpPage'>
    <PopUp />
        <div className='form__container'>
            <div className="login1">
                <form className="auth-form">
                    <GoogleButton onClick={handleGoogleLogin} />
                </form>
            </div>
        </div>
       
    </div>
  )
}
export default LoginSignUpPage;
