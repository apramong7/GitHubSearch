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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Github Search' }} />
        <Stack.Screen name="Profile" component={Profile} options={({ route }) => ({ title: route.params.username })} />
        <Stack.Screen name="Followers" component={FollowersList} options={{ title: 'Followers' }} />
        <Stack.Screen name="Following" component={FollowingList} options={{ title: 'Following' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [name, setName] = useState('');
//   const [userName, setUserName] = useState('');
//   const [followers, setFollowers] = useState('');
//   const [following, setFollowing] = useState('');
//   const [repos, setRepos] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://api.github.com/users/example')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
//   }, [])

//   const handleSearch = (userInput) => {
//     setUserInput(userInput);
//   }

//   const handleSubmit = () => {
//     fetch(`https://api.github.com/users/${userInput}`)
//     .then(res => res.json())
//     .then(data => {
//       if(data.message) {
//         setError(data.message)
//       } else {
//         setError(null)
//         setData(data);
//         console.log(data);
//       }
//     })
//   }
  
//   const setData = ({ 
//     name, 
//     login, 
//     followers, 
//     following, 
//     public_repos, 
//     avatar_url }) => 
//     {
//     setName(name);
//     setUserName(login);
//     setFollowers(followers);
//     setFollowing(following);
//     setRepos(public_repos);
//     setAvatar(avatar_url);
//   }

//   return (
//     <SafeAreaProvider>
//       <Text style={styles.navbar}>Github Search</Text>
//       <View style={styles.container}>
//         <TextInput 
//             style={styles.input}
//             placeholder="GitHub User"
//             onChangeText={(userInput) => handleSearch(userInput)}
//             value={userInput}
//         />
//         <Button title="submit" onPress={handleSubmit} />
//       </View>
//       {
//         error
//         ? (<Text>{error}</Text>)
//         : (
//           <View>
//             <Card>
//               <Card.Image
//                 style={{ padding: 0 }}
//                 source={{ uri:  avatar }}
//               />
//               <Card.Title>{name}</Card.Title>
//               <Text style={styles.fonts} h2>
//                 {userName}
//               </Text>
//               <Card.Divider />
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Icon
//                name='user-friends'
//                type='font-awesome-5'
//                color='#517fa4'
//               />
//               <Text>{followers} Followers</Text>
//               </View>
//               <Card.Divider />
//               <Card.Divider />
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Icon
//                name='source-repository'
//                type='material-community'
//                color='#517fa4'
//               />
//               <Text>{repos} Repositories</Text>
//               </View>
//               <Card.Divider />
//               <Card.Divider />
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Icon
//                name='users'
//                type='font-awesome-5'
//                color='#517fa4'
//               />
//               <Text>{following} Following</Text>
//               </View>
//               <Card.Divider />
//         </Card>
//     </View>
//         )
//       }
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     padding: 40,
//     backgroundColor: 'rgb(233, 224, 222)'
//   },
//   search: {
//     display: 'flex',
//     justifyContent: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 0
//   },
//   input:{
//     borderWidth:1,
//     marginBottom:10,
//     padding:10,
//     width:'100%',
//     borderRadius:10,
//  },
// });