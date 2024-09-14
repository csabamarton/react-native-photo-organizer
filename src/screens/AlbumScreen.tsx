import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import PhotoThumbnail from '../components/PhotoThumbnail';

// Import images
const ocean = require('../../assets/images/ocean.jpg');
const jump = require('../../assets/images/jump.jpg');
const vinyl = require('../../assets/images/vinyl.jpg');

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Album'>;

type Props = {
  route?: AlbumScreenRouteProp; // Make route optional
  navigation?: AlbumScreenNavigationProp; // Make navigation optional
};

const AlbumScreen: React.FC<Props> = ({ route }) => {
  const albumId = route?.params?.id || 'Default Album'; // Use default value if route is undefined

  // Use local images
  const photos = [
    { id: '1', uri: ocean },
    { id: '2', uri: jump },
    { id: '3', uri: vinyl },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Album {albumId}</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <PhotoThumbnail uri={item.uri} size={100} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
});

export default AlbumScreen;
