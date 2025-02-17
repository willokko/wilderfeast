import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCharacters } from '../contexts/CharacterContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUpload,
  FiArrowLeft,
  FiImage,
  FiPlus,
  FiMinus,
  FiX,
  FiCheck,
  FiFilter,
  FiRefreshCw,
  FiSearch
} from 'react-icons/fi'
import NumberInput from './shared/NumberInput'
import CharacterPreview from './shared/CharacterPreview'
import StatGrid from './shared/StatGrid'
import { tracos } from '../data/tracos'

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
    descricao: '',
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
    tracos: [{ nome: '', descricao: '' }]
  })

  const [estilosPoints, setEstilosPoints] = useState(3)
  const [habilidadesPoints, setHabilidadesPoints] = useState(3)
  const [extraPoints, setExtraPoints] = useState(0)
  const [selectedTracos, setSelectedTracos] = useState([])
  const maxTracos = 2
  const [tracoSearch, setTracoSearch] = useState('')

  const emptyTrait = () => ({
    nome: '',
    descricao: '',
    ...(formData.tipo === 'monstro' ? { resistencia: 0 } : {})
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

  const handleNextStep = (e) => {
    e.preventDefault()
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePreviousStep = (e) => {
    e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currentStep === 4) {
      try {
        const newCharacter = {
          ...formData,
          tracos: selectedTracos,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }

        await addCharacter(newCharacter)
        navigate('/')
      } catch (error) {
        console.error('Erro ao criar personagem:', error)
      }
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEstiloChange = (key, newValue) => {
    const oldValue = formData.estilos[key]
    const pointDiff = newValue - oldValue

    if (
      (pointDiff > 0 && estilosPoints >= pointDiff && newValue <= 3 + Math.floor(extraPoints/2)) || 
      (pointDiff < 0 && newValue >= 1)
    ) {
      setFormData(prev => ({
        ...prev,
        estilos: {
          ...prev.estilos,
          [key]: newValue
        }
      }))
      setEstilosPoints(prev => prev - pointDiff)
    }
  }

  const handleHabilidadeChange = (key, newValue) => {
    const oldValue = formData.habilidades[key]
    const pointDiff = newValue - oldValue

    if (
      (pointDiff > 0 && habilidadesPoints > 0 && newValue === 1) || 
      (pointDiff < 0 && newValue === 0)
    ) {
      setFormData(prev => ({
        ...prev,
        habilidades: {
          ...prev.habilidades,
          [key]: newValue
        }
      }))
      setHabilidadesPoints(prev => prev - pointDiff)
    }
  }

  const handleRandomEstilos = () => {
    const estilos = {
      poderoso: 1,
      ligeiro: 1,
      preciso: 1,
      capcioso: 1
    }

    let remainingPoints = 3 + extraPoints
    const keys = Object.keys(estilos)

    while (remainingPoints > 0) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      if (estilos[randomKey] < 3 + Math.floor(extraPoints/2)) {
        estilos[randomKey]++
        remainingPoints--
      }
    }

    setFormData(prev => ({
      ...prev,
      estilos
    }))
  }

  const handleRandomHabilidades = () => {
    const habilidades = {
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
    }

    const totalPoints = 3 + extraPoints
    const keys = Object.keys(habilidades)
    let pointsToDistribute = totalPoints

    while (pointsToDistribute > 0) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      if (habilidades[randomKey] < 1 + Math.floor(extraPoints/2)) {
        habilidades[randomKey]++
        pointsToDistribute--
      }
    }

    setFormData(prev => ({
      ...prev,
      habilidades
    }))
  }

  const handleAddExtraPoints = () => {
    setExtraPoints(prev => prev + 1)
    setEstilosPoints(prev => prev + 1)
    setHabilidadesPoints(prev => prev + 1)
  }

  const handleTracoAdd = () => {
    setFormData(prev => ({
      ...prev,
      tracos: [...prev.tracos, emptyTrait()]
    }))
  }

  const handleTracoChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tracos: prev.tracos.map((traco, i) => 
        i === index ? { ...traco, [field]: value } : traco
      )
    }))
  }

  const handleTracoRemove = (index) => {
    if (index === 0) return
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

  const handleTracoSelect = (traco) => {
    if (selectedTracos.find(t => t.id === traco.id)) {
      setSelectedTracos(prev => prev.filter(t => t.id !== traco.id))
    } else if (selectedTracos.length < maxTracos) {
      setSelectedTracos(prev => [...prev, traco])
    }
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="form-section">
            <h2 className="section-title mb-6">Informações Básicas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-field">
                <label className="block text-wilder-200 mb-2">Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                  className="input-field w-full"
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
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  className="input-field w-full"
                  placeholder="Nome do personagem"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="section-title mb-6">Imagem</h2>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">Estilos</h2>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleAddExtraPoints}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FiPlus className="w-5 h-5" /> Adicionar Ponto
                </button>
                <span className="text-wilder-300">
                  Pontos extras: <span className="text-mystic-gold">{extraPoints}</span>
                </span>
                <button
                  type="button"
                  onClick={handleRandomEstilos}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <FiRefreshCw className="w-5 h-5" /> Rolar Estilos
                </button>
              </div>
            </div>
            <div className="card p-6 mb-4">
              <p className="text-wilder-200 mb-4">
                Distribua {3 + extraPoints} pontos entre os estilos. Cada estilo começa com 1 e pode ter no máximo {3 + Math.floor(extraPoints/2)} pontos.
              </p>
            </div>
            <StatGrid
              title=""
              stats={formData.estilos}
              onStatClick={handleEstiloChange}
              isEditing={true}
              className="bg-transparent p-0"
              maxValue={3 + Math.floor(extraPoints/2)}
            />
          </div>
        )
      
      case 3:
        return (
          <div className="form-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">Habilidades</h2>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleAddExtraPoints}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FiPlus className="w-5 h-5" /> Adicionar Ponto
                </button>
                <span className="text-wilder-300">
                  Pontos extras: <span className="text-mystic-gold">{extraPoints}</span>
                </span>
                <button
                  type="button"
                  onClick={handleRandomHabilidades}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <FiRefreshCw className="w-5 h-5" /> Rolar Habilidades
                </button>
              </div>
            </div>
            <div className="card p-6 mb-4">
              <p className="text-wilder-200 mb-4">
                Escolha {3 + extraPoints} habilidades para aumentar. Cada habilidade pode ter no máximo {1 + Math.floor(extraPoints/2)} níveis.
              </p>
            </div>
            <StatGrid
              title=""
              stats={formData.habilidades}
              onStatClick={handleHabilidadeChange}
              isEditing={true}
              className="bg-transparent p-0"
              maxValue={1 + Math.floor(extraPoints/2)}
            />
          </div>
        )
      
      case 4:
        return (
          <div className="form-section space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="section-title">Traços</h2>
              <div className="flex items-center gap-4">
                <span className="text-wilder-300 bg-wilder-800 px-4 py-2 rounded-lg">
                  Selecionados: <span className="text-mystic-gold">{selectedTracos.length}</span>/<span className="text-mystic-gold">{maxTracos}</span>
                </span>
                {selectedTracos.length > 0 && (
                  <button
                    onClick={() => setSelectedTracos([])}
                    className="btn btn-danger flex items-center gap-2"
                  >
                    <FiX className="w-4 h-4" /> Limpar Seleção
                  </button>
                )}
              </div>
            </div>

            <div className="card p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-wilder-700/50">
                  <FiFilter className="w-6 h-6 text-mystic-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-wilder-100 mb-1">
                    Escolha seus Traços
                  </h3>
                  <p className="text-wilder-300">
                    Selecione {maxTracos} traços para seu personagem. Cada traço concede uma habilidade única que define seu estilo de jogo.
                  </p>
                </div>
              </div>
            </div>

            {/* Traços Selecionados */}
            <AnimatePresence>
              {selectedTracos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-wilder-800/50 rounded-lg p-4"
                >
                  <h3 className="text-lg font-title text-mystic-gold mb-4 flex items-center gap-2">
                    <FiCheck className="w-5 h-5" /> Traços Selecionados
                  </h3>
                  <div className="space-y-3">
                    {selectedTracos.map((traco) => (
                      <motion.div
                        key={traco.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-start gap-3 bg-wilder-700/50 p-4 rounded-lg group hover:bg-wilder-700 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-wilder-100 font-medium flex items-center gap-2">
                            {traco.nome}
                            <span className="text-xs px-2 py-1 rounded-full bg-mystic-gold/20 text-mystic-gold">
                              Selecionado
                            </span>
                          </h4>
                          <p className="text-wilder-300 text-sm mt-2">{traco.descricao}</p>
                        </div>
                        <button
                          onClick={() => handleTracoSelect(traco)}
                          className="text-wilder-400 hover:text-mystic-red p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de Traços Disponíveis */}
            <div className="space-y-4">
              <div className="sticky top-0 z-10 bg-wilder-900/95 backdrop-blur-sm py-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar traços por nome ou descrição..."
                    className="input-field w-full pl-10"
                    onChange={(e) => setTracoSearch(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-wilder-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tracos
                  .filter(traco => 
                    traco.nome.toLowerCase().includes(tracoSearch?.toLowerCase() || '') ||
                    traco.descricao.toLowerCase().includes(tracoSearch?.toLowerCase() || '')
                  )
                  .map((traco) => {
                    const isSelected = selectedTracos.find(t => t.id === traco.id)
                    const isDisabled = selectedTracos.length >= maxTracos && !isSelected

                    return (
                      <motion.div
                        key={traco.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => !isDisabled && handleTracoSelect(traco)}
                        className={`
                          relative group cursor-pointer transition-all duration-200
                          ${isSelected 
                            ? 'ring-2 ring-mystic-gold ring-opacity-50' 
                            : isDisabled
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:transform hover:-translate-y-1 hover:shadow-lg'
                          }
                        `}
                      >
                        <div className={`
                          card p-4 transition-colors duration-200
                          ${isSelected 
                            ? 'bg-wilder-700/50' 
                            : 'hover:bg-wilder-800'
                          }
                        `}>
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-title text-mystic-gold">
                              {traco.nome}
                            </h3>
                            {isSelected ? (
                              <span className="text-mystic-gold bg-mystic-gold/20 p-1 rounded-full">
                                <FiCheck className="w-5 h-5" />
                              </span>
                            ) : !isDisabled && (
                              <span className="text-wilder-400 group-hover:text-mystic-gold transition-colors">
                                <FiPlus className="w-5 h-5" />
                              </span>
                            )}
                          </div>
                          <p className="text-wilder-200 text-sm mt-2">
                            {traco.descricao}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="sticky top-24 z-20 bg-wilder-900/95 backdrop-blur-sm py-4 mb-8">
              <Link 
                to="/" 
                className="text-wilder-300 hover:text-wilder-100 mb-4 inline-flex items-center gap-2"
              >
                <FiArrowLeft /> Voltar
              </Link>
              <h1 className="text-3xl sm:text-4xl font-title mb-6">
                Criar Novo {formData.tipo === 'personagem' ? 'Personagem' : 'Monstro'}
              </h1>
              
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(step => (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    className={`step-indicator ${currentStep === step ? 'active' : ''}`}
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
                className="space-y-6"
              >
                {renderStep()}
              </motion.div>

              <div className="flex justify-end gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="btn btn-secondary"
                  >
                    Anterior
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Criar {formData.tipo === 'personagem' ? 'Personagem' : 'Monstro'}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CharacterPreview data={formData} imagePreview={imagePreview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 