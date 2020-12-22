/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function Login({navigation}) {
  const [UserName, onUserNameChange] = useState(null);
  const [UserPassword, onUserPasswordChange] = useState(null);

  const LoginSubmit = () => {
    const UserObj = {
      username: UserName,
      hashedPassword: UserPassword,
    };

    console.log(UserObj);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>UserName :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onUserNameChange(text)}
          value={UserName}
        />
        <Text stykle={{marginBottom: 20}}>{UserName}</Text>

        <Text>Password :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onUserPasswordChange(text)}
          value={UserPassword}
        />
        <Text>{UserPassword}</Text>

        {/*doing validation */}
        <TouchableOpacity onPress={LoginSubmit}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
