import React from 'react'
import { Img  } from 'components'

const Footer = () => {
  return (
    <footer className="fixed justify-center items-center  w-full sm:left-0  top-[92%]">
    <div className="container mx-auto flex justify-center items-center">
    <span className="text-gray-600">Powered By</span>
    <Img
    src="images/img_logo_light_1.svg" alt="logolightone"
    className="ml-2 h-6"
    />
    </div>
  </footer>
  );
};

export default Footer;