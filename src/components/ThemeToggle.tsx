import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: Props) {
  return (
    <TouchableOpacity 
      onPress={onToggle}
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0' }
      ]}
    >
      <View style={[
        styles.switchTrack,
        { backgroundColor: isDarkMode ? '#0F172A' : '#CBD5E1' }
      ]}>
        <Animated.View style={[
          styles.switchThumb,
          { 
            transform: [{ translateX: isDarkMode ? 28 : 0 }],
            backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC'
          }
        ]}>
          <Ionicons 
            name={isDarkMode ? 'moon' : 'sunny'} 
            size={16} 
            color={isDarkMode ? '#FFFFFF' : '#FB923C'} 
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 30,
  },
  switchTrack: {
    width: 56,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});