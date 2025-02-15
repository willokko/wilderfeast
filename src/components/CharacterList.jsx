import { useCharacters } from '../contexts/CharacterContext'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiGrid, 
  FiList, 
  FiStar, 
  FiShield, 
  FiAward, 
  FiHeart 
} from 'react-icons/fi'
import ParticlesBackground from './ParticlesBackground'

export default function CharacterList() {
  const { characters } = useCharacters()
  const titleRef = useRef(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('todos')
  const [viewMode, setViewMode] = useState('grid')

  const characterArray = Array.isArray(characters) ? characters : Object.values(characters)

  const filteredCharacters = characterArray.filter(char => {
    const matchesSearch = char.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'todos' || char.tipo === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen max-w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-48 xs:h-64 sm:h-96 mb-6 xs:mb-8 sm:mb-12 
                    bg-wood bg-cover bg-fixed bg-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-wilder-900/70 to-wilder-900/90" />
        <motion.div 
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title 
                     mb-3 xs:mb-4 sm:mb-6 tracking-wider text-center"
          >
            Wilder Feast
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto 
                     text-center mb-4 xs:mb-6 sm:mb-8 px-4 text-wilder-200">
            Um mundo de mistério e perigo aguarda. Crie seus personagens e monstros 
            para explorar as profundezas da floresta selvagem.
          </p>
          <Link 
            to="/create" 
            className="btn btn-primary flex items-center gap-2 text-sm xs:text-base sm:text-lg 
                     px-3 xs:px-4 sm:px-6 py-2 sm:py-3 transform hover:scale-105 transition-transform"
          >
            <FiPlus className="w-4 h-4 xs:w-5 xs:h-5" /> Criar Nova Entidade
          </Link>
        </motion.div>
      </div>

      <div className="w-full px-3 xs:px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Barra de Busca e Filtros */}
        <div className="flex flex-col gap-4 mb-6 w-full">
          {/* Busca */}
          <div className="w-full relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-wilder-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar personagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-wilder-800 rounded-lg
                       text-sm border-2 border-wilder-700 focus:border-mystic-gold"
            />
          </div>

          {/* Filtros e Visualização */}
          <div className="flex justify-between items-center w-full">
            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-2 max-w-[70%]">
              <button
                onClick={() => setFilter('todos')}
                className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                         ${filter === 'todos' 
                           ? 'bg-mystic-gold border-mystic-gold text-wilder-900' 
                           : 'border-wilder-700 text-wilder-200'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('personagem')}
                className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                         ${filter === 'personagem' 
                           ? 'bg-mystic-gold border-mystic-gold text-wilder-900' 
                           : 'border-wilder-700 text-wilder-200'}`}
              >
                Personagens
              </button>
              <button
                onClick={() => setFilter('monstro')}
                className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                         ${filter === 'monstro' 
                           ? 'bg-mystic-red border-mystic-red text-wilder-900' 
                           : 'border-wilder-700 text-wilder-200'}`}
              >
                Monstros
              </button>
            </div>

            {/* Visualização */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-mystic-gold text-wilder-900' 
                    : 'bg-wilder-700 text-wilder-200'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-mystic-gold text-wilder-900' 
                    : 'bg-wilder-700 text-wilder-200'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Personagens */}
        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
            : "flex flex-col gap-4 w-full"
        }>
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map(character => (
              <Link 
                key={character.id} 
                to={`/view/${character.id}`}
                className={`character-card ${character.tipo} ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
              >
                <div className={
                  viewMode === 'list'
                    ? "w-24 h-24 flex-shrink-0"
                    : "aspect-square"
                }>
                  {character.imagem ? (
                    <img 
                      src={character.imagem} 
                      alt={character.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-wilder-700">
                      <FiFilter className="w-8 h-8 text-wilder-500" />
                    </div>
                  )}
                </div>
                <div className={
                  viewMode === 'list'
                    ? "flex-1 px-4"
                    : "p-4"
                }>
                  <h3 className="text-lg font-title">{character.nome}</h3>
                  <p className="text-sm text-wilder-300">{character.tipo}</p>
                </div>
              </Link>
            ))
          ) : (
            [...Array(8)].map((_, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg border-2 border-dashed border-wilder-700/30 
                         bg-wilder-800/20 flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <FiPlus className="w-8 h-8 mx-auto mb-2 text-wilder-700/50" />
                  <p className="text-sm text-wilder-700/50">
                    Slot de Personagem
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 