import { motion } from 'framer-motion'
import { FiImage } from 'react-icons/fi'

export default function CharacterPreview({ data, imagePreview }) {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="section-title">Preview</h3>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-wilder-700/50">
        {imagePreview ? (
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-wilder-400">
            <FiImage className="w-12 h-12" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-title">{data.nome || 'Nome do Personagem'}</h4>
        <p className="text-wilder-300 capitalize">{data.tipo}</p>
        {data.descricao && (
          <p className="text-sm text-wilder-200 line-clamp-3">{data.descricao}</p>
        )}
      </div>
    </div>
  )
} 