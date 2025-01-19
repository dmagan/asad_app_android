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
}

interface StoryData {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;      // اضافه کردیم
  subtitle?: string;  // اضافه کردیم
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
    const fetchStories = async () => {
      try {
        const response = await fetch('https://alicomputer.com/wp-json/wp/v2/story_highlights?_embed');  // _embed رو اضافه کردیم
        const data = await response.json();
        
        const formattedStories = data.map((story: any) => ({
          id: story.id.toString(),
          title: story.title.rendered,
          imageUrl: story._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',  // تصویر شاخص
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
  { backgroundColor: isDarkMode ? '#212837' : '#FFFFFF' }
]}>

  {/* قسمت منو */}
  <Text style={[
    styles.menuIcon,
    { color: isDarkMode ? '#FFFFFF' : '#000000' }
  ]}>
    {/*☰*/}
  </Text>


  {/* عنوان */}
  <Text style={[
    styles.headerTitle,
    { color: isDarkMode ? '#FFFFFF' : '#000000' }
  ]}>
    خانه
  </Text>

  {/* ه جای کد قبلی تم، این رو بذارید */}
  <ThemeToggle 
    isDarkMode={isDarkMode}
    onToggle={() => setIsDarkMode(!isDarkMode)}
  />
</View>

      <ScrollView>
        <CryptoList   isDarkMode={isDarkMode}  data={cryptoPrices} />
        <Stories  isDarkMode={isDarkMode}  stories={stories}  onStoryPress={(id) => { const story = stories.find(s => s.id === id); if (story?.link) { console.log('Opening link:', story.link);   }  }}/>
        <Slider  isDarkMode={isDarkMode}  data={sliders} />


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