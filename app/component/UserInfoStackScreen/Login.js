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
import {connect} from 'react-redux';
import {loginUserRequest} from '../../redux';

const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function Login(props) {
  const [UserObj, setUserObj] = useState({userName: '', userPassword: ''});

  const successCallback = () => {
    console.log('123 success');

    props.navigation.navigate('Map');
  };

  const FailureCallback = () => {
    console.log('123 failure');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>UserName :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, userName: text})}
          value={UserObj.userName}
        />
        <Text stykle={{marginBottom: 20}}>{UserObj.userName}</Text>

        <Text>Password :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, userPassword: text})}
          value={UserObj.userPassword}
        />
        <Text>{UserObj.userPassword}</Text>

        {/*doing validation */}
        <TouchableOpacity
          onPress={() =>
            props.loginUserRequest(UserObj, successCallback, FailureCallback)
          }>
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

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserRequest: (UserObj, successCallback, FailureCallback) =>
      dispatch(loginUserRequest(UserObj, successCallback, FailureCallback)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
