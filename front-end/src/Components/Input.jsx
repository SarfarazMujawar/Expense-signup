import React from 'react'

function Input({ type, placeholder, value, onChange, label,name }) {
  return (
    <div>
     
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default Input
