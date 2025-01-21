import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import CustomText from './CustomText';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface NavItem {
  key: string;
  icon: IconName;
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
      { backgroundColor: isDarkMode ? '#212837' : '#FFFFFF' }
    ]}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => onTabPress(item.key)}
        >
          <Ionicons
            name={item.key === activeTab ? item.icon : `${item.icon}-outline` as IconName}
            size={24}
            color={item.key === activeTab ? '#F7D55D' : isDarkMode ? '#FFFFFF' : '#000000'}
          />
          <CustomText
            style={[
              styles.navLabel,
              { 
                color: item.key === activeTab 
                  ? '#F7D55D' 
                  : isDarkMode ? '#FFFFFF' : '#000000' 
              }
            ]}
            variant="regular"
          >
            {item.label}
          </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'IRANSans',
  },
});