'use client';

import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

export default function FunnyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + 'px';
        cursorRef.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.2;
      followerY += (mouseY - followerY) * 0.2;

      if (followerRef.current) {
        followerRef.current.style.left = followerX + 'px';
        followerRef.current.style.top = followerY + 'px';
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-8 h-8 -ml-4 -mt-4 text-3xl transition-all duration-100"
      >
        💙
      </div>

      {/* Follower con trail */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-40 w-6 h-6 -ml-3 -mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-60"
      ></div>
    </>
  );
}
