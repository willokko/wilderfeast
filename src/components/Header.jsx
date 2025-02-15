import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function Header() {
  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }, [])

  return (
    <header 
      ref={headerRef}
      className="bg-wilder-800 border-b border-wilder-700 shadow-mystic"
    >
      <div className="content-container">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-3xl font-title text-wilder-100 hover:text-mystic-gold transition-colors"
          >
            Wilder Feast
          </Link>
          <nav className="space-x-4">
            {location.pathname !== '/' && (
              <Link to="/" className="btn">
                Voltar
              </Link>
            )}
            {location.pathname === '/' && (
              <Link to="/create" className="btn btn-primary">
                Criar Personagem
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 