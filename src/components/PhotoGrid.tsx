import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import PhotoThumbnail from './PhotoThumbnail';
import { ImageSourcePropType } from 'react-native';

interface Photo {
  id: string;
  uri: ImageSourcePropType; // Change to ImageSourcePropType
}

interface PhotoGridProps {
  photos: Photo[];
  onPhotoPress: (photoId: string) => void;
  numColumns?: number;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoPress, numColumns = 3 }) => {
  const screenWidth = Dimensions.get('window').width;
  const photoSize = (screenWidth - (numColumns + 1) * 8) / numColumns;

  const renderPhotoItem = ({ item }: { item: Photo }) => (
    <PhotoThumbnail
      uri={item.uri}
      size={photoSize}
      onPress={() => onPhotoPress(item.id)}
      style={styles.photoItem}
    />
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderPhotoItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 4,
  },
  photoItem: {
    margin: 4,
  },
});

export default PhotoGrid;
