import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CharacterContext = createContext()

export function CharacterProvider({ children }) {
  const [characters, setCharacters] = useLocalStorage('wilder-feast-characters', {})

  const addCharacter = (character) => {
    const id = Date.now().toString()
    setCharacters(prev => ({
      ...prev,
      [id]: { ...character, id }
    }))
    return id
  }

  const updateCharacter = (id, updatedCharacter) => {
    setCharacters(prev => ({
      ...prev,
      [id]: { ...updatedCharacter, id }
    }))
  }

  const deleteCharacter = (id) => {
    setCharacters(prev => {
      const newCharacters = { ...prev }
      delete newCharacters[id]
      return newCharacters
    })
  }

  const value = {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter
  }

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacters() {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacters must be used within a CharacterProvider')
  }
  return context
} 