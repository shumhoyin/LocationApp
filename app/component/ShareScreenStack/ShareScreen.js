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
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
var {height, width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const ChooseLocationStack = createStackNavigator();
import ChooseLocation from './ChooseLocation';

const styles = StyleSheet.create({
  BasicInfoField: {
    flex: 1,
    // backgroundColor: "pink",
    borderWidth: 1,
    margin: 5,
  },
  LocationDesciption: {},
});

function ShareScreen({navigation}) {
  const [LocationName, setLocationName] = useState('');
  const [LocationDesc, setLocationDesc] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const testfunction = () => {
    console.log(!Object.values(image).some((element) => element !== null));
  };
  const takePhotoFromLibrary = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // setImage(response.uri);
        setImage(response.uri);
      }
    });
  };
  const takePhotoFromLibrary_2 = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        // setImage(response.uri);
        setImage2(response.uri);
      }
    });
  };
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.LocationDesciption}>
            <Text>Basic Information</Text>
            {/*All View box will be replaced after data fetch stage*/}
            <Text>Location Name :</Text>
            <TextInput
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              onChangeText={(text) => setLocationName(text)}
              value={LocationName}
            />
          </View>

          <View style={styles.LocationDesciption}>
            <Text>Location Desciption</Text>
            {/*All View box will be replaced after data fetch stage*/}
            <Text>Desciption:</Text>
            <TextInput
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              onChangeText={(text) => setLocationDesc(text)}
              value={LocationDesc}
            />
          </View>

          {/*upload image area 1*/}
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              borderColor: '#ff0000',
              borderWidth: 5,
              borderStyle: 'dashed',
              height: 300,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={takePhotoFromLibrary}>
              {image == null ? (
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  {' '}
                  Click to Upload an Image
                </Text>
              ) : (
                <Image
                  style={{
                    flex: 1,
                    width: 400,
                    height: 500,
                    resizeMode: 'contain',
                  }}
                  source={{uri: image}}
                />
              )}
            </TouchableOpacity>
          </View>

          {/*upload image 2 area*/}
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              borderColor: '#ff0000',
              borderWidth: 5,
              borderStyle: 'dashed',
              height: 300,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={takePhotoFromLibrary_2}>
              {image2 == null ? (
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  {' '}
                  Click to Upload an Image
                </Text>
              ) : (
                <Image
                  style={{
                    flex: 1,
                    width: 400,
                    height: 500,
                    resizeMode: 'contain',
                  }}
                  source={{uri: image2}}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChooseLocation');
              }}>
              <Text
                style={{
                  fontSize: 20,
                }}>
                {' '}
                Click to Select Location
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ShareScreen;
