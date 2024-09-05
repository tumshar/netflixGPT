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
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
        className='w-48'
        src={LOGO}
        alt='Netflix Logo'
      />
      <div className='flex p-2'>
        {user && user.photoURL ? (
          <img 
            className='w-12 h-12'
            alt="usericon" 
            src={user.photoURL}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-500 rounded-full"></div> // Placeholder if photoURL is not available
        )}
        <button onClick={handleSignOut} className='font-bold text-lg '>Sign out</button>
      </div>
    </div>
  );
};

export default Header;
