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

import Register from './Register';

const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function LoginPage({navigation}) {
  const [UserName, onUserNameChange] = useState(null);
  const [Password, onPasswordChange] = useState(null);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'powderblue',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Text style={{fontSize: 40}}>User Info</Text>
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/UserInfo/default-user-icon.png')}
          style={styles.UserIcon}
        />
      </View>

      {/*<View style={{flex: 3, backgroundColor: 'steelblue'}}>*/}
      {/*  <Text>UserName :</Text>*/}
      {/*  <TextInput*/}
      {/*    style={{height: 40, borderColor: 'black', borderWidth: 1}}*/}
      {/*    onChangeText={(text) => onUserNameChange(text)}*/}
      {/*    value={UserName}*/}
      {/*  />*/}
      {/*  <Text stykle={{marginBottom: 20}}>{UserName}</Text>*/}

      {/*  <Text>Password :</Text>*/}
      {/*  <TextInput*/}
      {/*    style={{height: 40, borderColor: 'black', borderWidth: 1}}*/}
      {/*    onChangeText={(text) => onPasswordChange(text)}*/}
      {/*    value={Password}*/}
      {/*  />*/}
      {/*  <Text>{Password}</Text>*/}

      <View>
        <Text> Have an Account ? Login ! </Text>
      </View>

      <Button
        title="Login"
        color="#f194ff"
        onPress={() => navigation.navigate('Login')}
      />

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 4,
          margin: 20,
        }}
      />

      <View style={{alignItems: 'center'}}>
        <Text>Do Not Have An Account ? Sign One !</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            fontSize: 20,
          }}>
          Sign Up With Username and Password
        </Text>
      </TouchableOpacity>

      <Button
        title="Sign Up With Facebook"
        color="#f194ff"
        onPress={() => Alert.alert('This is a register button 2')}
      />
      <Button
        title="Sign Up With Google"
        color="#f194ff"
        onPress={() => Alert.alert('This is a register button 3')}
      />
    </View>
  );
}

export default LoginPage;
