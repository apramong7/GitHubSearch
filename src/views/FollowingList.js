import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function FollowingList({ route }) {
  const { username, navigation } = route.params;
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/following`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFollowing(data);
          setLoading(false);
          setError(null);
        } else {
          setError('Error fetching followings');
          setLoading(false);
        }
      })
      .catch((error) => {
        setError('Error fetching followings');
        setLoading(false);
      });
  }, [username]);

  const handleFollowingProfile = (follower) => {
    navigation.navigate('Profile', { username: following.login });
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
        data={following}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFollowingProfile(item)}>
            <View style={styles.followingItem}>
              <Text style={styles.followingLogin}>{item.login}</Text>
              <Text style={styles.followingUrl}>{item.html_url}</Text>
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
  followingItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  followingLogin: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followingUrl: {
    color: '#517fa4',
  },
});
