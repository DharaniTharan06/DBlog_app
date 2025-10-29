import React from 'react'

function Button({children, type = "button", bgcolor = 'bg-blue-100',
    textColor = 'text-white', className = '' , ...props
}) {
  return (
    <Button className={`px-4 py-2 rounded-full ${className} ${bgcolor} ${textColor}`} {...props}type={type}>
        {children}
    </Button>
  )
}

export default Button
