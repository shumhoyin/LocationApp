import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Dimension, Dimensions,SafeAreaView} from 'react-native';
import React,{useState} from 'react';
import InputBox from './UserInfoStackScreen/component/InputBox'
import FacebookButton from './UserInfoStackScreen/component/FacebookButton';
import GoogleButton from './UserInfoStackScreen/component/GoogleButton';
import { Avatar , Accessory} from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {logoutUserRequest} from '../redux';

import{ useSelector,useDispatch} from 'react-redux';

const styles = StyleSheet.create({
    container:{
        margin:20,
        borderWidth:2,
        borderColor:'red',
        borderRadius:10,
        flex:1,
        backgroundColor:'white'
    }
});

export default function SettingsScreen({navigation}) {

    const data = useSelector((state)=>state.user.user)
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#EAEDED'}}>
            <View style={styles.container}>
                    <View style={{paddingTop:30,alignItems:'center'}}>
                        <Avatar
                            rounded = {true}
                            size={100}
                            activeOpacity={0.7}
                            containerStyle={{backgroundColor:'#D5DBDB'}}
                            icon={{name: 'user', type: 'antdesign',color:'black'}}
                        >
                            <Accessory size={35} onPress={()=>{console.log("hi")}}/>
                        </Avatar>
                        <View style={{paddingTop:20}}>
                            <Text style={{fontWeight:'bold',fontSize:35}}>{data.firstName} {data.lastName}</Text>
                            <Text></Text>
                        </View>

                    </View>

                    <View style={{flexDirection: 'row',paddingTop:30,paddingLeft:20}}>
                        <Text style={{fontSize:20}}>UserName</Text><AntDesign size={25} name='user'/>
                    </View>

                    <View style={{borderRadius:50,width:'50%',height:50,alignItems:'center',flexDirection: 'row' ,backgroundColor:'#D6EAF8',paddingLeft:20}}>
                        <Text style={{fontSize:15}}>{data.userName}</Text>
                    </View>

                    <View style={{flexDirection: 'row',paddingTop:30,paddingLeft:20}}>
                        <Text style={{fontSize:20}}>Email</Text><MaterialIcons size={25} name='email'/>
                    </View>

                    <View style={{borderRadius:50,height:50,alignItems:'center',flexDirection: 'row' ,backgroundColor:'#D6EAF8',paddingLeft:20}}>
                        <Text style={{fontSize:15}}>{data.email}</Text>
                    </View>

                    <View style={{borderColor:'#F2F3F4',borderWidth:1,margin:10}}/>

                    <View>
                        <TouchableOpacity onPress={()=>{dispatch(logoutUserRequest)}} style={{opacity:20,justifyContent:'center',height:40,backgroundColor:'#82E0AA',margin:10,borderRadius:50}}>
                            <Text style={{textAlign:'center',fontSize:20}}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
}




