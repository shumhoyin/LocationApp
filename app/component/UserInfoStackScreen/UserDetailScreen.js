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
import {logoutUserRequest} from '../../redux';
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function UserDetailScreen(props) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>UserFirstName = {props.data.firstName}</Text>
        <Text>UserLastName = {props.data.lastName}</Text>
        <Text>Email = {props.data.email}</Text>
        <TouchableOpacity onPress={() => props.logoutUserRequest()}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUserRequest: () => dispatch(logoutUserRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
