import React from 'react'

const Wrapper = ({children, className}) => {
  return (
    <div className={`mx-auto max-w-[1440px] px-6 sm:px-10 md:px-16 lg:px-24 ${className}`}>
      {children}
    </div>
  )
}

export default Wrapper