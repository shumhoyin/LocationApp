import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';
import 'react-native-gesture-handler';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createDrawerNavigator , useIsDrawerOpen} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                // onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}
