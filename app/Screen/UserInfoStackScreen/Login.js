import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import 'react-native-gesture-handler';
import {loginUserRequest, logoutUserRequest} from '../../redux';
import InputBox from './component/InputBox';
import {useSelector, useDispatch} from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
  },
});

function Login({navigation}) {
  const [UserObj, setUserObj] = useState({userName: '', userPassword: ''});
  const [isEmpty, setIsEmpty] = useState({
    userName: false,
    userPassword: false,
  });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const successCallback = () => {
        navigation.navigate('Map');
  };

  useEffect(()=>{
    return setLoading(false);
  }, []);



  const FailureCallback = (msg) => {
    setTimeout(() => {
      setLoading(false);
      alert(msg);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}>
          <LoadingSpinner />
        </View>
      ) : (
        <View />
      )}
      <View style={{...styles.Container, backgroundColor: 'steelblue'}}>
        <Text style={{fontSize: 40}}>Login</Text>
        <Text>UserName :</Text>
        <InputBox
          iconType="user"
          type="text"
          DisplayValue={UserObj.userName}
          onChangeText={(username) =>
            setUserObj({...UserObj, userName: username})
          }
          isEmpty={isEmpty.userName}
        />

        <Text>Password :</Text>
        <InputBox
          iconType="lock"
          type="password"
          DisplayValue={UserObj.userPassword}
          onChangeText={(password) =>
            setUserObj({...UserObj, userPassword: password})
          }
          secureTextEntry={true}
          isEmpty={isEmpty.userPassword}
        />

        {/*doing validation */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: '100%',
            height: Dimensions.get('window').height / 15,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            backgroundColor: '#0000FF',
          }}
          onPress={() => {
            if (UserObj.userName === '') {
              alert('Please Enter Username !');
              setIsEmpty({...isEmpty, userName: true});
              return;
            } else if (UserObj.userPassword === '') {
              alert('Please Enter Password !');
              setIsEmpty({...isEmpty, userPassword: true});
              return;
            } else {
              setLoading(true);
              setIsEmpty({
                userName: false,
                userPassword: false,
              });

              dispatch(
                loginUserRequest(UserObj, successCallback, FailureCallback),
              );
            }
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
