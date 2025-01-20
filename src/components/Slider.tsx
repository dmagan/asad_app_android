import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface SliderData {
  id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  isDarkMode: boolean;
  data: SliderData[];
}

const { width: screenWidth } = Dimensions.get('window');

export default function Slider({ isDarkMode, data = [] }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  useEffect(() => {
    if (data && data.length > 1) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [data, activeIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    if (!data || data.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      scrollToIndex(nextIndex);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!data || index >= data.length) return;
    
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true
    });
    setActiveIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!data || data.length === 0) return;

    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const newIndex = Math.floor(contentOffset.x / viewSize.width);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < data.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleTouchStart = () => {
    stopAutoPlay();
  };

  const handleTouchEnd = () => {
    if (data && data.length > 1) {
      startAutoPlay();
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMomentumScrollEnd={handleTouchEnd}
        decelerationRate="fast"
        snapToInterval={screenWidth}
        snapToAlignment="center"
      >
        {data.map((item) => (
          <View key={item.id} style={styles.slideContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {data.length > 1 && (
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === activeIndex
                    ? '#F7D55D'
                    : isDarkMode ? '#4B5563' : '#D1D5DB',
                  width: index === activeIndex ? 20 : 8
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  slideContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  }
});