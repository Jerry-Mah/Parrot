import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between px-6 py-2 bg-gradient-to-r from-customPurple to-customBlue rounded-3xl'>
        <h3 className='text-white font-chakra font-bold text-2xl tracking-widest'>PARROT</h3>
        <h3 className='text-white font-chakra text-xl'>Printing Automation Robot</h3>
    </div>
  )
}

export default Navbar