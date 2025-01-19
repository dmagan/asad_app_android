import React, { useState, useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle'; 
import Slider from './../components/Slider';

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
  iconSvg?: string;
}

interface WordPressCrypto {
  id: number;
  title: { rendered: string };
  meta: {
    symbol: string;
    coingecko_id: string;
    icon_svg: string;
  };
}

interface StoryData {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  subtitle?: string;
}

interface SliderData {
  id: string;
  title: string;
  imageUrl: string;
}

export default function HomeScreen({ isDarkMode, setIsDarkMode }: { 
  isDarkMode: boolean; 
  setIsDarkMode: (value: boolean) => void;
}) {
  const [stories, setStories] = useState<StoryData[]>([]);
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([]);

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://alicomputer.com/wp-json/wp/v2/story_highlights?_embed');
        const data = await response.json();
        
        const formattedStories = data.map((story: any) => ({
          id: story.id.toString(),
          title: story.title.rendered,
          imageUrl: story._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
          link: story.meta?.story_link,
          subtitle: story.meta?.story_subtitle
        }));
        
        setStories(formattedStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
  
    fetchStories();
  }, []);

  // Fetch sliders
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch('https://alicomputer.com/wp-json/wp/v2/slider?_embed');
        const data = await response.json();
        
        const formattedSliders = data.map((slider: any) => ({
          id: slider.id.toString(),
          title: slider.title.rendered,
          imageUrl: slider._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
        }));
        
        setSliders(formattedSliders);
      } catch (error) {
        console.error('Error fetching sliders:', error);
      }
    };
  
    fetchSliders();
  }, []);

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch crypto currencies from WordPress
        const wpResponse = await fetch('https://alicomputer.com/wp-json/wp/v2/crypto_currency?per_page=20');
        const wpCryptos: WordPressCrypto[] = await wpResponse.json();
        
        // Get CoinGecko IDs from WordPress data
        const coinGeckoIds = wpCryptos
          .map(crypto => crypto.meta.coingecko_id)
          .filter(id => id)
          .join(',');
        
        // Fetch prices from CoinGecko
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd&include_24hr_change=true`
        );
        const priceData = await priceResponse.json();
        
        // Combine WordPress and CoinGecko data
        const combinedData = wpCryptos.map(wpCrypto => ({
          id: wpCrypto.meta.coingecko_id,
          symbol: wpCrypto.meta.symbol,
          name: wpCrypto.title.rendered,
          iconSvg: wpCrypto.meta.icon_svg,
          price: priceData[wpCrypto.meta.coingecko_id]?.usd || 0,
          change: priceData[wpCrypto.meta.coingecko_id]?.usd_24h_change || 0
        }));
        
        setCryptoPrices(combinedData);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#111827' : '#F5F5F5' }
    ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={[
        styles.header,
        { backgroundColor: isDarkMode ? '#212837' : '#FFFFFF' }
      ]}>
        <Text style={[
          styles.menuIcon,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {/*☰*/}
        </Text>

        <Text style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          خانه
        </Text>

        <ThemeToggle 
          isDarkMode={isDarkMode}
          onToggle={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      <ScrollView>
        <CryptoList 
          isDarkMode={isDarkMode} 
          data={cryptoPrices} 
        />
        <Stories 
          isDarkMode={isDarkMode} 
          stories={stories} 
          onStoryPress={(id) => {
            const story = stories.find(s => s.id === id);
            if (story?.link) {
              console.log('Opening link:', story.link);
            }
          }}
        />
        <Slider 
          isDarkMode={isDarkMode} 
          data={sliders} 
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