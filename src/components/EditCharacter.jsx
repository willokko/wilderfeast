import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { gsap } from 'gsap'
import StatGrid from './shared/StatGrid'
import TraitsList from './shared/TraitsList'
import { Link } from 'react-router-dom'
import { tracos as tracosDisponiveis } from '../data/tracos'
import { FiPlus, FiX, FiImage, FiUpload, FiCheck, FiTrash2 } from 'react-icons/fi'

export default function EditCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { characters, updateCharacter, deleteCharacter } = useCharacters()
  const formRef = useRef(null)
  const headerRef = useRef(null)

  const character = characters[id]

  const [tipo, setTipo] = useState(character?.tipo || 'personagem')
  const [tracos, setTracos] = useState(character?.tracos || [])
  const [partes, setPartes] = useState(character?.partes || [])
  const [imagePreview, setImagePreview] = useState(character?.imagem || '')
  const [showTracoSelector, setShowTracoSelector] = useState(false)

  useEffect(() => {
    if (!character) {
      navigate('/')
      return
    }

    const tl = gsap.timeline()

    // Animação do cabeçalho
    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    // Animação do formulário
    tl.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    // Animação dos campos
    tl.from(".form-field", {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4")
  }, [character, navigate])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        
        // Animação da preview da imagem
        gsap.from(".image-preview", {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const updatedCharacter = {
      ...character,
      nome: formData.get('nome'),
      tipo: formData.get('tipo'),
      descricao: formData.get('descricao'),
      imagem: imagePreview || formData.get('imagemUrl'),
      estilos: {
        poderoso: parseInt(formData.get('poderoso')) || 0,
        ligeiro: parseInt(formData.get('ligeiro')) || 0,
        preciso: parseInt(formData.get('preciso')) || 0,
        capcioso: parseInt(formData.get('capcioso')) || 0
      },
      habilidades: {
        agarrao: parseInt(formData.get('agarrao')) || 0,
        armazenamento: parseInt(formData.get('armazenamento')) || 0,
        assegurar: parseInt(formData.get('assegurar')) || 0,
        busca: parseInt(formData.get('busca')) || 0,
        chamado: parseInt(formData.get('chamado')) || 0,
        cura: parseInt(formData.get('cura')) || 0,
        exibicao: parseInt(formData.get('exibicao')) || 0,
        golpe: parseInt(formData.get('golpe')) || 0,
        manufatura: parseInt(formData.get('manufatura')) || 0,
        estudo: parseInt(formData.get('estudo')) || 0,
        tiro: parseInt(formData.get('tiro')) || 0,
        travessia: parseInt(formData.get('travessia')) || 0
      },
      tracos
    }

    if (tipo === 'personagem') {
      updatedCharacter.utensilio = {
        nome: formData.get('nomeUtensilio'),
        resistencia: parseInt(formData.get('resistenciaUtensilio')) || 0,
        descricao: formData.get('descricaoUtensilio')
      }
    } else {
      updatedCharacter.partes = partes
    }

    updateCharacter(id, updatedCharacter)
    navigate(`/view/${id}`)
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(id)
      navigate('/')
    }
  }

  const handleAddTraco = (novoTraco) => {
    const characterTracos = character.tracos || []
    if (!characterTracos.find(t => t.id === novoTraco.id)) {
      const updatedCharacter = {
        ...character,
        tracos: [...characterTracos, novoTraco]
      }
      updateCharacter(id, updatedCharacter)
    }
    setShowTracoSelector(false)
  }

  if (!character) return null

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div 
        ref={headerRef}
        className="mb-8 bg-wilder-800/80 p-6 rounded-lg shadow-mystic backdrop-blur-sm"
      >
        <h1 className="text-4xl font-title mb-3">
          Editar {tipo === 'personagem' ? 'Personagem' : 'Monstro'}
        </h1>
        <p className="text-wilder-300 text-lg max-w-2xl">
          Modifique os detalhes do seu {tipo === 'personagem' ? 'personagem' : 'monstro'} abaixo.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="card p-6">
          <h2 className="section-title mb-6">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-wilder-200 mb-2">Tipo</label>
              <select
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="input-field text-base"
              >
                <option value="personagem">Personagem</option>
                <option value="monstro">Monstro</option>
              </select>
            </div>

            <div className="form-field">
              <label className="block text-wilder-200 mb-2">Nome</label>
              <input
                type="text"
                name="nome"
                defaultValue={character.nome}
                className="input-field"
                placeholder="Nome do personagem"
              />
            </div>

            <div className="form-field md:col-span-2">
              <label className="block text-wilder-200 mb-2">Descrição</label>
              <textarea
                name="descricao"
                defaultValue={character.descricao}
                className="input-field"
                placeholder="Descreva seu personagem..."
                rows={3}
              />
            </div>

            <div className="form-field md:col-span-2">
              <label className="block text-wilder-200 mb-2">Imagem</label>
              <div className="flex items-start gap-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-wilder-700 bg-wilder-800">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt={character.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="w-8 h-8 text-wilder-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer text-white flex flex-col items-center">
                        <FiUpload className="w-6 h-6 mb-2" />
                        <span className="text-sm">Alterar</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="imagemUrl"
                    placeholder="Ou cole uma URL de imagem..."
                    className="input-field mb-2"
                    defaultValue={character.imagem}
                  />
                  <p className="text-sm text-wilder-400">
                    Formatos suportados: JPG, PNG, GIF. Tamanho máximo: 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estilos */}
        <div className="card p-6">
          <h2 className="section-title mb-6">Estilos</h2>
          <StatGrid
            stats={character.estilos}
            onStatClick={(key, value) => {
              setFormData(prev => ({
                ...prev,
                estilos: { ...prev.estilos, [key]: value }
              }))
            }}
            isEditing={true}
          />
        </div>

        {/* Habilidades */}
        <div className="card p-6">
          <h2 className="section-title mb-6">Habilidades</h2>
          <StatGrid
            stats={character.habilidades}
            onStatClick={(key, value) => {
              setFormData(prev => ({
                ...prev,
                habilidades: { ...prev.habilidades, [key]: value }
              }))
            }}
            isEditing={true}
          />
        </div>

        {/* Traços */}
        <div className="card p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-title text-mystic-gold">Traços</h3>
              <button
                type="button"
                onClick={() => setShowTracoSelector(true)}
                className="btn btn-primary"
              >
                <FiPlus /> Adicionar Novo Traço
              </button>
            </div>

            {character.tracos?.map((traco, index) => (
              <div key={index} className="card p-4">
                <h4 className="text-lg font-title text-mystic-gold mb-2">{traco.nome}</h4>
                <p className="text-wilder-200">{traco.descricao}</p>
              </div>
            ))}

            {showTracoSelector && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-wilder-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-title">Adicionar Novo Traço</h3>
                    <button
                      onClick={() => setShowTracoSelector(false)}
                      className="p-1 hover:bg-wilder-700 rounded-lg"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tracosDisponiveis
                      .filter(t => !character.tracos?.find(ct => ct.id === t.id))
                      .map(traco => (
                        <div
                          key={traco.id}
                          onClick={() => handleAddTraco(traco)}
                          className="card p-4 cursor-pointer hover:bg-wilder-700"
                        >
                          <h4 className="text-lg font-title text-mystic-gold mb-2">
                            {traco.nome}
                          </h4>
                          <p className="text-wilder-200 text-sm">{traco.descricao}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Utensílio ou Partes */}
        <div className="card p-6">
          <h2 className="section-title">
            {tipo === 'personagem' ? 'Utensílio' : 'Partes'}
          </h2>
          {tipo === 'personagem' ? (
            <div className="form-field space-y-4">
              <input
                type="text"
                name="nomeUtensilio"
                defaultValue={character.utensilio?.nome}
                className="input-field"
                placeholder="Nome do utensílio"
              />
              <input
                type="number"
                name="resistenciaUtensilio"
                defaultValue={character.utensilio?.resistencia}
                className="input-field"
                placeholder="Resistência"
                min="0"
              />
              <textarea
                name="descricaoUtensilio"
                defaultValue={character.utensilio?.descricao}
                className="input-field"
                placeholder="Descrição do utensílio"
                rows={3}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {partes.map((parte, index) => (
                <div key={index} className="form-field bg-wilder-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-title">Parte {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newPartes = [...partes]
                          newPartes.splice(index, 1)
                          setPartes(newPartes)
                        }}
                        className="btn btn-danger text-sm"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={parte.nome}
                      onChange={(e) => {
                        const newPartes = [...partes]
                        newPartes[index] = { ...parte, nome: e.target.value }
                        setPartes(newPartes)
                      }}
                      className="input-field"
                      placeholder="Nome da parte"
                    />
                    <input
                      type="number"
                      value={parte.resistencia}
                      onChange={(e) => {
                        const newPartes = [...partes]
                        newPartes[index] = { ...parte, resistencia: parseInt(e.target.value) }
                        setPartes(newPartes)
                      }}
                      className="input-field"
                      placeholder="Resistência"
                      min="0"
                    />
                    <textarea
                      value={parte.descricao}
                      onChange={(e) => {
                        const newPartes = [...partes]
                        newPartes[index] = { ...parte, descricao: e.target.value }
                        setPartes(newPartes)
                      }}
                      className="input-field"
                      placeholder="Descrição da parte"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPartes([...partes, { nome: '', resistencia: 0, descricao: '' }])}
                className="btn btn-primary w-full"
              >
                Adicionar Parte
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3 order-2 sm:order-1">
            <Link 
              to={`/view/${id}`}
              className="btn w-full sm:w-auto"
            >
              Cancelar
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger w-full sm:w-auto flex items-center gap-2"
            >
              <FiTrash2 /> Excluir
            </button>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-full sm:w-auto order-1 sm:order-2 flex items-center gap-2"
          >
            <FiCheck /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
} 