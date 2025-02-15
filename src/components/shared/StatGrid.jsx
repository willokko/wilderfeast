import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function StatGrid({ 
  title, 
  stats, 
  onStatClick, 
  className = '',
  isEditing = false 
}) {
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.from(gridRef.current.children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    })
  }, [])

  return (
    <div className={`bg-wilder-800 p-4 rounded-lg ${className}`}>
      <h3 className="text-xl font-title mb-4">{title}</h3>
      <div ref={gridRef} className="grid grid-cols-2 gap-3">
        {Object.entries(stats).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => !isEditing && onStatClick?.(key, value)}
            className={`flex justify-between items-center p-2 bg-wilder-700 
                     rounded-lg ${!isEditing && 'cursor-pointer hover:bg-wilder-600'} 
                     transition-colors`}
          >
            <span className="capitalize">{key}</span>
            {isEditing ? (
              <input
                type="number"
                name={key}
                defaultValue={value}
                min={0}
                className="w-16 text-right bg-wilder-600 rounded px-2 py-1"
              />
            ) : (
              <span className="font-bold text-lg">{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 