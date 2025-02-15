import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { motion } from 'framer-motion'
import { 
  FiUpload,
  FiArrowLeft,
  FiImage,
  FiPlus,
  FiMinus,
  FiX,
  FiCheck 
} from 'react-icons/fi'

const CharacterPreview = ({ data, imagePreview }) => (
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
    </div>
  </div>
)

const NumberInput = ({ label, name, value, onChange, min = 0, max = 5 }) => (
  <div className="space-y-2">
    <label className="block text-wilder-200">{label}</label>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="btn p-2"
        disabled={value <= min}
      >
        <FiMinus className="w-4 h-4" />
      </button>
      <input
        type="number"
        name={name}
        value={value}
        onChange={e => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || 0)))}
        className="input-field text-center"
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="btn p-2"
        disabled={value >= max}
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  </div>
)

export default function CreateCharacter() {
  const navigate = useNavigate()
  const { addCharacter } = useCharacters()
  const formRef = useRef(null)
  const fileInputRef = useRef(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [imagePreview, setImagePreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'personagem',
    nome: '',
    imagem: '',
    estilos: {
      poderoso: 0,
      ligeiro: 0,
      preciso: 0,
      capcioso: 0
    },
    habilidades: {
      agarrao: 0,
      armazenamento: 0,
      assegurar: 0,
      busca: 0,
      chamado: 0,
      cura: 0,
      exibicao: 0,
      golpe: 0,
      manufatura: 0,
      estudo: 0,
      tiro: 0,
      travessia: 0
    },
    tracos: []
  })

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload({ target: { files: e.dataTransfer.files }})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newCharacter = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }

      await addCharacter(newCharacter)

      navigate('/')
    } catch (error) {
      console.error('Erro ao criar personagem:', error)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEstiloChange = (estilo, valor) => {
    setFormData(prev => ({
      ...prev,
      estilos: {
        ...prev.estilos,
        [estilo]: valor
      }
    }))
  }

  const handleHabilidadeChange = (habilidade, valor) => {
    setFormData(prev => ({
      ...prev,
      habilidades: {
        ...prev.habilidades,
        [habilidade]: valor
      }
    }))
  }

  const handleTracoAdd = (traco) => {
    setFormData(prev => ({
      ...prev,
      tracos: [...prev.tracos, traco]
    }))
  }

  const handleTracoRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      tracos: prev.tracos.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        updateFormData('imagem', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="form-section">
            <h2 className="section-title">Informações Básicas</h2>
            <div className="form-grid">
              <div>
                <label className="block text-wilder-200 mb-2">Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                  className="input-field"
                >
                  <option value="personagem">Personagem</option>
                  <option value="monstro">Monstro</option>
                </select>
              </div>

              <div>
                <label className="block text-wilder-200 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  className="input-field"
                  placeholder="Nome do personagem"
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="section-title">Imagem</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-wilder-200 mb-2">URL da Imagem</label>
                  <input
                    type="text"
                    value={formData.imagem}
                    onChange={e => {
                      setImagePreview(e.target.value)
                      updateFormData('imagem', e.target.value)
                    }}
                    placeholder="Cole a URL da imagem aqui"
                    className="input-field"
                  />
                </div>

                <div className="text-center text-wilder-300">ou</div>

                <div 
                  className={`upload-area ${dragActive ? 'active' : 'inactive'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <FiUpload className="w-12 h-12 text-wilder-400" />
                    <div>
                      <p className="text-lg mb-2">
                        Arraste uma imagem ou clique para selecionar
                      </p>
                      <p className="text-wilder-400">
                        PNG, JPG ou GIF (max. 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg border-2 border-wilder-700"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          updateFormData('imagem', '')
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-mystic-red rounded-full
                                 text-white hover:bg-mystic-red/80 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="form-section">
            <h2 className="section-title">Estilos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(formData.estilos).map(([estilo, valor]) => (
                <NumberInput
                  key={estilo}
                  label={estilo}
                  name={estilo}
                  value={valor}
                  onChange={(newValue) => {
                    handleEstiloChange(estilo, newValue)
                  }}
                />
              ))}
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="form-section">
            <h2 className="section-title">Habilidades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(formData.habilidades).map(([habilidade, valor]) => (
                <div key={habilidade}>
                  <label className="block text-wilder-200 mb-2 capitalize">
                    {habilidade}
                  </label>
                  <input
                    type="number"
                    name={habilidade}
                    value={valor}
                    onChange={(e) => {
                      handleHabilidadeChange(habilidade, parseInt(e.target.value) || 0)
                    }}
                    className="input-field"
                    min="0"
                    max="5"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="form-section">
            <h2 className="section-title">
              {formData.tipo === 'personagem' ? 'Traços' : 'Partes'}
            </h2>
            <div className="space-y-4">
              {formData.tracos.map((item, index) => (
                <div key={index} className="bg-wilder-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-title">
                      {formData.tipo === 'personagem' ? `Traço ${index + 1}` : `Parte ${index + 1}`}
                    </h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleTracoRemove(index)}
                        className="btn btn-danger text-sm"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={item.nome}
                      onChange={(e) => {
                        const newTracos = [...formData.tracos]
                        newTracos[index] = { ...item, nome: e.target.value }
                        handleTracoAdd(newTracos[index])
                      }}
                      className="input-field"
                      placeholder={`Nome do ${formData.tipo === 'personagem' ? 'traço' : 'parte'}`}
                    />
                    {formData.tipo === 'monstro' && (
                      <input
                        type="number"
                        value={item.resistencia}
                        onChange={(e) => {
                          const newTracos = [...formData.tracos]
                          newTracos[index] = { ...item, resistencia: parseInt(e.target.value) || 0 }
                          handleTracoAdd(newTracos[index])
                        }}
                        className="input-field"
                        placeholder="Resistência"
                        min="0"
                      />
                    )}
                    <textarea
                      value={item.descricao}
                      onChange={(e) => {
                        const newTracos = [...formData.tracos]
                        newTracos[index] = { ...item, descricao: e.target.value }
                        handleTracoAdd(newTracos[index])
                      }}
                      className="input-field"
                      placeholder={`Descrição do ${formData.tipo === 'personagem' ? 'traço' : 'parte'}`}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newItem = { nome: '', descricao: '' }
                  if (formData.tipo === 'monstro') newItem.resistencia = 0
                  handleTracoAdd(newItem)
                }}
                className="btn btn-primary w-full"
              >
                Adicionar {formData.tipo === 'personagem' ? 'Traço' : 'Parte'}
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-title mb-3 sm:mb-4">
              Criar Novo {formData.tipo === 'personagem' ? 'Personagem' : 'Monstro'}
            </h1>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(step => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`step-indicator ${currentStep === step ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 sm:space-y-8"
            >
              {renderStep()}
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn w-full sm:w-auto"
              >
                Cancelar
              </button>
              
              <div className="flex gap-4 w-full sm:w-auto">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="btn w-full sm:w-auto"
                  >
                    Voltar
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Próximo
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Criar {formData.tipo === 'personagem' ? 'Personagem' : 'Monstro'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:block">
          <CharacterPreview data={formData} imagePreview={imagePreview} />
        </div>
      </div>
    </div>
  )
} 