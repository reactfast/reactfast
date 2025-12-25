import React, { useState, useEffect } from 'react'

const MobileOnlyPage = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust the breakpoint as needed
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // Render JSX for mobile-only content or a message for larger screens
  if (!isMobile) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          This page is available only on mobile devices.
        </p>
      </div>
    )
  }

  // Render children for mobile screens
  return <>{children}</>
}

export default MobileOnlyPage
