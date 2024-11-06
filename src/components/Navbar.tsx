import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectTotalItems } from '../redux/cartSlice';

const Navbar: React.FC = () => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <nav className="fixed top-0 w-full bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">My Store</Link>
      <div className="relative">
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 3h2l3.6 7.59L5.25 16.04A1.99 1.99 0 005 17h12v-2H7.42c-.1 0-.19-.04-.26-.11L7 14.16l1.1-2h7.45a1 1 0 00.95-.68L20.92 5H6.21l-.94-2H3zm5.5 16c-.83 0-1.5.67-1.5 1.5S7.67 22 8.5 22s1.5-.67 1.5-1.5S9.33 19 8.5 19zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
