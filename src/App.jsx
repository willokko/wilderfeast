import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { CharacterProvider } from './contexts/CharacterContext'
import Header from './components/Header'
import CharacterList from './components/CharacterList'
import CreateCharacter from './components/CreateCharacter'
import EditCharacter from './components/EditCharacter'
import ViewCharacter from './components/ViewCharacter'

export default function App() {
  return (
    <Router>
      <CharacterProvider>
        <div className="min-h-screen bg-wilder-900 text-wilder-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/create" element={<CreateCharacter />} />
              <Route path="/edit/:id" element={<EditCharacter />} />
              <Route path="/view/:id" element={<ViewCharacter />} />
            </Routes>
          </main>
        </div>
      </CharacterProvider>
    </Router>
  )
}
