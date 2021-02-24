import React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';

import ShareScreen from './ShareScreen';
import ShareSuccessScreen from './ShareSuccessScreen';
const Stack = createStackNavigator();

export default function ShareLocationStackScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="ShareSuccessScreen" component={ShareSuccessScreen} />
    </Stack.Navigator>
  );
}
