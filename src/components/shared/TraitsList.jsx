import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function TraitsList({ 
  traits, 
  onAdd, 
  onRemove, 
  onChange, 
  isEditing = false 
}) {
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      gsap.from(listRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      })
    }
  }, [traits.length])

  if (isEditing) {
    return (
      <div ref={listRef} className="space-y-4">
        {traits.map((trait, index) => (
          <div key={index} className="bg-wilder-700 p-4 rounded-lg">
            <input
              type="text"
              value={trait.nome}
              onChange={(e) => onChange(index, { ...trait, nome: e.target.value })}
              className="input-field mb-2"
              placeholder="Nome do Traço"
            />
            <textarea
              value={trait.descricao}
              onChange={(e) => onChange(index, { ...trait, descricao: e.target.value })}
              className="input-field"
              placeholder="Descrição do Traço"
              rows="2"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="btn btn-danger mt-2"
            >
              Remover
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="btn btn-primary w-full"
        >
          Adicionar Traço
        </button>
      </div>
    )
  }

  return (
    <div ref={listRef} className="space-y-4">
      {traits.map((trait, index) => (
        <div key={index} className="bg-wilder-700 p-4 rounded-lg">
          <h4 className="font-title text-lg mb-2">{trait.nome}</h4>
          <p className="text-wilder-200">{trait.descricao}</p>
        </div>
      ))}
    </div>
  )
} 