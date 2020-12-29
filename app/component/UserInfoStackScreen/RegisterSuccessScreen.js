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

function RegisterSuccessScreen() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>Success</Text>
        <View>
          {/*doing validation */}
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Login Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RegisterSuccessScreen;
