import { FiPlus, FiMinus } from 'react-icons/fi'

export default function NumberInput({ 
  label, 
  name, 
  value, 
  onChange, 
  min = 0, 
  max = 5 
}) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <label className="block text-sm sm:text-base text-wilder-200">
        {label}
      </label>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="p-1.5 sm:p-2 hover:bg-wilder-600 rounded-md
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={value <= min}
        >
          <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>

        <input
          type="number"
          name={name}
          value={value}
          onChange={(e) => {
            const newValue = Math.min(max, Math.max(min, parseInt(e.target.value) || 0))
            onChange(newValue)
          }}
          className="w-12 sm:w-16 text-center bg-wilder-600 rounded-md
                   px-1 sm:px-2 py-1 sm:py-1.5 text-sm sm:text-base
                   focus:outline-none focus:ring-1 focus:ring-mystic-gold"
          min={min}
          max={max}
        />

        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="p-1.5 sm:p-2 hover:bg-wilder-600 rounded-md
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={value >= max}
        >
          <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  )
} 