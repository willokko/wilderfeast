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
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const sectionsRef = useRef([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredCard, setHoveredCard] = useState(null)
  
  // Intersection Observer para animações de scroll
  const [listRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Variantes para animações do Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  useEffect(() => {
    // Animação do título
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Animação das seções
    gsap.from(sectionsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })

    // Animação dos cards com hover
    const cards = document.querySelectorAll('.character-card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.character-info'), {
          y: 0,
          opacity: 1,
          duration: 0.3
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.character-info'), {
          y: 20,
          opacity: 0,
          duration: 0.3
        })
      })
    })
  }, [])

  const characterArray = Array.isArray(characters) ? characters : Object.values(characters)
  
  // Filtragem e ordenação
  const filteredCharacters = characterArray
    .filter(char => {
      const matchesSearch = char.nome.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || char.tipo === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.nome.localeCompare(b.nome)
      if (sortBy === 'type') return a.tipo.localeCompare(b.tipo)
      return 0
    })

  const personagens = filteredCharacters.filter(char => char.tipo === 'personagem')
  const monstros = filteredCharacters.filter(char => char.tipo === 'monstro')

  // Função para renderizar ícones de status
  const renderStatusIcons = (char) => {
    const icons = []
    if (Math.max(...Object.values(char.estilos)) >= 4) {
      icons.push(<FiStar key="star" className="text-mystic-gold" title="Elite" />)
    }
    if (char.tipo === 'monstro' && char.partes.length > 2) {
      icons.push(<FiShield key="shield" className="text-mystic-red" title="Multi-partes" />)
    }
    if (char.tracos.length > 2) {
      icons.push(<FiAward key="award" className="text-blue-400" title="Complexo" />)
    }
    return icons
  }

  // Função para calcular poder total
  const calculatePower = (char) => {
    const estilosTotal = Object.values(char.estilos).reduce((a, b) => a + b, 0)
    const habilidadesTotal = Object.values(char.habilidades).reduce((a, b) => a + b, 0)
    return estilosTotal + habilidadesTotal
  }

  // Componente de Card
  const CharacterCard = ({ char, index, type }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHoveredCard(index)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <Link 
        to={`/view/${index}`}
        className={`character-card ${type} group relative`}
      >
        <div className="character-image-container overflow-hidden">
          <motion.img 
            src={char.imagem} 
            alt={char.nome}
            className="character-image"
            animate={{
              scale: hoveredCard === index ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {renderStatusIcons(char)}
          </div>
          <motion.div 
            className="character-info absolute bottom-0 left-0 right-0 bg-gradient-to-t from-wilder-900/95 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hoveredCard === index ? 1 : 0,
              y: hoveredCard === index ? 0 : 20
            }}
          >
            <h3 className="text-xl font-title mb-2">{char.nome}</h3>
            <div className="flex gap-2 flex-wrap mb-2">
              {Object.entries(char.estilos).map(([estilo, valor]) => (
                valor > 0 && (
                  <span 
                    key={estilo}
                    className="text-sm px-2 py-1 bg-wilder-700/50 rounded-full
                             flex items-center gap-1"
                  >
                    {estilo} <span className="text-mystic-gold">{valor}</span>
                  </span>
                )
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-wilder-300">
              <span className="flex items-center gap-1">
                <FiHeart /> {calculatePower(char)}
              </span>
              <span>{char.tracos.length} traços</span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section com Parallax */}
      <div className="relative h-96 mb-12 bg-wood bg-cover bg-fixed bg-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wilder-900/70 to-wilder-900/90" />
        {/* Remova ou comente esta linha */}
        {/* <ParticlesBackground /> */}
        <motion.div 
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            ref={titleRef}
            className="text-6xl font-title text-wilder-100 mb-6 tracking-wider text-center"
          >
            Wilder Feast
          </h1>
          <p className="text-wilder-200 text-xl max-w-2xl mx-auto text-center mb-8">
            Um mundo de mistério e perigo aguarda. Crie seus personagens e monstros 
            para explorar as profundezas da floresta selvagem.
          </p>
          <Link 
            to="/create" 
            className="btn btn-primary flex items-center gap-2 text-lg px-6 py-3 transform hover:scale-105 transition-transform"
          >
            <FiPlus /> Criar Nova Entidade
          </Link>
        </motion.div>
      </div>

      {/* Tabs e Controles */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-wilder-800 rounded-lg shadow-mystic overflow-hidden">
          <div className="flex border-b border-wilder-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 text-lg font-title transition-colors
                ${activeTab === 'all' 
                  ? 'bg-wilder-700 text-wilder-100' 
                  : 'text-wilder-300 hover:text-wilder-100'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('personagens')}
              className={`px-6 py-3 text-lg font-title transition-colors
                ${activeTab === 'personagens' 
                  ? 'bg-wilder-700 text-wilder-100' 
                  : 'text-wilder-300 hover:text-wilder-100'}`}
            >
              Personagens
            </button>
            <button
              onClick={() => setActiveTab('monstros')}
              className={`px-6 py-3 text-lg font-title transition-colors
                ${activeTab === 'monstros' 
                  ? 'bg-wilder-700 text-wilder-100' 
                  : 'text-wilder-300 hover:text-wilder-100'}`}
            >
              Monstros
            </button>
          </div>

          {/* Barra de Controles */}
          <div className="p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wilder-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn flex items-center gap-2"
            >
              <FiFilter /> Filtros
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn-icon ${viewMode === 'grid' ? 'text-mystic-gold' : ''}`}
                title="Visualização em Grade"
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn-icon ${viewMode === 'list' ? 'text-mystic-gold' : ''}`}
                title="Visualização em Lista"
              >
                <FiList />
              </button>
            </div>
          </div>

          {/* Painel de Filtros */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-wilder-700/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-wilder-200 mb-2">Tipo</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">Todos</option>
                    <option value="personagem">Personagens</option>
                    <option value="monstro">Monstros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-wilder-200 mb-2">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field"
                  >
                    <option value="name">Nome</option>
                    <option value="type">Tipo</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Personagens/Monstros */}
      <motion.div 
        ref={listRef}
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredCharacters.map((char, index) => (
                <CharacterCard 
                  key={index} 
                  char={char} 
                  index={index}
                  type={char.tipo}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Visualização em Lista */}
              {filteredCharacters.map((char, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-wilder-800 rounded-lg overflow-hidden shadow-mystic"
                >
                  <Link 
                    to={`/view/${index}`}
                    className="flex items-center p-4 hover:bg-wilder-700/50 transition-colors"
                  >
                    <img 
                      src={char.imagem} 
                      alt={char.nome}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-title">{char.nome}</h3>
                        {renderStatusIcons(char)}
                      </div>
                      <div className="flex gap-2 mt-1">
                        {Object.entries(char.estilos)
                          .filter(([_, valor]) => valor > 0)
                          .map(([estilo, valor]) => (
                            <span 
                              key={estilo}
                              className="text-sm px-2 py-0.5 bg-wilder-700/50 rounded-full"
                            >
                              {estilo} {valor}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                    <div className="text-right text-wilder-300">
                      <div className="flex items-center gap-1 justify-end">
                        <FiHeart />
                        <span>{calculatePower(char)}</span>
                      </div>
                      <span className="text-sm">{char.tracos.length} traços</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 