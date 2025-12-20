import React from 'react'

function Button({children, type = "button", bgcolor = 'bg-blue-100',
    textColor = 'text-white', className = '' , ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-full ${className} ${bgcolor} ${textColor}`} {...props} type={type}>
        {children}
    </button>
  )
}

export default Button
