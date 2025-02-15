import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { FiX } from 'react-icons/fi'

export default function TraitsList({ 
  title, 
  items, 
  onRemove, 
  className = '', 
  isEditing = false 
}) {
  const listRef = useRef(null)

  useEffect(() => {
    gsap.from(listRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    })
  }, [items])

  return (
    <div className={`card p-3 xs:p-4 sm:p-5 ${className}`}>
      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-title mb-2 xs:mb-3 sm:mb-4">
        {title}
      </h3>
      
      <div ref={listRef} className="space-y-2 xs:space-y-3 sm:space-y-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className="bg-wilder-700/80 rounded-lg p-2 xs:p-3 sm:p-4 
                     border-2 border-transparent hover:border-wilder-600
                     transition-colors duration-200"
          >
            <div className="flex justify-between items-start gap-2 xs:gap-3 mb-2">
              <h4 className="text-sm xs:text-base sm:text-lg font-medium text-wilder-100">
                {item.nome}
              </h4>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="p-1 text-wilder-400 hover:text-mystic-red 
                           hover:bg-wilder-600/50 rounded-md
                           transition-colors duration-200"
                >
                  <FiX className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
            
            <p className="text-xs xs:text-sm sm:text-base text-wilder-300 whitespace-pre-wrap">
              {item.descricao}
            </p>
            
            {item.resistencia !== undefined && (
              <div className="mt-2 xs:mt-3 flex items-center gap-2">
                <span className="text-xs xs:text-sm text-wilder-400">Resistência:</span>
                <span className="text-xs xs:text-sm sm:text-base font-medium text-mystic-gold">
                  {item.resistencia}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 