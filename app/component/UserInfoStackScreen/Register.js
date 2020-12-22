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

function Register({navigation}) {
  const [UserFirstName, onUserFirstNameChange] = useState(null);
  const [UserLastName, onUserLastNameChange] = useState(null);
  const [UserName, onUserNameChange] = useState(null);

  const [UserPassword, onUserPasswordChange] = useState(null);
  const [ReUserPassword, onReUserPasswordChange] = useState(null);
  const [UserEmail, onUserEmailChange] = useState(null);

  const goConfirmPage = () => {
    let UserObj = {
      firstName: UserFirstName,
      lastName: UserLastName,
      username: UserName,
      hashedPassword: UserPassword,
      email: UserEmail,
    };
    console.log(UserObj);
    navigation.navigate('ConfirmPage', UserObj);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>First Name :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onUserFirstNameChange(text)}
          value={UserFirstName}
        />

        <Text>Last Name :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onUserLastNameChange(text)}
          value={UserLastName}
        />
        <Text>{UserLastName}</Text>

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

        <Text>Re Enter Password :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onReUserPasswordChange(text)}
          value={ReUserPassword}
        />
        <Text>{ReUserPassword}</Text>

        <Text>E-mail :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => onUserEmailChange(text)}
          value={UserEmail}
        />
        <Text>{UserEmail}</Text>

        {/*doing validation */}
        <TouchableOpacity onPress={goConfirmPage}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Next Step
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;
