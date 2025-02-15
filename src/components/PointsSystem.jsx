import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export default function PointsSystem({ estilos, habilidades }) {
  const calcularPontos = () => {
    const estilosPontos = Object.values(estilos).reduce((a, b) => a + b, 0) * 2
    const habilidadesPontos = Object.values(habilidades).reduce((a, b) => a + b, 0)
    const total = estilosPontos + habilidadesPontos
    const maximo = 30 // Valor máximo permitido

    return {
      total,
      maximo,
      porcentagem: (total / maximo) * 100,
      excedido: total > maximo
    }
  }

  const { total, maximo, porcentagem, excedido } = calcularPontos()

  return (
    <div className="fixed bottom-4 right-4 bg-wilder-800 p-3 sm:p-4 rounded-lg
                    shadow-mystic border-2 border-wilder-700 max-w-[90vw] sm:max-w-none">
      <div className="flex items-center gap-2 mb-2">
        <FiStar className={`w-4 h-4 sm:w-5 sm:h-5 ${excedido ? "text-mystic-red" : "text-mystic-gold"}`} />
        <h4 className="font-title text-sm sm:text-base">Pontos Utilizados</h4>
      </div>
      
      <div className="flex justify-between text-xs sm:text-sm mb-2">
        <span>{total}</span>
        <span className="text-wilder-400">/ {maximo}</span>
      </div>

      <motion.div 
        className="w-36 sm:w-48 h-1.5 sm:h-2 bg-wilder-700 rounded-full overflow-hidden"
      >
        <motion.div 
          className={`h-full ${excedido ? 'bg-mystic-red' : 'bg-mystic-gold'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(porcentagem, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {excedido && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs mt-2 text-mystic-red"
        >
          Limite de pontos excedido!
        </motion.p>
      )}
    </div>
  )
} 