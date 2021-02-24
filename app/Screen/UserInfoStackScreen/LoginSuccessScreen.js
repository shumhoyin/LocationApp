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
    UserIcon: {
        width: 150,
        height: 150,
        position: 'absolute',
        margin: 7,
    },
});

function LoginSuccessScreen({navigation}) {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 3, backgroundColor: 'steelblue'}}>
                <Text>Login Success</Text>
                <View>
                    {/*doing validation */}
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Map');
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                            }}>
                            Go to Map
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginSuccessScreen;
