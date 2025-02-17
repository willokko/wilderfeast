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
    <div className="space-y-2">
      <label className="block text-wilder-200">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="btn p-2"
          disabled={value <= min}
        >
          <FiMinus className="w-4 h-4" />
        </button>
        <input
          type="number"
          name={name}
          value={value}
          onChange={e => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || 0)))}
          className="input-field text-center w-16"
          min={min}
          max={max}
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="btn p-2"
          disabled={value >= max}
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 