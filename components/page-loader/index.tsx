import React from 'react'

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6a00]"></div>
    </div>
  )
}

export default PageLoader