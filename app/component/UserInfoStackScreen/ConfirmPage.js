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
import {connect} from 'react-redux';
import axios from 'axios';
import {registerUserRequest} from '../../redux';
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function ConfirmPage(props) {
  const [UserObj, setUser] = useState(props.route.params);

  //action to submit this form ==> will be handled by redux
  const ConfirmInfo = () => {
    console.log('In Confirm Page :' + JSON.stringify(UserObj));
    // let ReturnResult = axios
    //   .post('http://localhost:3000/api/User/UserRegister', UserObj)
    //   .then((res) => {
    //     console.log(typeof res.data.resCode);
    //
    //     res.data.resCode === 1
    //       ? Alert.alert(
    //           'Register Result',
    //           'Success',
    //           [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //           {cancelable: false},
    //         )
    //       : Alert.alert(
    //           'Register Result',
    //           'Fail',
    //           [{text: 'OK', onPress: () => props.navigation.goBack()}],
    //           {cancelable: false},
    //         );
    //   });
  };
  return (
    <View style={{flex: 1}}>
      <Text>Confirm Your Information</Text>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>UserFirstName = {UserObj.firstName}</Text>
        <Text>UserLastName = {UserObj.lastName}</Text>
        <Text>Email = {UserObj.email}</Text>
        <Text>Username = {UserObj.userName}</Text>
        <Text>Password = {UserObj.userPassword}</Text>

        <Text>If data is correct , Please Press Confirm</Text>
        <View>
          {/*doing validation */}
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Back
            </Text>
          </TouchableOpacity>
          {/*doing validation */}
          <TouchableOpacity onPress={ConfirmInfo}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserRequest: (UserObj) => dispatch(registerUserRequest(UserObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);
