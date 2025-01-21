import CustomText from '../components/CustomText';
import ProductFeatures from '../components/ProductFeatures';


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Components
import ThemeToggle from '../components/ThemeToggle';
import Slider from '../components/Slider';
import CryptoList from '../components/CryptoList';
import Stories from '../components/Stories';
import BottomNav from '../components/BottomNav';
import ProductList from '../components/ProductList';



// Interfaces
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon_svg?: string;
}

interface CryptoBase {
  id: string;
  symbol: string;
  name: string;
  icon_svg?: string;
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

interface Product {
  id: number;
  name: string;
  price: string;
  images: Array<{
    src: string;
  }>;
  permalink: string;
}

export default function HomeScreen({ 
  isDarkMode, 
  setIsDarkMode 
}: { 
  isDarkMode: boolean; 
  setIsDarkMode: (value: boolean) => void;
}) {
  // States
  const [stories, setStories] = useState<StoryData[]>([]);
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([]);

  // Fetch Stories
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

  // Fetch Sliders
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

// Fetch Products
useEffect(() => {
  const fetchProducts = async () => {
    try {
      // ابتدا محصولات تستی را نمایش می‌دهیم
      const staticProducts = [
        {
          id: 1,
          name: "محصول تست ۱",
          price: "1000000",
          images: [{ src: "https://picsum.photos/200" }],
          permalink: "https://alicomputer.com"
        },
        {
          id: 2,
          name: "محصول تست ۲",
          price: "2000000",
          images: [{ src: "https://picsum.photos/200" }],
          permalink: "https://alicomputer.com"
        }
      ];
      
      setProducts(staticProducts);

      // تلاش برای دریافت محصولات واقعی
      const btoa = (str: string) => {
        try {
          return Buffer.from(str).toString('base64');
        } catch (e) {
          return window.btoa(str);
        }
      };

      const username = 'ck_20b3c33ef902d4ccd94fc1230c940a85be290e0a';
      const password = 'cs_e8a85df738324996fd3608154ab5bf0ccc6ded99';
      const auth = btoa(`${username}:${password}`);
      
      const response = await fetch(
        'https://alicomputer.com/wp-json/wc/v3/products?per_page=10',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);


// Fetch Crypto Data and Prices
useEffect(() => {
  const fetchCryptoData = async () => {
    try {
      // دریافت داده‌های پایه از وردپرس
      const wpResponse = await fetch('https://alicomputer.com/wp-json/wp/v2/crypto_currency');
      const wpData = await wpResponse.json();
      
      
      // تبدیل به فرمت مورد نظر
      const baseData = wpData.map((crypto: any) => ({
        id: crypto.meta?.coingecko_id || '',
        symbol: crypto.meta?.crypto_symbol || '',
        name: crypto.title?.rendered || '',
        icon_svg: crypto.meta?.icon_svg
      }));

      // دریافت قیمت‌ها از CoinGecko
      const ids = baseData.map((c: CryptoBase) => c.id).join(',');
            const cgResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const cgData = await cgResponse.json();
      
      // ترکیب داده‌ها
      const finalData = baseData.map((crypto: CryptoBase) => ({
        ...crypto,
        price: cgData[crypto.id]?.usd || 0,
        change: cgData[crypto.id]?.usd_24h_change || 0
      }));

      setCryptoPrices(finalData);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  fetchCryptoData();
  const interval = setInterval(fetchCryptoData, 60000);
  return () => clearInterval(interval);
}, []);
  // Handle Story Press
  const handleStoryPress = (id: string) => {
    const story = stories.find(s => s.id === id);
     };

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
        <Text style={[
          styles.menuIcon,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {/*☰*/}
        </Text>

        <CustomText style={[
          styles.headerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}variant="regular">
          خانه
        </CustomText>

        <ThemeToggle 
          isDarkMode={isDarkMode}
          onToggle={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      <ScrollView>
        <CryptoList isDarkMode={isDarkMode} data={cryptoPrices} />
        <Stories 
          isDarkMode={isDarkMode} 
          stories={stories} 
          onStoryPress={handleStoryPress}
        />
        <Slider isDarkMode={isDarkMode} data={sliders} />
        
        <ProductList isDarkMode={isDarkMode} products={products} />

        <ProductFeatures 
  isDarkMode={isDarkMode}
  onFeaturePress={(id) => {
    switch(id) {
      case 'free-signals':
        // اکشن مربوط به سیگنال‌های رایگان
        break;
      case 'vip-channel':
        // اکشن مربوط به کانال VIP
        break;
      // و غیره...
    }
  }}
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



const btoa = (input: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = input;
  let output = '';

  for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

    charCode = str.charCodeAt(i += 3/4);

    if (charCode > 0xFF) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }
    
    block = block << 8 | charCode;
  }
  
  return output;
};




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