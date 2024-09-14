import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Home</Text>

      {/* Storage Status */}
      <View style={styles.storageContainer}>
        <Text style={styles.storageText}>Storage: 70% used (14GB/20GB)</Text>
      </View>

      {/* Cleanup Button */}
      <TouchableOpacity
        style={styles.cleanupButton}
        onPress={() => navigation.navigate('Album')}
      >
        <Text style={styles.cleanupButtonText}>Start Cleanup (20 photos to review)</Text>
      </TouchableOpacity>

      {/* Recent Activities */}
      <View style={styles.activitiesContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <Text style={styles.activityText}>• Shared 5 photos in "Hanga"</Text>
        <Text style={styles.activityText}>• Compressed 15 photos</Text>
        <Text style={styles.activityText}>• Deleted 30 unused photos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  storageContainer: {
    backgroundColor: '#fff9c4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  storageText: {
    fontSize: 16,
    color: '#333',
  },
  cleanupButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  cleanupButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default HomeScreen;
