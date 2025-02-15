import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { FiPlus, FiMinus } from 'react-icons/fi'

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
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    })
  }, [])

  return (
    <div className={`card p-3 sm:p-4 md:p-5 ${className}`}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-title mb-3 sm:mb-4">
        {title}
      </h3>
      
      <div 
        ref={gridRef} 
        className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 md:gap-4"
      >
        {Object.entries(stats).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => !isEditing && onStatClick?.(key, value)}
            className={`flex justify-between items-center p-2 sm:p-3 
                     bg-wilder-700/80 rounded-lg 
                     ${!isEditing && 'cursor-pointer hover:bg-wilder-600'} 
                     transition-colors duration-200`}
          >
            <span className="capitalize text-sm sm:text-base text-wilder-200">
              {key}
            </span>
            
            {isEditing ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onStatClick?.(key, Math.max(0, value - 1))}
                  className="p-1 hover:bg-wilder-600 rounded-md 
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={value <= 0}
                >
                  <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={(e) => {
                    const newValue = Math.min(5, Math.max(0, parseInt(e.target.value) || 0))
                    onStatClick?.(key, newValue)
                  }}
                  className="w-10 sm:w-12 text-center bg-wilder-600 rounded-md 
                           px-1 sm:px-2 py-1 text-sm sm:text-base
                           focus:outline-none focus:ring-1 focus:ring-mystic-gold"
                  min="0"
                  max="5"
                />
                
                <button
                  type="button"
                  onClick={() => onStatClick?.(key, Math.min(5, value + 1))}
                  className="p-1 hover:bg-wilder-600 rounded-md 
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={value >= 5}
                >
                  <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-mystic-gold">
                  {value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 