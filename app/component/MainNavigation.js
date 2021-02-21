import React from 'react';
import {Alert} from 'react-native'
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import MapStackScreen from './MapStackScreen/MapStackScreen';
import UserInfoStackScreen from './UserInfoStackScreen/UserInfoStackScreen';
import FavouriteScreen from './FavouriteScreen';
import UserDetailScreen from './UserInfoStackScreen/UserDetailScreen';
import ShareLocationStackScreen from './ShareScreenStack/ShareLocationStackScreen';
import SettingScreen from './SettingsScreen'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainNavigation() {

    const data = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Map') {
                            iconName = 'explore'
                        }

                        if (route.name === 'Share') {
                            iconName = 'share';
                        }

                        if(route.name === 'Favourite'){
                            iconName = 'favorite'
                        }

                        if(route.name === 'UserInfo'){
                            iconName = 'face'
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                }
                )}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Map" component={MapStackScreen}/>
                <Tab.Screen
                    name="Share"
                    component={data ? ShareLocationStackScreen : UserInfoStackScreen}
                />
                <Tab.Screen
                    name="Favourite"
                    component={data ? FavouriteScreen : UserInfoStackScreen }

                />
                <Tab.Screen name="UserInfo" component={data ? UserDetailScreen : UserInfoStackScreen} />
                <Tab.Screen name="TestScreen" component={SettingScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;
