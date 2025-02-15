import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { gsap } from 'gsap'

export default function ViewCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { characters } = useCharacters()
  const containerRef = useRef(null)
  const [diceResults, setDiceResults] = useState(null)

  const character = characters[id]

  useEffect(() => {
    if (!character) {
      navigate('/')
      return
    }

    const tl = gsap.timeline()

    // Animação da imagem e nome
    tl.from(".character-header", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    // Animação das estatísticas
    tl.from(".stat-item", {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4")

    // Animação das habilidades
    tl.from(".skill-item", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=0.2")

  }, [character, navigate])

  const handleRollDice = (statName, value) => {
    const results = []
    for (let i = 0; i < value; i++) {
      results.push(Math.floor(Math.random() * 6) + 1)
    }
    const d8Result = Math.floor(Math.random() * 8) + 1
    
    setDiceResults({
      statName,
      d6Results: results,
      d8Result,
      total: results.reduce((a, b) => a + b, 0) + d8Result
    })

    // Animação dos resultados dos dados
    gsap.from(".dice-result", {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    })
  }

  if (!character) return null

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      {/* Cabeçalho do Personagem */}
      <div className="character-header flex items-center gap-6 mb-8 bg-wilder-800 p-6 rounded-lg shadow-mystic">
        <img 
          src={character.imagem} 
          alt={character.nome} 
          className="w-32 h-32 rounded-full object-cover border-4 border-wilder-600"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-title mb-2">{character.nome}</h1>
          <p className="text-wilder-300 text-lg">
            {character.tipo === 'personagem' ? 'Personagem' : 'Monstro'}
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            to={`/edit/${id}`} 
            className="btn btn-primary"
          >
            Editar
          </Link>
          <Link 
            to="/" 
            className="btn"
          >
            Voltar
          </Link>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de Estatísticas */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title">Estilos</h2>
            <div className="space-y-4">
              {Object.entries(character.estilos).map(([key, value]) => (
                <div key={key} className="stat-item flex items-center justify-between">
                  <span className="text-wilder-200 capitalize">{key}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-title">{value}</span>
                    <button
                      onClick={() => handleRollDice(key, value)}
                      className="btn btn-primary text-sm px-3 py-1"
                    >
                      Rolar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title">Habilidades</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(character.habilidades).map(([key, value]) => (
                <div key={key} className="skill-item">
                  <span className="text-wilder-200 block capitalize text-sm mb-1">{key}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-title">{value}</span>
                    <button
                      onClick={() => handleRollDice(key, value)}
                      className="btn btn-primary text-sm px-2 py-1"
                    >
                      Rolar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Central */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title">Traços</h2>
            <div className="space-y-4">
              {character.tracos.map((traco, index) => (
                <div key={index} className="bg-wilder-700/50 p-4 rounded-lg">
                  <h3 className="font-title text-lg mb-2">{traco.nome}</h3>
                  <p className="text-wilder-200">{traco.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna de Equipamento/Partes */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="section-title">
              {character.tipo === 'personagem' ? 'Utensílio' : 'Partes'}
            </h2>
            {character.tipo === 'personagem' ? (
              <div className="bg-wilder-700/50 p-4 rounded-lg">
                <h3 className="font-title text-lg mb-2">{character.utensilio.nome}</h3>
                <p className="text-wilder-300 mb-2">
                  Resistência: {character.utensilio.resistencia}
                </p>
                <p className="text-wilder-200">{character.utensilio.descricao}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {character.partes.map((parte, index) => (
                  <div key={index} className="bg-wilder-700/50 p-4 rounded-lg">
                    <h3 className="font-title text-lg mb-2">{parte.nome}</h3>
                    <p className="text-wilder-300 mb-2">
                      Resistência: {parte.resistencia}
                    </p>
                    <p className="text-wilder-200">{parte.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resultados dos Dados */}
      {diceResults && (
        <div className="fixed bottom-8 right-8 bg-wilder-800 p-6 rounded-lg shadow-mystic border-2 border-wilder-700">
          <h3 className="text-xl font-title mb-4">
            Rolagem de {diceResults.statName}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {diceResults.d6Results.map((result, i) => (
              <div 
                key={i} 
                className="dice-result w-12 h-12 flex items-center justify-center 
                         bg-wilder-700 rounded-lg font-bold text-xl"
              >
                {result}
              </div>
            ))}
            <div 
              className="dice-result w-12 h-12 flex items-center justify-center 
                       bg-mystic-gold rounded-lg font-bold text-xl"
            >
              {diceResults.d8Result}
            </div>
          </div>
          <p className="text-xl font-bold text-center">
            Total: {diceResults.total}
          </p>
        </div>
      )}
    </div>
  )
} 