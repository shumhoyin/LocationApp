import React, {useEffect} from 'react';

import 'react-native-gesture-handler';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, connect,useSelector,useDispatch} from 'react-redux';

import MapStackScreen from './MapStackScreen/MapStackScreen';

import UserInfoStackScreen from './UserInfoStackScreen/UserInfoStackScreen';
import UserDetailScreen from './UserInfoStackScreen/UserDetailScreen';

import ShareLocationStackScreen from './ShareScreenStack/ShareLocationStackScreen';

const Tab = createBottomTabNavigator();

function MainNavigation() {
    const data = useSelector(state =>state.user.user);
    const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapStackScreen} />
        {/*<Stack.Screen name="Comments" component={CommentScreen} />*/}
        <Tab.Screen
          name="Share"
          component={
            data ? ShareLocationStackScreen : UserInfoStackScreen
          }
        />
        <Tab.Screen
          name="User Info"
          component={data? UserDetailScreen : UserInfoStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
