import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { FiArrowLeft, FiEdit3, FiTrash2 } from 'react-icons/fi'
import { gsap } from 'gsap'
import StatGrid from './shared/StatGrid'

export default function ViewCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { characters, deleteCharacter } = useCharacters()
  const containerRef = useRef(null)
  
  const character = characters[id]

  useEffect(() => {
    if (!character) {
      navigate('/')
      return
    }

    // Animações de entrada
    const tl = gsap.timeline()
    tl.from(".character-header", {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".stat-section", {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3")
  }, [character, navigate])

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(id)
      navigate('/')
    }
  }

  if (!character) return null

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-6 sm:py-8">
      {/* Cabeçalho */}
      <div className="character-header bg-wilder-800 rounded-lg p-6 mb-8 shadow-mystic">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-wilder-700">
            {character.imagem ? (
              <img 
                src={character.imagem} 
                alt={character.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-wilder-700 flex items-center justify-center">
                <FiEdit3 className="w-8 h-8 text-wilder-500" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-title mb-2">{character.nome}</h1>
            <p className="text-wilder-300 text-lg capitalize mb-4">{character.tipo}</p>
            {character.descricao && (
              <p className="text-wilder-200 max-w-2xl">{character.descricao}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Link 
              to={`/edit/${id}`}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiEdit3 /> Editar
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger flex items-center gap-2"
            >
              <FiTrash2 /> Excluir
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estilos */}
        <div className="stat-section">
          <StatGrid
            title="Estilos"
            stats={character.estilos}
            className="h-full"
          />
        </div>

        {/* Habilidades */}
        <div className="stat-section">
          <StatGrid
            title="Habilidades"
            stats={character.habilidades}
            className="h-full"
          />
        </div>
      </div>

      {/* Traços */}
      {character.tracos?.length > 0 && (
        <div className="stat-section mt-6">
          <div className="bg-wilder-800 rounded-lg p-6 shadow-mystic">
            <h2 className="text-2xl font-title text-mystic-gold mb-4">Traços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.tracos.map((traco, index) => (
                <div 
                  key={index}
                  className="bg-wilder-700/50 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-title text-wilder-100 mb-2">{traco.nome}</h3>
                  <p className="text-wilder-300">{traco.descricao}</p>
                  {character.tipo === 'monstro' && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-wilder-400">Resistência:</span>
                      <span className="text-mystic-gold font-medium">{traco.resistencia}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Botão Voltar */}
      <div className="mt-8">
        <Link 
          to="/"
          className="btn flex items-center gap-2 text-wilder-300 hover:text-wilder-100"
        >
          <FiArrowLeft /> Voltar para Lista
        </Link>
      </div>
    </div>
  )
} 