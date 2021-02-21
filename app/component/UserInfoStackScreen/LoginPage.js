import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';

import FacebookButton from './component/FacebookButton';
import GoogleButton from './component/GoogleButton';

var {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 25,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    }
});

function LoginPage({navigation}) {
  return (
      <SafeAreaView>
          <ScrollView contentContainerStyle={styles.container}>
              <Image
                  source={require('../../assets/images/PlacesImage/fake_app_icon.png')}
                  style={styles.logo}
              />
              <Text style={styles.text}>Find What You Want</Text>
              <Text style={styles.text}>Share What You Want</Text>
              <Text style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#2e64e5',
              marginTop: 40
              }}>Already had an account ? </Text>
              <TouchableOpacity style={{
                  marginTop: 10,
                  width: '100%',
                  height: height/15,
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  backgroundColor: '#0000FF',
              }}
              onPress={()=>navigation.navigate('Login')}>
                  <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                  }}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navButton} onPress={() => {}}>
                  <Text style={{
                      fontSize: 18,
                      fontWeight: '500',
                      color: '#2e64e5'}}>Forgot Password?</Text>
              </TouchableOpacity>
              <FacebookButton/>
              <GoogleButton/>

              <TouchableOpacity
                  style={styles.forgotButton}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.navButtonText}>
                      Don't have an acount? Create here
                  </Text>
              </TouchableOpacity>


          </ScrollView>
      </SafeAreaView>
  );
}

export default LoginPage;
