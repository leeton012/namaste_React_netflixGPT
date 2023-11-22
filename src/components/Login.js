import React, { useRef, useState } from 'react';
import Header from './Header';
import { Form, useNavigate } from 'react-router-dom';
import { formValidate } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase.config';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const handleButtonClick = () => {
    //validate the form data
    const error = formValidate(email.current.value, password.current.value)
    setErrorMessage(error)
    //if any error came then just return from there
    if (error) return;

    // if Signin Form is not true then write sign up Logic
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //update the user with display name and photo
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/53507102?v=4"
          }).then(() => {
            const { uid, displayName, email, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, displayName: displayName, email: email, photoURL: photoURL }))
            navigate("/browse")
          }).catch((error) => {
            setErrorMessage(error.message)
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-- " + errorMessage)
        });
    } else {
      //sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-- " + errorMessage)
        });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className='absolute bg-gradient-to-b'>
        <img
          className=''
          src='https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='logo'
        />
      </div>
      <Form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && (
          <input ref={name} type='text' placeholder='Full Name' className='p-2 my-3 w-full bg-gray-800' />
        )}
        <input ref={email} type='text' placeholder='Email Address' className='p-2 my-3 w-full bg-gray-800' />
        <input ref={password} type='password' placeholder='Password' className='p-2 my-3 w-full bg-gray-800' />
        <p className='text-red-500 font-bold py-2'>{errorMessage}</p>
        <button className='p-4 my-5 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'SignUp'}
        </button>
        <p className='py-4 cursor-pointer underline' onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up now' : 'Already registered? Sign In now'}
        </p>
      </Form>
    </div>
  );
};

export default Login;
