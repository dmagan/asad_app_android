// src/components/Slider.tsx
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

interface Props {
  isDarkMode: boolean;
  data: {
    id: string;
    title: string;
    imageUrl: string;
  }[];
}

export default function Slider({ isDarkMode, data }: Props) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.container}
    >
      {data.map((item) => (
        <View key={item.id} style={styles.slideContainer}>
          <Image 
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    slideContainer: {
      width: width - 32, // عرض صفحه منهای پدینگ
      height: (width - 32) * 0.5, // ارتفاع متناسب با عرض (نسبت 2:1)
      marginHorizontal: 16,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover' // پوشش کامل فضا
    }
  });