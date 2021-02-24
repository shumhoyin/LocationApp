import React,{useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    inputContainer: {
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
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
});

function InputBox({iconType , type,DisplayValue,isEmpty,...rest}) {

    return(
        <View style={!isEmpty ? styles.inputContainer : {...styles.inputContainer,borderColor: 'red',borderWidth: 3} }>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#666" />
            </View>
            <TextInput
                value={DisplayValue}
                style={styles.input}
                numberOfLines={1}
                placeholder="username"
                placeholderTextColor="#666"
                autoCapitalize="none"
                type={type}
                {...rest}
            />
        </View>
    );
}

export default InputBox;
