import React from 'react';

import 'react-native-gesture-handler';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, connect} from 'react-redux';

import MapStackScreen from './app/component/MapStackScreen/MapStackScreen';

import UserInfoStackScreen from './app/component/UserInfoStackScreen/UserInfoStackScreen';

import ShareLocationStackScreen from './app/component/ShareScreenStack/ShareLocationStackScreen';

const Tab = createBottomTabNavigator();

import store from './app/redux/store';
import MainNavigation from './app/component/MainNavigation';

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
