"use client"
import React,{useState} from 'react'
import "@/styles/LoginSignUp/LoginSignUp.css";
import GoogleButton from 'react-google-button'
import { UserAuth } from '@/context/authContext';
import PopUp from '@/utils/PopUp';
import LoadingPage from './LoadingPage';

const LoginSignUpPage = () => {
  const {user,googleSignIn,logOut} = UserAuth();
  const [loading,setLoading] = useState(false);
  const handleGoogleLogin = async () =>{
    setLoading(true);
    try{
      await googleSignIn();
    } catch(e){
      console.log(e);
    }
  } 
  return (
    <div className='loginSignUpPage'>
    {loading && <LoadingPage />}
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
