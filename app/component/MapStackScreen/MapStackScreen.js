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
//import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import MapScreen from './MapScreen';
import DetailScreen from './DetailScreen';
import CommentScreen from './CommentScreen';
import GiveCommentSuccess from './GiveCommentSuccess';
const Stack = createStackNavigator();

export default function MapStackScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      <Stack.Screen name="GiveCommentSuccess" component={GiveCommentSuccess} />

    </Stack.Navigator>
  );
}
