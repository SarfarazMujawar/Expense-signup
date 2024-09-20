import React from 'react'

function Input({ type, placeholder, value, onChange, label,name,className }) {
  return (
    <div>
     
      <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoComplete='off'
      />
    </div>
  )
}

export default Input
