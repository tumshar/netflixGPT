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
import { FaSearch } from 'react-icons/fa'; // Added import for FaSearch

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

      <div className="flex items-center space-x-6 p-2">
        {user && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105 font-bold"
            onClick={() => {/* Add your GPT Search functionality here */}}
          >
            <FaSearch className="text-lg" />
            <span className="text-sm uppercase tracking-wider">GPT Search</span>
          </button>
        )}
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
              className="absolute right-0 mt-2 w-64 bg-black bg-opacity-95 text-white shadow-xl rounded-lg py-3 z-20 border border-gray-700 transform transition-all duration-300 ease-in-out"
              onMouseLeave={() => setDropdownOpen(false)} // Close dropdown when the mouse leaves
            >
              {['Profile', 'Account', 'Settings'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/${item.toLowerCase()}`);
                  }}
                  className="flex items-center w-full text-left px-6 py-4 hover:bg-red-600 transition-colors duration-300 group"
                >
                  {item === 'Profile' && <FaUser className="mr-4 text-xl group-hover:text-white" />}
                  {item === 'Account' && <FaUser className="mr-4 text-xl group-hover:text-white" />}
                  {item === 'Settings' && <FaCog className="mr-4 text-xl group-hover:text-white" />}
                  <span className="text-lg font-semibold group-hover:text-white">{item}</span>
                </button>
              ))}
              <div className="border-t border-gray-700 my-2"></div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full text-left px-6 py-4 hover:bg-red-600 transition-colors duration-300 group"
              >
                <FaSignOutAlt className="mr-4 text-xl group-hover:text-white" />
                <span className="text-lg font-semibold group-hover:text-white">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
