import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { gsap } from 'gsap'

export default function CreateCharacter() {
  const navigate = useNavigate()
  const { addCharacter } = useCharacters()
  const formRef = useRef(null)
  const headerRef = useRef(null)

  const [tipo, setTipo] = useState('personagem')
  const [tracos, setTracos] = useState([{ nome: '', descricao: '' }])
  const [partes, setPartes] = useState([{ nome: '', resistencia: 0, descricao: '' }])
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
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
  }, [])

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
    
    const character = {
      tipo: formData.get('tipo'),
      nome: formData.get('nome'),
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
      character.utensilio = {
        nome: formData.get('nomeUtensilio'),
        resistencia: parseInt(formData.get('resistenciaUtensilio')) || 0,
        descricao: formData.get('descricaoUtensilio')
      }
    } else {
      character.partes = partes
    }

    addCharacter(character)
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div 
        ref={headerRef}
        className="mb-8 bg-wilder-800 p-6 rounded-lg shadow-mystic text-center"
      >
        <h1 className="text-4xl font-title mb-4">Criar Novo {tipo === 'personagem' ? 'Personagem' : 'Monstro'}</h1>
        <p className="text-wilder-300 text-lg max-w-2xl mx-auto">
          Dê vida à sua criação. Preencha os detalhes abaixo para criar um novo 
          {tipo === 'personagem' ? ' personagem' : ' monstro'} para sua aventura.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* Tipo e Informações Básicas */}
        <div className="card p-6">
          <h2 className="section-title">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-wilder-200 mb-2">Tipo</label>
              <select
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="input-field"
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
                required
                className="input-field"
                placeholder="Nome do personagem"
              />
            </div>
          </div>

          {/* Upload de Imagem */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-wilder-200 mb-2">Imagem</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field"
              />
              <input
                type="text"
                name="imagemUrl"
                placeholder="Ou cole a URL da imagem"
                className="input-field mt-2"
              />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-lg object-cover mx-auto border-2 border-wilder-700"
                />
              </div>
            )}
          </div>
        </div>

        {/* Estilos */}
        <div className="card p-6">
          <h2 className="section-title">Estilos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['poderoso', 'ligeiro', 'preciso', 'capcioso'].map(estilo => (
              <div key={estilo} className="form-field">
                <label className="block text-wilder-200 mb-2 capitalize">
                  {estilo}
                </label>
                <input
                  type="number"
                  name={estilo}
                  min="0"
                  max="5"
                  defaultValue="0"
                  className="input-field"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Habilidades */}
        <div className="card p-6">
          <h2 className="section-title">Habilidades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'agarrao', 'armazenamento', 'assegurar', 'busca',
              'chamado', 'cura', 'exibicao', 'golpe',
              'manufatura', 'estudo', 'tiro', 'travessia'
            ].map(habilidade => (
              <div key={habilidade} className="form-field">
                <label className="block text-wilder-200 mb-2 capitalize">
                  {habilidade}
                </label>
                <input
                  type="number"
                  name={habilidade}
                  min="0"
                  max="5"
                  defaultValue="0"
                  className="input-field"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Traços */}
        <div className="card p-6">
          <h2 className="section-title">Traços</h2>
          <div className="space-y-4">
            {tracos.map((traco, index) => (
              <div key={index} className="form-field bg-wilder-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-title">Traço {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newTracos = [...tracos]
                        newTracos.splice(index, 1)
                        setTracos(newTracos)
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
                    value={traco.nome}
                    onChange={(e) => {
                      const newTracos = [...tracos]
                      newTracos[index] = { ...traco, nome: e.target.value }
                      setTracos(newTracos)
                    }}
                    className="input-field"
                    placeholder="Nome do traço"
                  />
                  <textarea
                    value={traco.descricao}
                    onChange={(e) => {
                      const newTracos = [...tracos]
                      newTracos[index] = { ...traco, descricao: e.target.value }
                      setTracos(newTracos)
                    }}
                    className="input-field"
                    placeholder="Descrição do traço"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTracos([...tracos, { nome: '', descricao: '' }])}
              className="btn btn-primary w-full"
            >
              Adicionar Traço
            </button>
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
                className="input-field"
                placeholder="Nome do utensílio"
              />
              <input
                type="number"
                name="resistenciaUtensilio"
                className="input-field"
                placeholder="Resistência"
                min="0"
              />
              <textarea
                name="descricaoUtensilio"
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

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Criar {tipo === 'personagem' ? 'Personagem' : 'Monstro'}
          </button>
        </div>
      </form>
    </div>
  )
} 