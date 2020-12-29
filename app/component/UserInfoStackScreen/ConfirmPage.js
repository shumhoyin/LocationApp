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

  //action to submit this form ==> will be handled by redux (registerUserRequest)

  //this fucnction will be activated if register user is success

  const successCallback = () => {
    props.navigation.navigate('RegisterSuccessScreen');
  };

  const failureCallback = () => {
    alert();
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
          <TouchableOpacity
            onPress={() => props.registerUserRequest(UserObj, successCallback)}>
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
    registerUserRequest: (UserObj, successCallback) =>
      dispatch(registerUserRequest(UserObj, successCallback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);
