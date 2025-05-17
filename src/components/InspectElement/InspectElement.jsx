'use client'
import { useEffect } from 'react'

const InspectElement = ({ children }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_INSPECT_ELEMENT === "true") {
      const handleContextMenu = e => {
        e.preventDefault()
      }

      const handleKeyDown = e => {
        if (e.keyCode === 123) {
          e.preventDefault()
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
          e.preventDefault()
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
          e.preventDefault()
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
          e.preventDefault()
        }
        if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
          e.preventDefault()
        }
      }

      if (typeof window !== 'undefined') {
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('keydown', handleKeyDown)
      }

      return () => {
        if (typeof window !== 'undefined') {
          document.removeEventListener('contextmenu', handleContextMenu)
          document.removeEventListener('keydown', handleKeyDown)
        }
      }
    }
  }, [])

  return children
}

export default InspectElement
