/**
 * UserList.js
 * This component displays a list of users (either followers or following) for a given GitHub user.
 * It fetches user data from the GitHub API based on the provided endpoint (followers or following).
 * Users are rendered as clickable cards that navigate to their respective profiles when tapped.
 * It also supports pull-to-refresh functionality to reload the user list.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';

export default function UserList({ route, endpoint, title }) {
  const { username } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Ignore the specific log warning related to navigation state because it does not affect the app
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // Use navigation hook for navigation actions
  const navigation = useNavigation(); 

  // Fetch user data from the GitHub API
  useEffect(() => {
    fetchUserData();
  }, [username, endpoint]);

  const fetchUserData = () => {
    setRefreshing(true);
    fetch(`https://api.github.com/users/${username}/${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setLoading(false);
          setError(null);
        } else {
          setError(`Error fetching ${title}`);
          setLoading(false);
        }
        setRefreshing(false);
      })
      .catch((error) => {
        setError(`Error fetching ${title}`);
        setLoading(false);
        setRefreshing(false);
      });
  };

  // Handle user profile navigation when a user card is tapped
  const handleUserProfile = (user) => {
    navigation.navigate('Profile', { username: user.login });
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserProfile(item)}>
            <View style={styles.userCard}>
              <View style={styles.rowContainer}>
                <Image style={styles.avatar} source={{ uri: item.avatar_url }} />
                <View style={styles.infoContainer}>
                  <Text style={styles.userLogin}>{item.login}</Text>
                  <Text style={styles.userUrl}>{item.html_url}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchUserData} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f3f0',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  userCard: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  userLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userUrl: {
    color: '#517fa4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#542617',
    marginBottom: 20,
    textAlign: 'center',
  },
});
