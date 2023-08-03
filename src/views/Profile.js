import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Icon } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';

export default function Profile({ data, navigation }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);

  const route = useRoute();
  const { username } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        fetch(`https://api.github.com/users/${username}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
            setError(null);
          });
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

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

  return (
    <SafeAreaProvider>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.container}>
          <Card>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: avatar }} />
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
                    color='#517fa4'
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
                    color='#517fa4'
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
    backgroundColor: '#f8f8f8',
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
