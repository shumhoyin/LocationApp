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

function GiveCommentSuccess(props) {
    console.log(props.route.params)
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 3}}>
                <Text>Give Comment Success</Text>
                <View>

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('DetailScreen',props.route.params)
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

export default GiveCommentSuccess;
