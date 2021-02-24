import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';

const styles = StyleSheet.create({
});

function ShareSuccessScreen({navigation}) {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 3}}>
                <Text>Share Success</Text>
                <View>

                    <TouchableOpacity onPress={() => {
    navigation.navigate('Map')
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                            }}>
                            Go to Back To Detail Screen
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ShareSuccessScreen;
