import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Story {
  id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  isDarkMode: boolean;
  stories: Story[];
  onStoryPress: (id: string) => void;
}

export default function Stories({ isDarkMode, stories, onStoryPress }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {stories.map((story) => (
        <TouchableOpacity
          key={story.id}
          style={styles.storyContainer}
          onPress={() => onStoryPress(story.id)}
        >
          <View style={styles.storyImageContainer}>
            <View style={styles.storyImageBorder}>
              <Image
                source={{ uri: story.imageUrl }}
                style={styles.storyImage}
              />
            </View>
          </View>
          <Text
            style={[
              styles.storyTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}
            numberOfLines={1}
          >
            {story.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  storyImageContainer: {
    padding: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  storyImageBorder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#F7D55D',
    padding: 2,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  storyTitle: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});