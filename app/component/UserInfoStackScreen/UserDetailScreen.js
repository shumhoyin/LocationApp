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
import {connect,useDispatch,useSelector} from 'react-redux';
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

function UserDetailScreen() {
  const data = useSelector(state=>state.user.user)
  const dispatch = useDispatch();
  return (
    <View>
        <SafeAreaView>

        <Text>UserName = {data.userName}</Text>
        <Text>UserFirstName = {data.firstName}</Text>
        <Text>UserLastName = {data.lastName}</Text>
        <Text>Email = {data.email}</Text>
        <TouchableOpacity onPress={()=>dispatch(logoutUserRequest())}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </View>
  );
}





export default UserDetailScreen;
