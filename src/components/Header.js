import React, { useEffect } from 'react';
import logo from '../assets/images/pngwing.com.png';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

  /* calling the oAuthStateChange here because bneed to know when the user is there and
the authentication is there for the user and then login to the "/browse" page else redirect to the "/login" page*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, displayName, email, photoURL } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email, photoURL: photoURL }))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/")
      }
    })
    // Unsubscribe component when Unmount
    return () => unsubscribe()
  }, [])

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-40 h-49' src={logo} alt='logo' />
      {user && <div className='flex p-2'>
        <img className='w-14 h-14'
          alt='usericon' src={user?.photoURL} />
        <button className='font-bold text-white underline' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  );
};

export default Header;
