import React from 'react';
import { Image, TouchableOpacity, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

interface PhotoThumbnailProps {
  uri: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({ uri, size = 100, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style, { width: size, height: size }]}>
      <Image
        source={uri} // Use source instead of uri
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
