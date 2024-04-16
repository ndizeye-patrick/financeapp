import React from 'react'
import { Img } from 'components'
const Header = () => {
  return (
    <nav className='flex w-full items-center justify-between px-[20px] py-[16px] sm:px-2'>
    <a href='/'>
    <Img src="images/img_group_black_900_01.svg" alt="image" className="object-left-top  ml-20 sm:ml-9"  /> 
    </a>
    </nav>
  )
}

export default Header