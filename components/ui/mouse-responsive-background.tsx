'use client'

import React, { useEffect, useRef } from 'react'

interface ParallaxBackgroundProps {
  imageUrl?: string
  children?: React.ReactNode
  overlay?: string
}

const ParallaxBackground = ({
  imageUrl = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=2940&auto=format&fit=crop',
  children,
  overlay = 'rgba(0,0,0,0.72)',
}: ParallaxBackgroundProps) => {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth / 5
      const windowHeight = window.innerHeight / 5
      const mouseX = e.clientX / windowWidth
      const mouseY = e.clientY / windowHeight
      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 0.05s linear',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: overlay, zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}

export default ParallaxBackground
