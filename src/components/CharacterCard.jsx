import { motion } from 'framer-motion'
import { FiFilter } from 'react-icons/fi'

export default function CharacterCard({ character, viewMode, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full h-full
        bg-wilder-800 rounded-lg overflow-hidden
        transition-all duration-200 hover:transform hover:scale-[1.02]
        border-2 border-wilder-700 hover:border-wilder-600 cursor-pointer
        ${character.tipo === 'monstro' ? 'hover:border-mystic-red' : 'hover:border-mystic-gold'}
        ${viewMode === 'list' ? 'flex items-center' : 'flex flex-col'}
      `}
      onClick={(e) => onClick(e, character)}
    >
      <div className={`
        ${viewMode === 'list'
          ? "w-24 h-24 flex-shrink-0"
          : "w-full aspect-square"
        }
        bg-wilder-700
      `}>
        {character.imagem ? (
          <img 
            src={character.imagem} 
            alt={character.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiFilter className="w-8 h-8 text-wilder-500" />
          </div>
        )}
      </div>
      <div className={`
        p-4 flex flex-col
        ${viewMode === 'grid' ? '' : 'flex-1'}
      `}>
        <h3 className="text-lg font-title text-wilder-100 line-clamp-1">
          {character.nome}
        </h3>
        <p className="text-sm text-wilder-300 capitalize">
          {character.tipo}
        </p>
      </div>
    </motion.div>
  )
} 