import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { FaEllipsisV, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

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
            className="text-white text-3xl cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-black bg-opacity-90 text-white shadow-lg rounded-lg py-2 z-20 border border-gray-700"
              onMouseLeave={() => setDropdownOpen(false)} // Close dropdown when the mouse leaves
            >
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/profile');
                }}
                className="flex items-center w-full text-left px-6 py-3 hover:bg-red-600 transition-colors duration-300"
              >
                <FaUser className="mr-3" /> Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/account');
                }}
                className="flex items-center w-full text-left px-6 py-3 hover:bg-red-600 transition-colors duration-300"
              >
                <FaUser className="mr-3" /> Account
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/settings');
                }}
                className="flex items-center w-full text-left px-6 py-3 hover:bg-red-600 transition-colors duration-300"
              >
                <FaCog className="mr-3" /> Settings
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full text-left px-6 py-3 hover:bg-red-600 transition-colors duration-300"
              >
                <FaSignOutAlt className="mr-3" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
