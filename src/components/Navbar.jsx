import React from 'react';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className={`flex justify-between items-center ${darkMode ? 'bg-black text-white' : 'bg-sky-700 text-black'} py-2`}>
      <div className="logo">
        <span className='font-bold text-xl mx-9'>TaskTrek</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
      <button
        onClick={toggleDarkMode}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
