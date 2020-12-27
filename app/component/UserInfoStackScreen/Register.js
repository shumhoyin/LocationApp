import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
var {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import {registerUserRequest} from '../../redux';
const styles = StyleSheet.create({
  UserIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    margin: 7,
  },
});

function Register(props) {
  const [UserObj, setUserObj] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    userPassword: '',
    reEnteredPassword: '',
    email: '',
  });

  //for checking only
  useEffect(() => {
    console.log(JSON.stringify(props));
  }, []);

  const goConfirmPage = () => {
    console.log(UserObj);
    props.navigation.navigate('ConfirmPage', UserObj);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <Text>First Name :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, firstName: text})}
          value={UserObj.firstName}
        />

        <Text>Last Name :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, lastName: text})}
          value={UserObj.lastName}
        />
        <Text>{UserObj.lastName}</Text>

        <Text>UserName :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, userName: text})}
          value={UserObj.userName}
        />
        <Text stykle={{marginBottom: 20}}>{UserObj.userName}</Text>

        <Text>Password :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, userPassword: text})}
          value={UserObj.userPassword}
        />
        <Text>{UserObj.userPassword}</Text>

        <Text>Re Enter Password :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) =>
            setUserObj({...UserObj, reEnteredPassword: text})
          }
          value={UserObj.reEnteredPassword}
        />
        <Text>{UserObj.reEnteredPassword}</Text>

        <Text>E-mail :</Text>
        <TextInput
          style={{height: 40, borderColor: 'black', borderWidth: 1}}
          onChangeText={(text) => setUserObj({...UserObj, email: text})}
          value={UserObj.email}
        />
        <Text>{UserObj.email}</Text>

        {/*doing validation */}
        <TouchableOpacity onPress={goConfirmPage}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Next Step
          </Text>
        </TouchableOpacity>

        {/*test redux implementation */}
        <TouchableOpacity onPress={() => props.registerUserRequest(UserObj)}>
          <Text
            style={{
              fontSize: 20,
            }}>
            test
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserRequest: (UserObj) => dispatch(registerUserRequest(UserObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
