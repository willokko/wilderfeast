import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image,
  Font 
} from '@react-pdf/renderer'

// Vamos usar fontes mais simples que são garantidas de funcionar
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/open-sans@4.5.0/files/open-sans-all-400-normal.woff',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/open-sans@4.5.0/files/open-sans-all-700-normal.woff',
      fontWeight: 700,
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontFamily: 'Open Sans'
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderColor: '#4a4a4a',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
    width: '100%'
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#ffd700',
    marginBottom: 10,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%'
  },
  label: {
    width: '30%',
    color: '#cccccc',
    paddingRight: 10
  },
  value: {
    flex: 1,
    color: '#ffffff'
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%'
  },
  gridItem: {
    width: '45%',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  gridLabel: {
    width: '40%',
    color: '#cccccc',
    fontSize: 12
  },
  gridValue: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'right'
  },
  imageContainer: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 75
  },
  trait: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    width: '100%'
  },
  traitTitle: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: 700,
    color: '#ffd700',
    marginBottom: 5
  },
  traitDescription: {
    fontSize: 12,
    color: '#ffffff',
    lineHeight: 1.4
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10
  }
})

export default function CharacterSheet({ character, playerInfo }) {
  console.log('Gerando PDF para:', character.nome)
  console.log('Informações do jogador:', playerInfo)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>WilderFeast</Text>
          <Text style={styles.subtitle}>Ficha de {character.tipo === 'monstro' ? 'Monstro' : 'Personagem'}</Text>
        </View>

        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          {/* Imagem do Personagem */}
          {character.imagem && (
            <View style={styles.imageContainer}>
              <Image src={character.imagem} style={styles.image} />
            </View>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{character.nome}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{character.tipo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Jogador:</Text>
            <Text style={styles.value}>{playerInfo.playerName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Campanha:</Text>
            <Text style={styles.value}>{playerInfo.campaign}</Text>
          </View>
        </View>

        {/* Descrição */}
        {character.descricao && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text>{character.descricao}</Text>
          </View>
        )}

        {/* Estilos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estilos</Text>
          <View style={styles.grid}>
            {Object.entries(character.estilos).map(([key, value]) => (
              <View key={key} style={styles.gridItem}>
                <View style={styles.gridRow}>
                  <Text style={styles.gridLabel}>{key}</Text>
                  <Text style={styles.gridValue}>{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.grid}>
            {Object.entries(character.habilidades).map(([key, value]) => (
              <View key={key} style={styles.gridItem}>
                <View style={styles.gridRow}>
                  <Text style={styles.gridLabel}>{key}</Text>
                  <Text style={styles.gridValue}>{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Traços */}
        {character.tracos?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traços</Text>
            {character.tracos.map((traco, index) => (
              <View key={index} style={styles.trait}>
                <Text style={styles.traitTitle}>{traco.nome}</Text>
                <Text style={styles.traitDescription}>{traco.descricao}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text>WilderFeast RPG • {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  )
} 