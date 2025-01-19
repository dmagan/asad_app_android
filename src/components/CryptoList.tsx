import React from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 Image,
} from 'react-native';

interface CryptoData {
 id: string;
 symbol: string;
 name: string;
 price: number;
 change: number;
 iconUrl?: string;
}

interface Props {
 isDarkMode: boolean;
 data: CryptoData[];
}

export default function CryptoList({ isDarkMode, data }: Props) {
 const getCryptoIcon = (symbol: string) => {
   switch (symbol) {
     case 'BTC':
       return '🟡'; 
     case 'ETH':
       return '🔷'; 
     case 'BNB':
       return '🟡'; 
     case 'SOL':
       return '🟣';
     case 'XRP':
       return '⚫';
     case 'DOGE':
       return '🟡';
     case 'ADA':
       return '🔵';
     default:
       return '⭐';
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
             <Text style={styles.icon}>{getCryptoIcon(crypto.symbol)}</Text>
           </View>
           <Text style={[
             styles.symbol,
             { color: isDarkMode ? '#FFFFFF' : '#000000' }
           ]}>
             {crypto.symbol}
           </Text>
         </View>

         <View style={styles.priceRow}>
         <Text style={[
    styles.price,
    { color: isDarkMode ? '#FFFFFF' : '#000000' }
  ]}>
    {crypto.price.toLocaleString()}
  </Text>

  {/* اینجا رو تغییر دادیم */}
  <Text style={[
    styles.change,
    { color: crypto.change >= 0 ? '#22C55E' : '#FF4B4B' }  // رنگ سبز برای مثبت و قرمز برای منفی
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
 container: {
   paddingHorizontal: 17,
   marginVertical: 7,
 },
 scrollContent: {
  paddingRight: 27, 
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
   marginBottom: 3,
 },
 iconContainer: {
   marginRight: 4,
 },
 icon: {
   fontSize: 11,
 },
 symbol: {
   fontSize: 10,
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
   fontWeight: '300',
 },
 usdPrice: {
   fontSize: 10,
   color: '#808080',
   marginTop: 4,
 }
});