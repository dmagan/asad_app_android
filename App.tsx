import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import App from './src/App';

// پیشگیری از مخفی شدن خودکار صفحه اسپلش
SplashScreen.preventAutoHideAsync();

function AppWrapper() {
  const [fontsLoaded] = useFonts({
    'IRANSans': require('./assets/fonts/IRANSansWeb.ttf'),
    'IRANSans-Medium': require('./assets/fonts/IRANSansWeb_Medium.ttf'),
    'IRANSans-Bold': require('./assets/fonts/IRANSansWeb_Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // مخفی کردن صفحه اسپلش بعد از لود شدن فونت‌ها
  SplashScreen.hideAsync();

  return <App />;
}

registerRootComponent(AppWrapper);