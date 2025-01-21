// src/assets/Icons/SignalIcon.tsx
import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface SignalIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SignalIcon = ({ 
  width = 37, 
  height = 37, 
  color = "#F7D55D" 
}: SignalIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 37 37" fill="none">
    <Path d="M10.7917 15.4167H4.625V26.2084H10.7917V15.4167Z" 
      stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M21.5834 10.7917H15.4167V30.8334H21.5834V10.7917Z" 
      stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M18.5 33.9166V30.8333" 
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M32.375 9.25H26.2083V16.1875H32.375V9.25Z" 
      stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M7.70831 15.4166V7.70831" 
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M29.2917 26.2083V16.1875" 
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M29.2917 9.24998V3.08331" 
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default SignalIcon;