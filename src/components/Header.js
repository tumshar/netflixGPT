import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { FaEllipsisV } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        navigate("/error");
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-80 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:brightness-125 transform hover:rotate-3"
        src={LOGO}
        alt="Netflix Logo"
      />

      <div className="flex items-center space-x-6 p-2"> {/* Increased space between elements */}
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

        {/* 3 dots icon to trigger dropdown */}
        <div className="relative">
          <FaEllipsisV
            className="text-white text-3xl cursor-pointer" /* Increased the size of the 3-dot icon */
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-gray-900 text-white shadow-lg rounded-lg py-2 z-20"
              onMouseLeave={() => setDropdownOpen(false)} // Close dropdown when the mouse leaves
            >
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 rounded-lg shadow-md font-semibold text-lg transition-all duration-300 ease-in-out mb-2 hover:scale-105"
              >
                Sign Out
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/profile');
                }}
                className="block w-full text-left px-6 py-3 text-white bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-800 hover:to-gray-600 rounded-lg shadow-md font-semibold text-lg transition-all duration-300 ease-in-out hover:scale-105"
              >
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
