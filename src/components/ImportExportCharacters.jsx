import { useState, useRef } from 'react'
import { useCharacters } from '../contexts/CharacterContext'
import { FiDownload, FiUpload, FiX, FiCheck, FiFilePlus } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import ExportPDFModal from './ExportPDFModal'

export default function ImportExportCharacters() {
  const { characters, addCharacter } = useCharacters()
  const [showImportModal, setShowImportModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showExportPDFModal, setShowExportPDFModal] = useState(false)
  const [error, setError] = useState('')
  const [selectedCharacters, setSelectedCharacters] = useState([])
  const [selectedCharacterForPDF, setSelectedCharacterForPDF] = useState(null)
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const dataToExport = selectedCharacters.length > 0
      ? selectedCharacters.reduce((acc, id) => {
          if (characters[id]) {
            acc[id] = characters[id]
          }
          return acc
        }, {})
      : characters

    const dataStr = JSON.stringify(dataToExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wilderfeast-characters-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setShowExportModal(false)
    setSelectedCharacters([])
  }

  const toggleCharacterSelection = (id) => {
    setSelectedCharacters(prev => 
      prev.includes(id)
        ? prev.filter(charId => charId !== id)
        : [...prev, id]
    )
  }

  const selectAllCharacters = () => {
    setSelectedCharacters(Object.keys(characters))
  }

  const deselectAllCharacters = () => {
    setSelectedCharacters([])
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (typeof result !== 'string') {
          throw new Error('Formato de arquivo inválido')
        }
        
        const importedData = JSON.parse(result)
        
        // Validação básica dos dados
        if (typeof importedData !== 'object') {
          throw new Error('Formato de arquivo inválido')
        }

        // Importa cada personagem
        Object.values(importedData).forEach(character => {
          addCharacter(character)
        })

        setShowImportModal(false)
        setError('')
      } catch (err) {
        setError('Erro ao importar arquivo. Certifique-se de que é um arquivo JSON válido.')
      }
    }
    reader.readAsText(file)
  }

  const handleExportPDF = (character = null) => {
    if (character) {
      setSelectedCharacterForPDF(character)
    } else if (selectedCharacters.length === 1) {
      setSelectedCharacterForPDF(characters[selectedCharacters[0]])
    } else {
      // Aqui você pode implementar a lógica para exportar múltiplos PDFs
      // Por enquanto, vamos apenas alertar o usuário
      alert('Por favor, selecione apenas um personagem para exportar o PDF')
      return
    }
    setShowExportPDFModal(true)
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setShowExportModal(true)}
          className="btn flex items-center gap-2"
        >
          <FiDownload /> Exportar
        </button>
        <button
          onClick={() => setShowImportModal(true)}
          className="btn flex items-center gap-2"
        >
          <FiUpload /> Importar
        </button>
      </div>

      {/* Modal de Exportação */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-wilder-800 rounded-lg p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-title text-mystic-gold">Exportar Personagens</h2>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-wilder-400 hover:text-wilder-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(characters).map(([id, character]) => (
                  <div
                    key={id}
                    onClick={() => toggleCharacterSelection(id)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer
                      transition-colors duration-200
                      ${selectedCharacters.includes(id)
                        ? 'bg-mystic-gold/20 border-2 border-mystic-gold'
                        : 'bg-wilder-700/50 border-2 border-transparent hover:bg-wilder-700'
                      }
                    `}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-wilder-700 flex-shrink-0">
                      {character.imagem ? (
                        <img
                          src={character.imagem}
                          alt={character.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiUpload className="w-5 h-5 text-wilder-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-wilder-100 font-medium">{character.nome}</h3>
                      <p className="text-sm text-wilder-300 capitalize">{character.tipo}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="btn"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExport}
                  className="btn flex items-center gap-2"
                >
                  <FiDownload /> Exportar JSON
                </button>
                <button
                  onClick={() => handleExportPDF()}
                  className="btn btn-primary flex items-center gap-2"
                  disabled={selectedCharacters.length !== 1}
                >
                  <FiFilePlus /> Exportar PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Importação */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-wilder-800 rounded-lg p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-title text-mystic-gold">Importar Personagens</h2>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-wilder-400 hover:text-wilder-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-wilder-200">
                  Selecione um arquivo JSON exportado anteriormente para importar seus personagens.
                </p>

                {error && (
                  <div className="bg-mystic-red/20 text-mystic-red p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-wilder-700 rounded-lg">
                  <FiUpload className="w-8 h-8 text-wilder-400" />
                  <div className="text-center">
                    <label className="btn btn-primary cursor-pointer">
                      Escolher Arquivo
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                      />
                    </label>
                    <p className="mt-2 text-sm text-wilder-400">
                      Apenas arquivos .json são aceitos
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de PDF */}
      <AnimatePresence>
        {showExportPDFModal && selectedCharacterForPDF && (
          <ExportPDFModal
            character={selectedCharacterForPDF}
            onClose={() => {
              setShowExportPDFModal(false)
              setSelectedCharacterForPDF(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
} 