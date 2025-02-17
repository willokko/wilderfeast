import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiDownload } from 'react-icons/fi'
import { PDFDownloadLink } from '@react-pdf/renderer'
import CharacterSheet from './CharacterSheet'

export default function ExportPDFModal({ character, onClose }) {
  const [playerInfo, setPlayerInfo] = useState({
    playerName: '',
    campaign: '',
    notes: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    // O PDFDownloadLink vai lidar com o download automaticamente
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-wilder-800 rounded-lg p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-title text-mystic-gold">Exportar Ficha PDF</h2>
          <button
            onClick={onClose}
            className="text-wilder-400 hover:text-wilder-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="form-field">
            <label className="text-sm text-wilder-300">Nome do Jogador</label>
            <input
              type="text"
              value={playerInfo.playerName}
              onChange={e => setPlayerInfo(prev => ({ ...prev, playerName: e.target.value }))}
              className="input-field"
              placeholder="Seu nome"
            />
          </div>

          <div className="form-field">
            <label className="text-sm text-wilder-300">Campanha</label>
            <input
              type="text"
              value={playerInfo.campaign}
              onChange={e => setPlayerInfo(prev => ({ ...prev, campaign: e.target.value }))}
              className="input-field"
              placeholder="Nome da campanha"
            />
          </div>

          <div className="form-field">
            <label className="text-sm text-wilder-300">Notas Adicionais</label>
            <textarea
              value={playerInfo.notes}
              onChange={e => setPlayerInfo(prev => ({ ...prev, notes: e.target.value }))}
              className="input-field min-h-[100px]"
              placeholder="Notas sobre o personagem..."
            />
          </div>
        </div>

        <PDFDownloadLink
          document={<CharacterSheet character={character} playerInfo={playerInfo} />}
          fileName={`${character.nome.toLowerCase().replace(/\s+/g, '-')}-wilder-feast.pdf`}
          className={`
            btn btn-primary w-full flex items-center justify-center gap-2
            ${isGenerating ? 'opacity-50 cursor-wait' : ''}
          `}
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              return (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white" />
                  <span>Gerando PDF...</span>
                </>
              )
            }
            if (error) {
              return 'Erro ao gerar PDF. Tente novamente.'
            }
            return (
              <>
                <FiDownload /> Baixar PDF
              </>
            )
          }}
        </PDFDownloadLink>
      </motion.div>
    </motion.div>
  )
} 