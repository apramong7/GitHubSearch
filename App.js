/**
 * App.js
 * Main entry point of the GitHub User Search app.
 * It sets up the navigation stack using React Navigation.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/views/Home';
import Profile from './src/views/Profile';
import FollowersList from './src/views/FollowersList';
import FollowingList from './src/views/FollowingList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator for managing the navigation between screens */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e5d8cf',
          },
          headerTintColor: '#542617',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Home screen for searching GitHub user profiles */}
        <Stack.Screen name="Home" component={Home} options={{ title: 'Github Search' }} />
        
        {/* Profile screen for displaying user details */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({ title: route.params.username })}
        />
        
         {/* Screens to show the list of followers/followings for a user */}
        <Stack.Screen name="Followers" component={FollowersList} options={{ title: 'Followers' }} />
        <Stack.Screen name="Following" component={FollowingList} options={{ title: 'Following' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}