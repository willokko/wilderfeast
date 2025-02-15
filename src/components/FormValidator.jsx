import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertCircle } from 'react-icons/fi'

export default function FormValidator({ errors }) {
  return (
    <AnimatePresence>
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-mystic-red/20 border-2 border-mystic-red/50 
                   rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
        >
          <h4 className="text-mystic-red font-title text-base sm:text-lg mb-2 sm:mb-3">
            Por favor, corrija os seguintes erros:
          </h4>
          
          <ul className="space-y-1 sm:space-y-2">
            {errors.map((error, index) => (
              <li 
                key={index} 
                className="flex items-center gap-2 text-mystic-red/80"
              >
                <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">{error}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 