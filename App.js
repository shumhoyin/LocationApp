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

import MapStackScreen from './app/component/MapStackScreen/MapStackScreen';

import UserInfoStackScreen from './app/component/UserInfoStackScreen/UserInfoStackScreen';

import ShareLocationStackScreen from './app/component/ShareScreenStack/ShareLocationStackScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapStackScreen} />
        {/*<Stack.Screen name="Comments" component={CommentScreen} />*/}
        <Tab.Screen name="Share" component={ShareLocationStackScreen} />
        <Tab.Screen name="User Info" component={UserInfoStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
