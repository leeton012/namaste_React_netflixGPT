import React, { useState } from 'react';
import Header from './Header';
import { Form } from 'react-router-dom';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className=''
          src='https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg'
          alt='logo'
        />
      </div>
      <Form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && (
          <input type='text' placeholder='Full Name' className='p-2 my-3 w-full bg-gray-800' />
        )}
        <input type='text' placeholder='Email Address' className='p-2 my-3 w-full bg-gray-800' />
        <input type='password' placeholder='Password' className='p-2 my-3 w-full bg-gray-800' />
        <button className='p-4 my-5 w-full bg-red-700 rounded-lg'>
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
