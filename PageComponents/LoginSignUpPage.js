"use client"
import React,{useState} from 'react'
import "@/styles/LoginSignUp/LoginSignUp.css";
import GoogleButton from 'react-google-button'

const handleGoogleLogin = () => {
    
};
const LoginSignUpPage = () => {
  return (
    <div className='loginSignUpPage'>
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
