import React from 'react'
import logo from '../img/logo.png';


function homePage () {
  return (
    <div className='flex h-screen items-center justify-center'>
      <a>
        <img src={logo}/>
      </a>
    </div>
  )
}

export default homePage;
