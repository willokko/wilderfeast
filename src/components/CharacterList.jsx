import { useCharacters } from '../contexts/CharacterContext'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function CharacterList() {
  const { characters } = useCharacters()
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const sectionsRef = useRef([])

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

    // Animação dos cards
    gsap.from(".character-card", {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    })
  }, [])

  const characterArray = Array.isArray(characters) ? characters : Object.values(characters)
  const personagens = characterArray.filter(char => char.tipo === 'personagem')
  const monstros = characterArray.filter(char => char.tipo === 'monstro')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-12 bg-wood bg-cover bg-center py-16">
        <div className="absolute inset-0 bg-wilder-900/70"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 
            ref={titleRef}
            className="text-5xl font-title text-wilder-100 mb-4 tracking-wider"
          >
            Wilder Feast
          </h1>
          <p className="text-wilder-200 text-lg max-w-2xl mx-auto">
            Um mundo de mistério e perigo aguarda. Crie seus personagens e monstros 
            para explorar as profundezas da floresta selvagem.
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4">
        {/* Seção de Personagens */}
        <section 
          ref={el => sectionsRef.current[0] = el}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Personagens</h2>
            <Link to="/create" className="btn btn-primary">
              Criar Novo
            </Link>
          </div>
          
          {personagens.length === 0 ? (
            <div className="text-center py-12 bg-wilder-800/50 rounded-lg">
              <p className="text-wilder-300 text-lg">
                Nenhum personagem criado ainda.
              </p>
              <Link to="/create" className="btn btn-primary mt-4">
                Criar Primeiro Personagem
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {personagens.map((char, index) => (
                <Link 
                  key={index} 
                  to={`/view/${index}`}
                  className="character-card personagem"
                >
                  <div className="character-image-container">
                    <img 
                      src={char.imagem} 
                      alt={char.nome}
                      className="character-image"
                    />
                  </div>
                  <div className="character-info">
                    <h3>{char.nome}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Seção de Monstros */}
        <section 
          ref={el => sectionsRef.current[1] = el}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Monstros</h2>
            <Link to="/create" className="btn btn-primary">
              Criar Novo
            </Link>
          </div>

          {monstros.length === 0 ? (
            <div className="text-center py-12 bg-wilder-800/50 rounded-lg">
              <p className="text-wilder-300 text-lg">
                Nenhum monstro criado ainda.
              </p>
              <Link to="/create" className="btn btn-primary mt-4">
                Criar Primeiro Monstro
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {monstros.map((char, index) => (
                <Link 
                  key={index} 
                  to={`/view/${index}`}
                  className="character-card monstro"
                >
                  <div className="character-image-container">
                    <img 
                      src={char.imagem} 
                      alt={char.nome}
                      className="character-image"
                    />
                  </div>
                  <div className="character-info">
                    <h3>{char.nome}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
} 