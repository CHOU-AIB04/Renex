import React from 'react'

const Wrapper = ({children, className}) => {
  return (
    <div className={`mx-auto max-w-[1680px] px-4 sm:px-10 md:px-14 lg:px-16 xl:px-20 ${className}`}>
      {children}
    </div>
  )
}

export default Wrapper