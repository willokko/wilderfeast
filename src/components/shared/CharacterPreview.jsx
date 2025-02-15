import { motion } from 'framer-motion'
import { FiImage } from 'react-icons/fi'

export default function CharacterPreview({ data, imagePreview }) {
  return (
    <motion.div 
      className="card p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5
                sticky top-20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-title text-wilder-100">
        Preview
      </h3>

      <div className="relative aspect-square rounded-lg overflow-hidden 
                    bg-wilder-700/50 border-2 border-wilder-600">
        {imagePreview ? (
          <motion.img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-wilder-400">
            <FiImage className="w-10 h-10 sm:w-12 sm:h-12 opacity-50" />
          </div>
        )}
      </div>

      <div className="space-y-2 sm:space-y-3">
        <h4 className="text-lg sm:text-xl font-title text-wilder-100">
          {data.nome || 'Nome do Personagem'}
        </h4>
        <p className="text-sm sm:text-base text-wilder-300 capitalize">
          {data.tipo}
        </p>
      </div>

      {/* Stats Preview */}
      {Object.keys(data.estilos).length > 0 && (
        <div className="pt-3 sm:pt-4 border-t border-wilder-700">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {Object.entries(data.estilos).map(([key, value]) => (
              <div 
                key={key}
                className="bg-wilder-700/50 p-2 sm:p-3 rounded-lg
                         flex justify-between items-center"
              >
                <span className="text-xs sm:text-sm text-wilder-300 capitalize">
                  {key}
                </span>
                <span className="text-sm sm:text-base font-medium text-mystic-gold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
} 