import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  price: string;
  images: Array<{
    src: string;
  }>;
  permalink: string;
}

interface ProductListProps {
  isDarkMode: boolean;
  products: Product[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4; // 40% of screen width

const ProductList: React.FC<ProductListProps> = ({ isDarkMode, products }) => {

  if (!products || products.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
          در حال بارگذاری محصولات...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#FFFFFF' : '#000000' }
      ]}>
        محصولات فروشگاه
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.card,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }
            ]}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: product.images[0]?.src || 'https://picsum.photos/200',
                  headers: {
                    'Cache-Control': 'no-cache'
                  }
                }}
                style={styles.image}
                resizeMode="cover"
                defaultSource={require('../../assets/placeholder.png')} // اضافه کنید یک تصویر placeholder در assets
              />
            </View>
            
            <View style={styles.details}>
              <Text 
                style={[
                  styles.name,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
                numberOfLines={2}
              >
                {product.name}
              </Text>
              
              <Text
                style={[
                  styles.price,
                  { color: isDarkMode ? '#FFFFFF' : '#22C55E' }
                ]}
              >
                {parseInt(product.price).toLocaleString()} تومان
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20, 
  },
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH, // Square aspect ratio
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
    height: 40, // Fixed height for two lines
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductList;