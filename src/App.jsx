import { BrowserRouter } from 'react-router-dom'
import { CharacterProvider } from './contexts/CharacterContext'
import AppRoutes from './routes'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <div className="min-h-screen bg-wilder-900">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
        </div>
      </CharacterProvider>
    </BrowserRouter>
  )
}
