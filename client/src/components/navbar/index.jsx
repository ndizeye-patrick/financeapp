import React from 'react';
import { FiSettings, FiUser, FiBell } from 'react-icons/fi';

const NavBar = () => {


  return (
      <div className="flex justify-between sm:justify-around  justify-items-center items-center  p-5 ml-7 sm:ml-0">
      <div className='flex'>  
      <div>
          <h1 className="text-xl text-linear-100 font-bold m-1 sm:text-sm ">Dashboard</h1>
          <div className="bg-gradient-to-tr from-linear-100 to-linear-200 w-full h-1 rounded-full"></div>
        </div>
        <div className='ml-3 flex '>
          <h1 className='text-xl text-black-900_d1 sm:text-sm font-semi m-1'>Taxes </h1>
        </div>
      </div>
        <div className="flex items-center space-x-2">
          <div className='bg-gradient-to-tr from-linear-100 to-linear-200 w-8 grid items-center align-center justify-center h-8 rounded-full'>
          <FiBell className="text-2xl  cursor-pointer hover:text-[#18f2a1] "/>
          </div>
          <div className='bg-gradient-to-tr from-linear-100 to-linear-200 w-8 grid items-center align-center justify-center h-8 rounded-full'>
          <FiSettings className="text-2xl cursor-pointer hover:text-[#18f2a1]" />
          </div>
          <div className='bg-gradient-to-tr from-linear-100 to-linear-200  w-8 grid items-center align-center justify-center h-8 rounded-full'>
          <FiUser className="text-2xl cursor-pointer  hover:text-[#18f2a1]" />
          </div>
        </div>
      </div>
  );
};

export default NavBar;