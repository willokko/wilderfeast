export default function StatGrid({ 
  title, 
  stats, 
  onStatClick, 
  className = '',
  isEditing = false 
}) {
  // ... resto do código permanece igual

  return (
    <div className={`bg-wilder-800 p-3 sm:p-4 rounded-lg ${className}`}>
      <h3 className="text-lg sm:text-xl font-title mb-3 sm:mb-4">{title}</h3>
      <div ref={gridRef} className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
        {Object.entries(stats).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => !isEditing && onStatClick?.(key, value)}
            className={`flex justify-between items-center p-2 sm:p-3 bg-wilder-700 
                     rounded-lg ${!isEditing && 'cursor-pointer hover:bg-wilder-600'} 
                     transition-colors`}
          >
            <span className="capitalize text-sm sm:text-base">{key}</span>
            {isEditing ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onStatClick?.(key, Math.max(0, value - 1))}
                  className="p-1 hover:bg-wilder-600 rounded"
                >
                  <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <input
                  type="number"
                  name={key}
                  defaultValue={value}
                  min={0}
                  className="w-12 sm:w-16 text-right bg-wilder-600 rounded px-1 sm:px-2 py-1 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => onStatClick?.(key, Math.min(5, value + 1))}
                  className="p-1 hover:bg-wilder-600 rounded"
                >
                  <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <span className="font-bold text-base sm:text-lg">{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 