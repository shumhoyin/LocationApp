import React,{useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions,Text,TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
    Container: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: Dimensions.get('window').height / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        width: 50,
    },
});

function GoogleButton() {

    return(
        <TouchableOpacity style={styles.Container}>
            <View style={styles.iconStyle}>
                <Entypo name='google-' size={25} color="#666" />
            </View>
            <Text style={{
                fontWeight: 'bold',
                color: 'blue',
                alignItems: 'center',}}>
                Sign In With Google
            </Text>
        </TouchableOpacity>
    );
}

export default GoogleButton;
