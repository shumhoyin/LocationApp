import React from 'react';
import 'react-native-gesture-handler';
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
      <Stack.Screen name="RegisterSuccessScreen" component={RegisterSuccessScreen}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}
