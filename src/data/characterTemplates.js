export const characterTemplates = {
  personagem: [
    {
      nome: "Guerreiro",
      estilos: {
        poderoso: 3,
        ligeiro: 1,
        preciso: 2,
        capcioso: 0
      },
      tracos: [
        { nome: "Veterano de Guerra", descricao: "Anos de batalha forjaram seu espírito." },
        { nome: "Disciplinado", descricao: "Mantém rotina rigorosa de treinamento." }
      ]
    },
    // ... outros templates
  ],
  monstro: [
    {
      nome: "Fera Ancestral",
      estilos: {
        poderoso: 4,
        ligeiro: 2,
        preciso: 1,
        capcioso: 1
      },
      partes: [
        { nome: "Garras Afiadas", resistencia: 3, descricao: "Capazes de rasgar metal." },
        { nome: "Couraça Natural", resistencia: 4, descricao: "Escamas resistentes." }
      ]
    }
    // ... outros templates
  ]
} 