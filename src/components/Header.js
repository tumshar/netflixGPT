import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(() => {
  const unsubscribe=  onAuthStateChanged(auth, (user) => {
      if(user) {
         const { uid, email, displayName, photoURL } = user;
         dispatch(
           addUser({
             uid: uid,
             email: email,
             displayName: displayName,
             photoURL: photoURL,
           })
         );
         navigate("/browse");
        }
        else{
          dispatch(removeUser());
          navigate("/");
        }
      });

      return () => unsubscribe(); // unsubscribe when the component unmounts

    },[]);




  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
    <img 
    className="w-80 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:brightness-125 transform hover:rotate-3"
    src={LOGO}
    alt="Netflix Logo" 
/>

    
    <div className="flex items-center space-x-4 p-2">
      {user && user.photoURL ? (
        <img
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          alt="usericon"
          src={user.photoURL}
        />
      ) : (
        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">U</span>
        </div>
      )}
  
  <button
  onClick={handleSignOut}
  className=" text-md font-bold text-black bg-gradient-to-r from-red-600 to-red-400 px-6 py-2 rounded-full shadow-md hover:bg-red-500 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out ml-4"
>
  Sign Out
</button>

    </div>
  </div>
  
  );
};

export default Header;
