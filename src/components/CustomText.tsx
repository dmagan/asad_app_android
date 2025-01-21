import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'regular' | 'medium' | 'bold';
}

export const CustomText: React.FC<CustomTextProps> = ({ 
  children, 
  style, 
  variant = 'regular',
  ...props 
}) => {
  return (
    <Text 
      {...props}
      style={[
        styles.base,
        variant === 'medium' && styles.medium,
        variant === 'bold' && styles.bold,
        style
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'IRANSansWeb',
  },
  medium: {
    fontFamily: 'IRANSansWeb_Medium',
  },
  bold: {
    fontFamily: 'IRANSansWeb_Bold',
  },
});

export default CustomText;