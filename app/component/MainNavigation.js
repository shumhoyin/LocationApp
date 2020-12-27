import React from 'react';

import 'react-native-gesture-handler';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, connect} from 'react-redux';

import MapStackScreen from './MapStackScreen/MapStackScreen';

import UserInfoStackScreen from './UserInfoStackScreen/UserInfoStackScreen';

import ShareLocationStackScreen from './ShareScreenStack/ShareLocationStackScreen';

const Tab = createBottomTabNavigator();

function MainNavigation(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapStackScreen} />
        {/*<Stack.Screen name="Comments" component={CommentScreen} />*/}
        <Tab.Screen
          name="Share"
          component={
            props.data.user ? ShareLocationStackScreen : UserInfoStackScreen
          }
        />
        <Tab.Screen name="User Info" component={UserInfoStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};
export default connect(mapStateToProps, null)(MainNavigation);
