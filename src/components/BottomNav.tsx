import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavItem {
  key: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

interface Props {
  isDarkMode: boolean;
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

export default function BottomNav({ isDarkMode, activeTab, onTabPress }: Props) {
  const navItems: NavItem[] = [
    { key: 'home', icon: 'home', label: 'خانه' },
    { key: 'products', icon: 'play-circle', label: 'محصولات' },
    { key: 'orders', icon: 'calendar', label: 'سفارش‌ها' },
    { key: 'profile', icon: 'person', label: 'پروفایل' },
    { key: 'more', icon: 'menu', label: 'بیشتر' },
  ];

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }
    ]}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => onTabPress(item.key)}
        >
          <Ionicons
            name={item.key === activeTab ? item.icon : `${item.icon}-outline`}
            size={24}
            color={item.key === activeTab ? '#F7D55D' : isDarkMode ? '#FFFFFF' : '#000000'}
          />
          <Text style={[
            styles.navLabel,
            { 
              color: item.key === activeTab 
                ? '#F7D55D' 
                : isDarkMode ? '#FFFFFF' : '#000000' 
            }
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});