import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Função para pegar o valor inicial
  const getInitialValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(getInitialValue)

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
} 