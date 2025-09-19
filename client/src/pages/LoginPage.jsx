import React from 'react';
import assets from '../assets/assets';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    //CALLING LOGIN FUNCTION PRESENT IN THE AUTHCONTEXT
    login(currState === "Sign up" ? "signup" : "login", currState === "Sign up" ? { fullName, email, password, bio } : { email, password });
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      {/* right */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        {/* FORM HEADING */}
        <h2 className='flex justify-between items-center text-2xl font-medium'>
          {currState}
          {isDataSubmitted && (
             <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' onClick={() => setIsDataSubmitted(false)} /> 
          )}
        </h2>

        {/* FULL NAME INPUT */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Full Name'
            required/>
        )}

        {/* EMAIL INPUT */}
        {!isDataSubmitted && (
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email Address'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
        )}

        {/* PASSWORD INPUT */}
        {!isDataSubmitted && (
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
        )}

        {/* BIO INPUT */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Provide a short bio...'
            required />
        )}

        {/* SUBMIT BUTTON */}
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {/* TERMS AND CONDITION */}
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input required type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* BOTTOM AREA */}
        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account?
              <span className='font-medium text-violet-500 cursor-pointer' onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }}>
                {" "}Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account
              <span className='font-medium text-violet-500 cursor-pointer' onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }}>
                {" "}Click here
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  );
};

export default LoginPage;

