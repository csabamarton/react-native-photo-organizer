import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import PhotoThumbnail from '../components/PhotoThumbnail';
import { mockPhotos } from '../utils/mockData';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Album'>;

type Props = {
  route?: AlbumScreenRouteProp;
  navigation?: AlbumScreenNavigationProp;
};

interface Photo {
  id: string;
  uri: string;
  selected: boolean;
}

const AlbumScreen: React.FC<Props> = ({ route }) => {
  const albumId = route?.params?.id || 'Default Album';
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [deletingPhotos, setDeletingPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (Constants.isDevice) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const media = await MediaLibrary.getAssetsAsync({
            mediaType: 'photo',
            sortBy: 'creationTime',
            first: 50,
          });
          setPhotos(
            media.assets.map(asset => ({ id: asset.id, uri: asset.uri, selected: false }))
          );
        }
      } else {
        setPhotos(mockPhotos.map(photo => ({ ...photo, selected: false })));
      }
    };

    fetchPhotos();
  }, []);

  // Toggle photo selection
  const toggleSelection = (id: string) => {
    setPhotos(photos.map(photo =>
      photo.id === id ? { ...photo, selected: !photo.selected } : photo
    ));
  };

  // Handle the deletion of selected photos
  const handleDelete = () => {
    const selectedPhotos = photos.filter(photo => photo.selected);
    setPhotos(photos.filter(photo => !photo.selected));
    setDeletingPhotos([...deletingPhotos, ...selectedPhotos.map(photo => ({ ...photo, selected: false }))]);
  };

  const handleKeep = () => {
    const selectedPhotos = photos.filter(photo => photo.selected);
    if (selectedPhotos.length > 0) {
      Alert.alert('Keep', `Keeping ${selectedPhotos.length} photos...`);
    } else {
      Alert.alert('Keep', 'No photos selected.');
    }
  };

  const handleCompress = () => {
    const selectedPhotos = photos.filter(photo => photo.selected);
    if (selectedPhotos.length > 0) {
      Alert.alert('Compress', `Compressing ${selectedPhotos.length} photos...`);
    } else {
      Alert.alert('Compress', 'No photos selected.');
    }
  };

  const handleFinish = () => {
    Alert.alert(
      'Confirm Bulk Actions',
      'Are you sure you want to complete the bulk actions?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setDeletingPhotos([]);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organize</Text>

      <Text style={styles.sectionTitle}>To-Mark Images</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item.id)} style={styles.touchable}>
            <View style={[styles.photoContainer, item.selected && styles.selected]}>
              <PhotoThumbnail uri={item.uri} size={100} />
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
      />

      {deletingPhotos.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Deleting</Text>
          <FlatList
            data={deletingPhotos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.photoContainer}>
                <PhotoThumbnail uri={item.uri} size={100} />
              </View>
            )}
            numColumns={3}
          />
        </>
      )}

      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.keepButton]} onPress={handleKeep}>
          <Text style={styles.buttonText}>Keep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.compressButton]} onPress={handleCompress}>
          <Text style={styles.buttonText}>Compress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  touchable: {
    margin: 4, // Adds padding to make it easier to click
  },
  photoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  selected: {
    borderWidth: 2,
    borderColor: 'green',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  keepButton: {
    backgroundColor: 'green',
  },
  compressButton: {
    backgroundColor: 'blue',
  },
  finishButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlbumScreen;
