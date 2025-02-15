import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizes[size]} border-3 border-wilder-600 
                  border-t-mystic-gold rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
} 