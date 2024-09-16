import React from 'react'

function Input({ type, placeholder, value, onChange, label }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
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
