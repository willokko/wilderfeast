import { HashRouter as Router } from 'react-router-dom'
import { CharacterProvider } from './contexts/CharacterContext'
import AppRoutes from './routes'
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <CharacterProvider>
        <div className="min-h-screen bg-wilder-900 overflow-x-hidden">
          <Header />
          <main className="w-full max-w-[100vw] px-3 xs:px-4 py-6 sm:py-8 mt-16">
            <AppRoutes />
          </main>
        </div>
      </CharacterProvider>
    </Router>
  )
}
