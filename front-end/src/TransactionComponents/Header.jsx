import React from 'react'

function Header({user}) {
  return (
    <div className="flex justify-start items-start w-full "> {/* Ensure this takes full width */}
    <h2 className="text-xl font-bold w-full">Welcome, {user.name}</h2>
  </div>
  )
}

export default Header
