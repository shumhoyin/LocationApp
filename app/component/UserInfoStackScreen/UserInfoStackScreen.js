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

import LoginPage from './LoginPage';
import Register from './Register';
import ConfirmPage from './ConfirmPage';
import Login from './Login';
import RegisterSuccessScreen from './RegisterSuccessScreen';
import UserDetailScreen from './UserDetailScreen';

const Stack = createStackNavigator();

export default function UserInfoStackScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmPage" component={ConfirmPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="RegisterSuccessScreen"
        component={RegisterSuccessScreen}
      />

      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}
