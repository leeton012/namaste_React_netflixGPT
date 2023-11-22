import React from 'react';
import logo from '../assets/images/pngwing.com.png';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-40' src={logo} alt='logo' />
      {user && <div className='flex p-2'>
        <img className='w-14 h-14'
          alt='usericon' src={user?.photoURL} />
        <button className='font-bold text-white underline' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  );
};

export default Header;
