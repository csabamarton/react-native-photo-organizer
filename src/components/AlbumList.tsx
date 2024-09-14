import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PhotoThumbnail from './PhotoThumbnail';
import { ImageSourcePropType } from 'react-native';

interface Album {
  id: string;
  name: string;
  coverPhotoUri: ImageSourcePropType; // Change this to ImageSourcePropType
  photoCount: number;
}

interface AlbumListProps {
  albums: Album[];
  onAlbumPress: (albumId: string) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onAlbumPress }) => {
  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity style={styles.albumItem} onPress={() => onAlbumPress(item.id)}>
      <PhotoThumbnail uri={item.coverPhotoUri} size={80} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumName}>{item.name}</Text>
        <Text style={styles.photoCount}>{item.photoCount} photos</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={albums}
      renderItem={renderAlbumItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  albumInfo: {
    marginLeft: 16,
  },
  albumName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default AlbumList;
