import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FiPlus, FiMenu, FiX, FiHome, FiBook } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const headerRef = useRef(null)
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll com throttle para melhor performance
  useEffect(() => {
    let timeoutId = null
    const handleScroll = () => {
      if (timeoutId) return
      
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20)
        timeoutId = null
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const menuItems = [
    { icon: FiHome, label: 'Início', path: '/' },
    { icon: FiPlus, label: 'Criar Personagem', path: '/create' },
    { icon: FiBook, label: 'Regras', path: '/rules' }
  ]

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                   ${isScrolled ? 'bg-wilder-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Brand */}
            <Link 
              to="/" 
              className="text-2xl font-title tracking-wider text-wilder-100 
                       hover:text-mystic-gold transition-colors"
            >
              WilderFeast
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg
                             transition-all duration-200 relative
                             ${isActive 
                               ? 'text-mystic-gold bg-wilder-700/30' 
                               : 'text-wilder-200 hover:text-mystic-gold hover:bg-wilder-700/20'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 border-b-2 border-mystic-gold rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-wilder-200 hover:text-mystic-gold
                       transition-colors rounded-lg hover:bg-wilder-700/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-wilder-800 
                       border-l border-wilder-700 z-50 md:hidden"
            >
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-title text-wilder-100">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-wilder-200 hover:text-mystic-gold
                             transition-colors rounded-lg hover:bg-wilder-700/20"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg
                                 transition-all duration-200
                                 ${isActive 
                                   ? 'text-mystic-gold bg-wilder-700/50' 
                                   : 'text-wilder-200 hover:text-mystic-gold hover:bg-wilder-700/20'}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 