// Palette de couleurs pour la landing page
export const colors = {
  // Couleurs principales
  primary: {
    orange: '#FF6B35',
    orangeLight: '#FF8A65',
    orangeDark: '#E65100',
    orangeGradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
  },
  
  secondary: {
    blue: '#2196F3',
    blueLight: '#64B5F6',
    blueDark: '#1565C0',
    blueGradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
  },
  
  accent: {
    green: '#4CAF50',
    greenLight: '#81C784',
    greenDark: '#2E7D32',
    greenGradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
  },
  
  // Couleurs neutres
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: '#757575',
    lightGray: '#F5F5F5',
    darkGray: '#424242',
  },
  
  // Couleurs de fond
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    accent: '#FFF3E0',
  },
  
  // Couleurs de texte
  text: {
    primary: '#212121',
    secondary: '#757575',
    inverse: '#FFFFFF',
    accent: '#FF6B35',
  },
  
  // Couleurs pour les cartes de produits
  productCards: {
    card1: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A65 100%)',
      text: '#FFFFFF',
    },
    card2: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      text: '#FFFFFF',
    },
    card3: {
      background: 'linear-gradient(135deg, #9C27B0 0%, #CE93D8 100%)',
      text: '#FFFFFF',
    },
    card4: {
      background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      text: '#FFFFFF',
    },
    card5: {
      background: 'linear-gradient(135deg, #FF5722 0%, #FF8A65 100%)',
      text: '#FFFFFF',
    },
    card6: {
      background: 'linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)',
      text: '#FFFFFF',
    },
  },
  
  // Couleurs pour les badges
  badges: {
    new: '#FF5722',
    bestseller: '#4CAF50',
    featured: '#2196F3',
  },
  
  // Couleurs pour les boutons
  buttons: {
    primary: {
      background: '#FF6B35',
      hover: '#E65100',
      text: '#FFFFFF',
    },
    secondary: {
      background: 'transparent',
      border: '#FF6B35',
      text: '#FF6B35',
      hover: {
        background: '#FF6B35',
        text: '#FFFFFF',
      },
    },
    dark: {
      background: '#000000',
      hover: '#424242',
      text: '#FFFFFF',
    },
  },
}

// Helper functions pour les couleurs
export const getProductCardColor = (index: number) => {
  const cards = Object.values(colors.productCards)
  return cards[index % cards.length]
}

export const getBadgeColor = (type: 'new' | 'bestseller' | 'featured') => {
  return colors.badges[type]
}

export default colors