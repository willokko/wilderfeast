import { motion } from 'framer-motion'
import { 
  FiUser,
  FiSliders,
  FiActivity,
  FiFeather 
} from 'react-icons/fi'

export default function Stepper({ currentStep, onStepClick, progress }) {
  const steps = [
    { icon: FiUser, label: "Básico" },
    { icon: FiSliders, label: "Estilos" },
    { icon: FiActivity, label: "Habilidades" },
    { icon: FiFeather, label: "Traços" }
  ]

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index < currentStep - 1
          const isActive = index === currentStep - 1
          
          return (
            <button
              key={index}
              onClick={() => onStepClick?.(index + 1)}
              className={`flex flex-col items-center gap-2 sm:gap-3 
                       transition-colors duration-200
                       ${isActive ? 'text-mystic-gold' : 'text-wilder-400'}
                       ${isCompleted ? 'text-wilder-100' : ''}`}
            >
              <div className={`relative w-8 sm:w-10 h-8 sm:h-10 rounded-full 
                           flex items-center justify-center
                           ${isActive ? 'bg-mystic-gold text-wilder-900' : 'bg-wilder-700'}
                           ${isCompleted ? 'bg-wilder-600' : ''}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {isCompleted && (
                  <motion.div
                    layoutId="completedIndicator"
                    className="absolute inset-0 bg-mystic-gold rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium">{step.label}</span>
            </button>
          )
        })}
      </div>

      <motion.div 
        className="h-1 sm:h-2 bg-wilder-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="h-full bg-mystic-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  )
} 