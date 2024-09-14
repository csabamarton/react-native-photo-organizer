import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Abstracted screen options for reuse
const getScreenOptions = (routeName: string, isDarkMode: boolean) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    if (routeName === 'Home') {
      iconName = 'home-outline';
    } else if (routeName === 'Album') {
      iconName = 'albums-outline';
    } else if (routeName === 'Settings') {
      iconName = 'settings-outline';
    } else {
      iconName = 'help-circle-outline'; // Default to avoid undefined errors
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  headerStyle: {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7',
  },
  headerTintColor: isDarkMode ? '#fff' : '#000',
});

const RootTab: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      ...getScreenOptions(route.name, isDarkMode),
      tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="Album" component={AlbumScreen} options={{ title: 'Album' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
  </Tab.Navigator>
);

const AppNavigation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <NavigationContainer>
    <RootTab isDarkMode={isDarkMode} />
  </NavigationContainer>
);

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <AppNavigation isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
};

export default App;
