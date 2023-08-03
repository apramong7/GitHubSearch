import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';

export default function Home({ navigation}) {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (userInput) => {
    setUserInput(userInput);
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        setError(data.message)
      } else {
        setError(null)
        navigation.navigate('Profile', { username: data.login });
      }
    })
  }

  return (
    <SafeAreaProvider>
      <Text style={styles.navbar}>Github Search</Text>
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder="GitHub User"
            onChangeText={(userInput) => handleSearch(userInput)}
            value={userInput}
        />
        <Button title="submit" onPress={handleSubmit} />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  navbar: {
    padding: 40,
    backgroundColor: 'rgb(233, 224, 222)'
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 0
  },
  input:{
    borderWidth:1,
    marginBottom:10,
    padding:10,
    width:'100%',
    borderRadius:10,
 },
 errorText: {
  fontSize: 18,
  color: 'red',
 }
});
