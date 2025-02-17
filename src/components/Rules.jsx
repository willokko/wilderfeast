import { useEffect } from 'react'

export default function Rules() {
  useEffect(() => {
    document.title = "Regras de Criação de Personagem - WilderFeast"
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-title mb-6 text-wilder-100">Regras de Criação de Personagem</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">1. Escolha de Raça</h2>
        <p className="text-wilder-200">
          No WilderFeast, você pode escolher entre várias raças, cada uma com suas próprias habilidades e características únicas. As raças disponíveis são:
        </p>
        <ul className="list-disc list-inside text-wilder-300 mt-2">
          <li>Humano</li>
          <li>Elfo</li>
          <li>Anão</li>
          <li>Orc</li>
          <li>Halfling</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">2. Escolha de Classe</h2>
        <p className="text-wilder-200">
          As classes determinam o papel do seu personagem no jogo. As classes disponíveis incluem:
        </p>
        <ul className="list-disc list-inside text-wilder-300 mt-2">
          <li>Guerreiro</li>
          <li>Mago</li>
          <li>Ladrão</li>
          <li>Clérigo</li>
          <li>Ranger</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">3. Distribuição de Atributos</h2>
        <p className="text-wilder-200">
          Distribua 20 pontos entre os seguintes atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma. Nenhum atributo pode ter menos de 1 ou mais de 10 pontos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">4. Escolha de Habilidades</h2>
        <p className="text-wilder-200">
          Cada classe oferece um conjunto de habilidades únicas. Escolha até 3 habilidades para começar.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">5. Equipamento Inicial</h2>
        <p className="text-wilder-200">
          Baseado na sua classe, você receberá um conjunto de equipamentos iniciais. Consulte a tabela de equipamentos para mais detalhes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-title mb-4 text-mystic-gold">6. História do Personagem</h2>
        <p className="text-wilder-200">
          Crie uma breve história para seu personagem, incluindo suas motivações e objetivos.
        </p>
      </section>
    </div>
  )
} 