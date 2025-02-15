import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

const traitSuggestions = {
  poderoso: [
    { nome: "Força Bruta", descricao: "Capaz de realizar feitos de força extraordinários." },
    { nome: "Resistente", descricao: "Suporta danos físicos com maior facilidade." }
  ],
  ligeiro: [
    { nome: "Reflexos Rápidos", descricao: "Reage rapidamente a situações de perigo." },
    { nome: "Ágil", descricao: "Move-se com graça e velocidade." }
  ],
  preciso: [
    { nome: "Olhos de Águia", descricao: "Possui uma mira excepcional." },
    { nome: "Meticuloso", descricao: "Presta atenção aos mínimos detalhes." }
  ],
  capcioso: [
    { nome: "Astuto", descricao: "Encontra soluções criativas para problemas." },
    { nome: "Manipulador", descricao: "Hábil em influenciar outros." }
  ]
}

export default function TraitSuggestions({ estilos, onSelect }) {
  const dominantStyle = Object.entries(estilos)
    .reduce((a, b) => a[1] > b[1] ? a : b)[0]

  return (
    <div className="mt-4">
      <h4 className="text-lg font-title mb-2">Sugestões de Traços</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {traitSuggestions[dominantStyle]?.map((trait, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-wilder-700/30 p-4 rounded-lg hover:bg-wilder-700/50
                     cursor-pointer transition-colors duration-200"
            onClick={() => onSelect(trait)}
          >
            <div className="flex justify-between items-start">
              <h5 className="font-title text-mystic-gold">{trait.nome}</h5>
              <button className="text-wilder-400 hover:text-mystic-gold">
                <FiPlus />
              </button>
            </div>
            <p className="text-sm text-wilder-300 mt-1">{trait.descricao}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 