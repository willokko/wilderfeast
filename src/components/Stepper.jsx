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
    <div className="mb-8">
      <div className="stepper">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index < currentStep - 1
          const isActive = index === currentStep - 1

          return (
            <div key={index} className="flex-1">
              <div 
                className={`step-item ${isActive ? 'active' : ''} 
                           ${isCompleted ? 'completed' : ''}`}
                onClick={() => onStepClick(index + 1)}
              >
                <div className={`step-counter ${isActive ? 'active' : ''} 
                                ${isCompleted ? 'completed' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm">{step.label}</span>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-wilder-700 mx-4" />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <motion.div 
        className="progress-bar mt-4"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
      >
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </motion.div>
    </div>
  )
} 