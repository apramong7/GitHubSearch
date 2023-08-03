/**
 * Home.js
 * This component represents the home screen of the GitHub User Search app.
 * It allows users to search for GitHub profiles by entering a username.
 * The search results are displayed on the Profile screen.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Function to handle user input change
  const handleSearch = (userInput) => {
    setUserInput(userInput);
  }

  // Function to handle form submission and navigate to Profile screen
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message)
        } else {
          setError(null)
          navigation.navigate('Profile', { username: data.login });
        }
      })
  }

  // UseEffect to detect keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Github User Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter GitHub User"
          onChangeText={(userInput) => handleSearch(userInput)}
          value={userInput}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.imageContainer, { marginBottom: keyboardVisible ? -130 : 0  }]}>
          <Image
            source={require('../images/search.png')}
            style={[styles.image, { height: keyboardVisible ? 250 : 280  }]}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f3f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#542617',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b1b0ae',
    color: '#542617',
    marginBottom: 20,
    padding: 10,
    width: '80%',
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#542617',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: -130,
    alignItems: 'center',
  },
  image: {
    width: 400,
    resizeMode: 'contain',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
