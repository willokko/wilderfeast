import { Link } from 'react-router-dom'
import { FiFilter } from 'react-icons/fi'

export default function CharacterCard({ character, viewMode, onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    onClick?.(e, character)
  }

  return (
    <div 
      onClick={handleClick}
      className={`character-card ${character.tipo} ${
        viewMode === 'list' 
          ? 'flex items-center p-2' 
          : 'block'
      } cursor-pointer`}
    >
      <div className={
        viewMode === 'list'
          ? "w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden"
          : "aspect-square rounded-t-lg overflow-hidden"
      }>
        {character.imagem ? (
          <img 
            src={character.imagem} 
            alt={character.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-wilder-700">
            <FiFilter className="w-6 h-6 text-wilder-500" />
          </div>
        )}
      </div>
      <div className={
        viewMode === 'list'
          ? "flex-1 px-3"
          : "p-3"
      }>
        <h3 className="text-base font-title text-wilder-100 line-clamp-1">{character.nome}</h3>
        <p className="text-sm text-wilder-300 capitalize">{character.tipo}</p>
      </div>
    </div>
  )
} 