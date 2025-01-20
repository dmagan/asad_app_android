import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon_svg?: string;
}

interface Props {
  isDarkMode: boolean;
  data: CryptoData[];
}

export default function CryptoList({ isDarkMode, data }: Props) {
  const renderIcon = (crypto: CryptoData) => {
    if (crypto.icon_svg && typeof crypto.icon_svg === 'string') {
      try {
        return (
          <SvgXml 
            xml={crypto.icon_svg} 
            width={24} 
            height={24} 
          />
        );
      } catch (error) {
        console.error('Error rendering SVG:', error);
        return renderFallbackIcon(crypto.symbol);
      }
    }
    
    return renderFallbackIcon(crypto.symbol);
  };

  const renderFallbackIcon = (symbol: string) => {
    return (
      <Text style={styles.icon}>
        {getCryptoIcon(symbol)}
      </Text>
    );
  };

  const getCryptoIcon = (symbol: string) => {
    const symbolUpper = symbol?.toUpperCase() || '';
    switch (symbolUpper) {
      case 'BTC': return '🟡';
      case 'ETH': return '🔷';
      case 'BNB': return '🟡';
      case 'SOL': return '🟣';
      case 'XRP': return '⚫';
      case 'DOGE': return '🟡';
      case 'ADA': return '🔵';
      default: return '⭐';
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {data.map((crypto) => (
        <TouchableOpacity
          key={crypto.id}
          style={[
            styles.card,
            { 
              backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
              borderColor: isDarkMode ? '#505a71' : '#E5E7EB',
            }
          ]}
        >
          <View style={styles.header}>
  <View style={styles.iconContainer}>
    {renderIcon(crypto)}
  </View>
  <View style={styles.headerText}>
    <Text style={[
      styles.symbol,
      { color: isDarkMode ? '#FFFFFF' : '#000000' }
    ]}>
      {crypto.symbol}
    </Text>
    <Text style={[
      styles.name,
      { color: isDarkMode ? '#FFFFFF' : '#000000' }
    ]} numberOfLines={1}>
      {" "}{crypto.name}
    </Text>
  </View>
</View>
          

  <View style={styles.priceRow}>
    {/* بقیه کد */}
  </View>

          <View style={styles.priceRow}>
            
            <Text style={[
              styles.price,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              {crypto.price.toLocaleString()}
            </Text>

            <Text style={[
              styles.change,
              { color: crypto.change >= 0 ? '#34D399' : '#FF4B4B' }
            ]}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
            </Text>
          </View>

          <Text style={[
            styles.usdPrice,
            { color: '#808080' }
          ]}>
            $ {crypto.price.toLocaleString()} USD
          </Text>
          
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    fontWeight: '400',
  },
  icon: {
    fontSize: 11,
  },
  iconContainer: {
    marginRight: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    paddingHorizontal: 17,
    marginVertical: 7,
  },
  scrollContent: {
    paddingRight: 17,
  },
  card: {
    padding: 7,
    marginRight: 7,
    borderRadius: 7,
    width: 150,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
 headerText: {
    flex: 1,
    flexDirection: 'row', // افقی
    alignItems: 'center',
    marginLeft: 4,
  },
  symbol: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 10,
    fontWeight: '500',
  },
  usdPrice: {
    fontSize: 10,
    marginTop: 4,
  }
  
});