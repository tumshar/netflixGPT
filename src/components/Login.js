import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValideData } from '../utils/validate';

const Login = () => {

const[isSignInForm, setisSignInForm] = useState(true);
const[errorMessage, seterrorMessage]=useState(null);
const email=useRef();
const password=useRef();


const handleButtonClick = () => {
  //validate the form data 


console.log(email.current.value);
console.log(password.current.value);
const message=checkValideData(email.current.value,password.current.value);
seterrorMessage(message);
};

  const toggleSignInform = () => {
 setisSignInForm(!isSignInForm); 
  };




  return (
    
    <div className='relative h-screen w-screen '>
      <Header/>
      <div className='absolute inset-0'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg"
      alt='Netflix back' className='object-cover h-full w-full'/>

 
      </div>
      <form onSubmit={(e) => e.preventDefault()}
      className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg  bg-opacity-80">
      <h1 className='font-bold text-3xl py-4 '>{isSignInForm?"Sign In":"Sign Up"}</h1>

      {!isSignInForm && (
          <input type='text' placeholder='full name'
        className='p-4 my-4 w-full bg-gray-700'/>)}

        <input 
        ref={email}
        type='text' placeholder='email address' 
        className='p-4 my-4 w-full bg-gray-700'/>
 <p className='text-red-800'>{errorMessage} </p>


        <input
        ref={password}
        type='password' placeholder='password' 
        className='p-4 my-4 w-full bg-gray-700'/>

     
        

        <button className='p-4 my-6 bg-red-700 w-full right-0 left-0 rounded-lg' 
        onClick={handleButtonClick}>
          {isSignInForm?"Sign In":"Sign Up"}</button>
       
       <p className='py-4 cursor-pointer' onClick={toggleSignInform}>

       {isSignInForm?"new to netflix? Sign Up now":"email already in use? Sign In now"}
         </p>


      </form>
      
    </div>
  )
};

export default Login;