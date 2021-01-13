import React from 'react';

import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import MapStackScreen from './MapStackScreen/MapStackScreen';

import UserInfoStackScreen from './UserInfoStackScreen/UserInfoStackScreen';
import UserDetailScreen from './UserInfoStackScreen/UserDetailScreen';

import ShareLocationStackScreen from './ShareScreenStack/ShareLocationStackScreen';
import FavouriteScreen from './FavouriteScreen';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  const data = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapStackScreen} />
        <Tab.Screen
          name="Share"
          component={data ? ShareLocationStackScreen : UserInfoStackScreen}
        />
        <Tab.Screen
          name="Favourite"
          component={data ? FavouriteScreen : UserInfoStackScreen}
        />
        <Tab.Screen
          name="UserInfo"
          component={data ? UserDetailScreen : UserInfoStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
