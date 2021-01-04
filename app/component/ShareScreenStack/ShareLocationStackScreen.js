import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import ShareScreen from './ShareScreen';
import ChooseLocation from './ChooseLocation';
import ShareSuccessScreen from './ShareSuccessScreen';
const Stack = createStackNavigator();

export default function ShareLocationStackScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
      <Stack.Screen name="ShareSuccessScreen" component={ShareSuccessScreen} />

    </Stack.Navigator>
  );
}
