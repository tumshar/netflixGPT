import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; // user ki jagah auth.currentUser use karenge kyoki user updated nahi h to redux me show nahi hgo
              dispatch(
                addUser({
                   uid:uid,
                    email:email,
                     displayName:displayName,
                      photoURL :photoURL,
                    })
                  );
              
            })
            .catch((error) => {
              setErrorMessage(error.code + "************" + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "*****" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "****" + errorMessage);
        });
    }
  };

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm); 
  };

  return (
    <div className='relative h-screen w-screen '>
      <Header/>
      <div className='absolute inset-0'>
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg"
          alt='Netflix back' className='object-cover h-full w-full'/>
      </div>
      <form onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className='font-bold text-3xl py-4 '>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input 
            ref={name}
            type='text' placeholder='full name'
            className='p-4 my-4 w-full bg-gray-700 text-lg'/>
        )}

        <input 
          ref={email}
          type='text' placeholder='email address' 
          className='p-4 my-4 w-full bg-gray-700 text-lg'/>

        <input
          ref={password}
          type='password' placeholder='password' 
          className='p-4 my-4 w-full bg-gray-700 text-lg'/>

        <p className='text-red-800 font-bold text-lg py-2'>{errorMessage} </p>

        <button className='p-4 my-6 bg-red-700 w-full right-0 left-0 rounded-lg' 
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
       
        <p className='py-4 cursor-pointer' onClick={toggleSignInform}>
          {isSignInForm ? "New to Netflix? Sign Up now" : "Email already in use? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
