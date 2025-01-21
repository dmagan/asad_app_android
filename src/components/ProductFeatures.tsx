import React from 'react';
import SignalIcon from '../assets/Icons/SignalIcon';
import VipIcon from '../assets/Icons/VipIcon';
import DexTrading from '../assets/Icons/DexTrading';
import ZeroTTo100 from '../assets/Icons/0to100';
import Mentor from '../assets/Icons/Mentor';



  
  import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    I18nManager,
  } from 'react-native';
  import CustomText from './CustomText';
  

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface Props {
  isDarkMode: boolean;
  onFeaturePress: (id: string) => void;
}

export default function ProductFeatures({ isDarkMode, onFeaturePress }: Props) {
  const features: FeatureItem[] = [
    {
      id: 'free-signals',
      title: 'عضو رایگان سیگنال فیوچرز',
      subtitle: 'درآمد ماهانه رایگان',
      icon: <SignalIcon width={27} height={27} color="#F7D55D" />
    },
    {
      id: 'vip-channel',
      title: 'کانال VIP',
      subtitle: 'کانال ویژه تیم PCS',
      icon: <VipIcon width={27} height={27} color="#F7D55D" />
    },
    {
      id: 'dex-trading',
      title: 'کلاس حرفه ای دکس تریدینگ',
      subtitle: 'نحوه پیدا کردن میم کوین های پامپی',
      icon: <DexTrading width={47} height={47} color="#F7D55D" />
    },
    {
      id: 'crypto-education',
      title: 'آموزش 0 تا 100 کریپتو',
      subtitle: 'آشنایی با مفاهیم پایه تا حرفه ای',
      icon: <ZeroTTo100 width={30} height={30} color="#F7D55D" />

    },
    {
      id: 'personal-coaching',
      title: 'کوچینگ شخصی (منتور)',
      subtitle: 'ارتباط مستقیم با اساتید',
      icon: <Mentor width={30} height={30} color="#F7D55D" />
    }
  ];

  return (
    <View style={styles.container}>
      {features.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.featureItem,
            { 
              backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
              borderColor: isDarkMode ? '#505a71' : '#E5E7EB',
            }
          ]}
          onPress={() => onFeaturePress(item.id)}
          activeOpacity={0.7}
        >
          {/* آیکون سمت راست */}
          <View style={[
            styles.iconContainer,
            
          ]}>
            {item.icon}
          </View>
          
          {/* متن‌ها با راست‌چین */}
          <View style={styles.textContainer}>
            <CustomText
              variant="medium"
              style={[
                styles.title,
                { color: isDarkMode ? '#FFFFFF' : '#000000' },
                { textAlign: 'right', width: '100%' }
              ]}
              numberOfLines={1}
            >
              {item.title}
            </CustomText>
            
            <CustomText
              variant="regular"
              style={[
                styles.subtitle,
                { color: isDarkMode ? '#A0A0A0' : '#666666' },
                { textAlign: 'right', width: '100%' }
              ]}
              numberOfLines={1}
            >
              {item.subtitle}
            </CustomText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  featureItem: {
    ...Platform.select({
      ios: {
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
      },
      android: {
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
      },
    }),
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation:0,
      },
    }),
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,  // تغییر marginRight به marginLeft
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // برای RTL
  },
  title: {
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'right', // راست‌چین کردن متن
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.8,
    textAlign: 'right', // راست‌چین کردن متن
  },
});