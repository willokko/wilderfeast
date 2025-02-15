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
                     rounded-lg p-4 mb-6"
        >
          <h4 className="text-mystic-red font-title mb-2">
            Por favor, corrija os seguintes erros:
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-center gap-2 text-mystic-red/80">
                <FiAlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 