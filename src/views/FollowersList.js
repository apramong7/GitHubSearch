import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function FollowersList({ route }) {
  const { username, navigation } = route.params;
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFollowers(data);
          setLoading(false);
          setError(null);
        } else {
          setError('Error fetching followers');
          setLoading(false);
        }
      })
      .catch((error) => {
        setError('Error fetching followers');
        setLoading(false);
      });
  }, [username]);

  const handleFollowerProfile = (follower) => {
    navigation.navigate('Profile', { username: follower.login });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFollowerProfile(item)}>
            <View style={styles.followerItem}>
              <Text style={styles.followerLogin}>{item.login}</Text>
              <Text style={styles.followerUrl}>{item.html_url}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  followerItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  followerLogin: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followerUrl: {
    color: '#517fa4',
  },
});
