import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, BackHandler } from 'react-native';

//import Firebase from '../config/Firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import CButton from '../components/CButton';
import { CStyles } from '../CStyles';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [newUser, setNewUser] = useState();

  useEffect(() => {
    const back = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate('RouteHome');
      return true;
    });
    return () => {
      back.remove();
    };
  }, []);

  return (
    <View style={CStyles.container}>
      <Text style={CStyles.titleStyle}>Welcome to Coronica</Text>
      <TextInput
        style={CStyles.textInputStyle}
        value={ name }
        onChangeText={name => setName(name)}
        placeholder='Name'
      />
      <TextInput
        style={CStyles.textInputStyle}
        value={ email }
        onChangeText={email => setEmail(email)}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput
        style={CStyles.textInputStyle}
        value={ password }
        onChangeText={password => setPassword(password)} 
        placeholder='Password'
        secureTextEntry={true}
      />
      <CButton title='Sign Up!' onPress={() => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              firestore().collection('users').add({
                name: name,
                email: email,
                points: 0,
              }).then(res => {
                const newUser = {name: name, email:email, points:0};
                navigation.navigate('RouteActivities', { screen: 'RouteInventory',  user: newUser});
              })
            })
            .catch(error => {
              if(error.code === 'auth/email-already-in-use') {
                Alert.alert(
                  "Error",
                  "Email already in use.",
                  [
                   { text: "OK", onPress: () => {setEmail(''); setPassword(''); } }
                  ],
                  { cancelable: false }
                );
              }
              if(error.code === 'auth/invalid-email') {
                Alert.alert(
                  "Error",
                  "Invalid email.",
                  [
                   { text: "OK", onPress: () => {setEmail(''); setPassword(''); } }
                  ],
                  { cancelable: false }
                );
              }
              if(error.code === 'auth/weak-password') {
                Alert.alert(
                  "Error",
                  "Password is too weak.",
                  [
                   { text: "OK", onPress: () => {setEmail(''); setPassword(''); } }
                  ],
                  { cancelable: false }
                );
              }
            })
          }
        }/>
    </View>
  );

}
