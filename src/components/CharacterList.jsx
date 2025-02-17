import { useCharacters } from '../contexts/CharacterContext'
import { Link, useNavigate } from 'react-router-dom'
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
  FiHeart,
  FiX,
  FiEdit3,
  FiEye,
  FiDownload
} from 'react-icons/fi'
import ParticlesBackground from './ParticlesBackground'
import ImportExportCharacters from './ImportExportCharacters'
import CharacterCard from './CharacterCard'
import ExportPDFModal from './ExportPDFModal'

export default function CharacterList() {
  const { characters } = useCharacters()
  const navigate = useNavigate()
  const titleRef = useRef(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('todos')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [showPDFModal, setShowPDFModal] = useState(false)

  const characterArray = Array.isArray(characters) 
    ? characters 
    : Object.values(characters)

  const filteredCharacters = characterArray.filter(char => {
    const matchesSearch = char.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'todos' || char.tipo === filter
    return matchesSearch && matchesFilter
  })

  // Ref para o scroll horizontal
  const filterScrollRef = useRef(null)

  // Função para lidar com o touch scroll
  const handleTouchScroll = (e) => {
    const element = e.currentTarget
    let startX = e.touches[0].pageX - element.offsetLeft
    let scrollLeft = element.scrollLeft

    const handleTouchMove = (e) => {
      const x = e.touches[0].pageX - element.offsetLeft
      const walk = (x - startX) * 2
      element.scrollLeft = scrollLeft - walk
    }

    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', () => {
      element.removeEventListener('touchmove', handleTouchMove)
    }, { once: true })
  }

  const handleCharacterClick = (e, character) => {
    e.preventDefault()
    setSelectedCharacter(character)
  }

  const handleEditClick = (e, characterId) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCharacter(null)
    navigate(`/edit/${characterId}`)
  }

  const handleViewClick = (e, characterId) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCharacter(null)
    navigate(`/view/${characterId}`)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12 bg-wood bg-cover bg-fixed bg-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wilder-900/70 to-wilder-900/90" />
        <motion.div 
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-title mb-6 tracking-wider text-center">
            WilderFeast
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-center mb-8 px-4 text-wilder-200">
            Um mundo de mistério e perigo aguarda. Crie seus personagens e monstros 
            para explorar as profundezas da floresta selvagem.
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4">
        {/* Actions Bar */}
        <div className="sticky top-20 z-30 bg-wilder-900/95 backdrop-blur-sm py-4 mb-8 border-b border-wilder-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-title mb-2">Seus Personagens</h2>
              <p className="text-wilder-300">
                Gerencie seus personagens e monstros
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <ImportExportCharacters />
              <Link 
                to="/create" 
                className="btn btn-primary flex items-center gap-2 justify-center sm:justify-start"
              >
                <FiPlus /> Criar Personagem
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Busca */}
          <div className="w-full relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-wilder-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar personagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-wilder-800 rounded-lg
                       text-sm border-2 border-wilder-700 focus:border-mystic-gold"
            />
          </div>

          {/* Filtros e Visualização */}
          <div className="flex justify-between items-center w-full">
            {/* Filtros com touch scroll */}
            <div 
              ref={filterScrollRef}
              className="flex gap-2 overflow-x-auto pb-2 max-w-[70%] hide-scrollbar touch-pan-x"
              onTouchStart={handleTouchScroll}
            >
              <div className="flex gap-2 px-0.5">
                <button
                  onClick={() => setFilter('todos')}
                  className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                           touch-manipulation select-none active:scale-95 transition-transform
                           ${filter === 'todos' 
                             ? 'bg-mystic-gold border-mystic-gold text-wilder-900' 
                             : 'border-wilder-700 text-wilder-200'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('personagem')}
                  className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                           touch-manipulation select-none active:scale-95 transition-transform
                           ${filter === 'personagem' 
                             ? 'bg-mystic-gold border-mystic-gold text-wilder-900' 
                             : 'border-wilder-700 text-wilder-200'}`}
                >
                  Personagens
                </button>
                <button
                  onClick={() => setFilter('monstro')}
                  className={`px-3 py-1.5 rounded-full text-sm border-2 whitespace-nowrap
                           touch-manipulation select-none active:scale-95 transition-transform
                           ${filter === 'monstro' 
                             ? 'bg-mystic-red border-mystic-red text-wilder-900' 
                             : 'border-wilder-700 text-wilder-200'}`}
                >
                  Monstros
                </button>
              </div>
            </div>

            {/* Visualização */}
            <div className="flex gap-2">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg touch-manipulation select-none 
                           active:scale-95 transition-transform
                           ${viewMode === mode 
                             ? 'bg-mystic-gold text-wilder-900' 
                             : 'bg-wilder-700 text-wilder-200'}`}
                >
                  {mode === 'grid' ? <FiGrid className="w-5 h-5" /> : <FiList className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Characters Grid/List */}
        <div className={`
          w-full
          ${viewMode === 'grid' 
            ? 'character-grid' 
            : 'flex flex-col gap-4'
          }
        `}>
          {/* Personagens existentes */}
          {filteredCharacters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              viewMode={viewMode}
              onClick={handleCharacterClick}
            />
          ))}
          
          {/* Slots vazios - sempre mostra até completar 8 slots */}
          {viewMode === 'grid' && Array.from({ length: Math.max(0, 8 - filteredCharacters.length) }).map((_, index) => (
            <div 
              key={`empty-${index}`}
              className="aspect-square rounded-lg border-2 border-dashed border-wilder-700/30 
                       bg-wilder-800/20 flex items-center justify-center
                       transition-all duration-200 hover:border-mystic-gold/30 hover:bg-wilder-800/30"
            >
              <Link 
                to="/create"
                className="text-center p-4 w-full h-full flex flex-col items-center justify-center"
              >
                <FiPlus className="w-8 h-8 mb-2 text-wilder-700/50" />
                <p className="text-sm text-wilder-700/50">
                  Criar Personagem
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalhes do personagem */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div 
              className="bg-wilder-800 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Cabeçalho */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-title text-wilder-100">{selectedCharacter.nome}</h2>
                  <p className="text-wilder-300 capitalize">{selectedCharacter.tipo}</p>
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="p-1 hover:bg-wilder-700 rounded-lg"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Imagem */}
              {selectedCharacter.imagem && (
                <div className="mb-6">
                  <img
                    src={selectedCharacter.imagem}
                    alt={selectedCharacter.nome}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Descrição */}
              {selectedCharacter.descricao && (
                <div className="mb-6">
                  <h3 className="text-lg font-title text-mystic-gold mb-2">Descrição</h3>
                  <p className="text-wilder-200">{selectedCharacter.descricao}</p>
                </div>
              )}

              {/* Estilos */}
              <div className="mb-6">
                <h3 className="text-lg font-title text-mystic-gold mb-2">Estilos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedCharacter.estilos).map(([key, value]) => (
                    <div 
                      key={key}
                      className="bg-wilder-700/50 p-2 rounded-lg flex justify-between items-center"
                    >
                      <span className="text-sm text-wilder-300 capitalize">{key}</span>
                      <span className="text-sm font-medium text-mystic-gold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Habilidades */}
              <div className="mb-6">
                <h3 className="text-lg font-title text-mystic-gold mb-2">Habilidades</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedCharacter.habilidades).map(([key, value]) => (
                    <div 
                      key={key}
                      className="bg-wilder-700/50 p-2 rounded-lg flex justify-between items-center"
                    >
                      <span className="text-sm text-wilder-300 capitalize">{key}</span>
                      <span className="text-sm font-medium text-mystic-gold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traços */}
              {selectedCharacter.tracos?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-title text-mystic-gold mb-2">Traços</h3>
                  <div className="space-y-2">
                    {selectedCharacter.tracos.map((traco, index) => (
                      <div 
                        key={index}
                        className="bg-wilder-700/50 p-3 rounded-lg"
                      >
                        <h4 className="font-medium text-wilder-100">{traco.nome}</h4>
                        <p className="text-sm text-wilder-300 mt-1">{traco.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={(e) => handleEditClick(e, selectedCharacter.id)}
                  className="btn flex-1 flex items-center justify-center gap-2"
                >
                  <FiEdit3 /> Editar
                </button>
                <button 
                  onClick={(e) => handleViewClick(e, selectedCharacter.id)}
                  className="btn flex-1 flex items-center justify-center gap-2"
                >
                  <FiEye /> Ver Ficha
                </button>
                <button 
                  onClick={() => setShowPDFModal(true)}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <FiDownload /> Exportar PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adicione o modal de PDF */}
      <AnimatePresence>
        {showPDFModal && (
          <ExportPDFModal
            character={selectedCharacter}
            onClose={() => setShowPDFModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}