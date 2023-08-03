/**
 * Profile.js
 * This component represents the user profile screen displaying GitHub user details.
 * It fetches user data from the GitHub API and stores it in cache for future use.
 * Cached data is used if available to reduce API calls and improve performance.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Icon } from '@rneui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ data }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);

  // Hooks for navigation and route
  const route = useRoute();
  const navigation = useNavigation();
  const { username } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if profile data is available in cache
    getCachedProfileData(username)
      .then((cachedData) => {
        if (cachedData) {
          // If cached data is available, use it
          setData(cachedData);
        } else {
          // If cached data is not available, fetch from API and store in cache
          fetchUserData();
        }
      })
      .catch((error) => {
        setError('Error fetching user data');
        setLoading(false);
      });
  }, [username]);

   // Function to fetch user data from the GitHub API
  const fetchUserData = async () => {
    try {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          setError(null);
          // Store the data in cache
          cacheProfileData(username, data);
        });
    } catch (error) {
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  // Function to set user data to state
  const setData = ({
    name,
    login,
    followers,
    following,
    bio,
    avatar_url,
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setDescription(bio);
    setAvatar(avatar_url);
  };

  // Function to get cached profile data from AsyncStorage
  const getCachedProfileData = async (username) => {
    try {
      const cachedData = await AsyncStorage.getItem(`profile_${username}`);
      return JSON.parse(cachedData);
    } catch (error) {
      console.log('Error retrieving cached data:', error);
      return null;
    }
  };

  // Function to cache profile data in AsyncStorage
  const cacheProfileData = async (username, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`profile_${username}`, jsonData);
    } catch (error) {
      console.log('Error caching data:', error);
    }
  };

  return (
    <SafeAreaProvider>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.container}>
          <Card>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Image
                    style={styles.placeholder}
                    source={require('../images/placeholder.png')}
                  />
                </View>
              )}
            </View>
            <View style={styles.textContainer}>
              <Card.Title>{userName}</Card.Title>
              <Text style={styles.name}>{name}</Text>
              {description !== '' && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{description}</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('Followers', { username, navigation })}
              >
                <View style={styles.countContainer}>
                  <Icon
                    name='user-friends'
                    type='font-awesome-5'
                    color='#542617'
                  />
                  <Text style={styles.countText}>{followers} Followers</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Following', { username, navigation })}
              >
                <View style={styles.countContainer}>
                  <Icon
                    name='users'
                    type='font-awesome-5'
                    color='#542617'
                  />
                  <Text style={styles.countText}>{following} Following</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f3f0',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  countText: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
