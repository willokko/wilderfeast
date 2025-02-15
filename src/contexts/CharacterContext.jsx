import { createContext, useContext, useState } from 'react'

const CharacterContext = createContext()

export function CharacterProvider({ children }) {
  const [characters, setCharacters] = useState([])

  const addCharacter = (character) => {
    setCharacters(prev => [...prev, character])
  }

  const updateCharacter = (index, character) => {
    setCharacters(prev => {
      const newCharacters = [...prev]
      newCharacters[index] = character
      return newCharacters
    })
  }

  const deleteCharacter = (index) => {
    setCharacters(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <CharacterContext.Provider value={{ 
      characters, 
      addCharacter, 
      updateCharacter, 
      deleteCharacter 
    }}>
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