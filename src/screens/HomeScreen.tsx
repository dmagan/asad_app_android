import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import CryptoList from './../components/CryptoList';
import Stories from './../components/Stories';
import BottomNav from './../components/BottomNav';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface StoryData {
  id: string;
  title: string;
  imageUrl: string;
}

export default function HomeScreen({ isDarkMode, setIsDarkMode }: { 
  isDarkMode: boolean; 
  setIsDarkMode: (value: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([
    { 
      id: 'bitcoin', 
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 42000,
      change: 2.5
    },
    { 
      id: 'ethereum', 
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2200,
      change: 1.8
    },
    { 
      id: 'binancecoin', 
      symbol: 'BNB',
      name: 'BNB',
      price: 320,
      change: -0.5
    },
    { 
      id: 'solana', 
      symbol: 'SOL',
      name: 'Solana',
      price: 98,
      change: 3.2
    },
    { 
      id: 'ripple', 
      symbol: 'XRP',
      name: 'Ripple',
      price: 0.62,
      change: 1.1
    },
    { 
      id: 'dogecoin', 
      symbol: 'DOGE',
      name: 'Dogecoin',
      price: 0.08,
      change: -1.2
    },
    { 
      id: 'cardano', 
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.51,
      change: 0.9
    }
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,cardano&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        const updatedPrices = cryptoPrices.map(crypto => ({
          ...crypto,
          price: data[crypto.id]?.usd || crypto.price,
          change: data[crypto.id]?.usd_24h_change || crypto.change
        }));

        setCryptoPrices(updatedPrices);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#111827' : '#F5F5F5' }
    ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[
        styles.header,
        { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }
      ]}>
        {/* Menu Icon */}
        <Text style={[
          styles.menuIcon,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          ☰
        </Text>

        {/* Title */}
        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          خانه
        </Text>

        {/* Theme Toggle */}
        <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
          <Text style={styles.themeIcon}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <CryptoList 
          isDarkMode={isDarkMode}
          data={cryptoPrices}
        />
        <Stories 
          isDarkMode={isDarkMode}
          stories={[]}
          onStoryPress={() => {}}
        />
      </ScrollView>

      <BottomNav
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuIcon: {
    fontSize: 24,
  },
  themeIcon: {
    fontSize: 24,
  }
});