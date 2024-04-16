import React from 'react';
import { Button } from 'components';
function LogoutButton() {

  function handleLogout() {
    fetch('http://localhost:5000/api/logout', {
      credentials: 'include',
    }).then(()=> 
    window.location.reload()
    )
  }

  return (
    <Button 
    onClick ={handleLogout}
    shape="square" className="absolute -top-[29%] right-[10%] sm:-top-[44%] sm:-right-[30px] bg-white-A700_02  
    border-2 border-solid deep_purple_A400_indigo_A700_border text-black-900
    hover:bg-gradient-to-t hover:from-linear-100 hover:to-linear-200  hover:text-white-A700_02 justify-center align-center text-center content-center object-fit">LOG OUT
    </Button>
  
  );
}

export default LogoutButton;

