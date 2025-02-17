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
    <div className={`card p-6 max-w-full overflow-hidden ${className}`}>
      {title && (
        <h3 className="text-xl font-title mb-4">{title}</h3>
      )}
      
      <div ref={gridRef} className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => !isEditing && onStatClick?.(key, value)}
            className={`flex justify-between items-center p-3 
                     bg-wilder-700/50 rounded-lg 
                     ${!isEditing && 'cursor-pointer hover:bg-wilder-600'} 
                     transition-colors duration-200`}
          >
            <span className="capitalize text-sm text-wilder-200">
              {key}
            </span>
            
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStatClick?.(key, Math.max(0, value - 1))}
                  className="p-1 hover:bg-wilder-600 rounded-md 
                           transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={value <= 0}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                
                <input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    const newValue = Math.min(5, Math.max(0, parseInt(e.target.value) || 0))
                    onStatClick?.(key, newValue)
                  }}
                  className="w-12 text-center bg-wilder-600 rounded-md 
                           px-2 py-1 text-sm
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
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="font-bold text-lg text-mystic-gold">
                {value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 