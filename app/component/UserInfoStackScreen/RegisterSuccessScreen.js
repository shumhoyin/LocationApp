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

function RegisterSuccessScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>Register Success</Text>
        <View>
          {/*doing validation */}
          <TouchableOpacity onPress={() => {
          navigation.navigate('Login');
          }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Login Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RegisterSuccessScreen;
