import React from 'react';
import { Image, TouchableOpacity, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

interface PhotoThumbnailProps {
  uri: string | ImageSourcePropType; // Update to accept both string (URI) and ImageSourcePropType
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({ uri, size = 100, onPress, style }) => {
  // Check if uri is a string, wrap it in an object with the "uri" key
  const source = typeof uri === 'string' ? { uri } : uri;

  console.log('Rendering PhotoThumbnail with URI:', uri); // Log for debugging

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style, { width: size, height: size }]}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
});

export default PhotoThumbnail;
