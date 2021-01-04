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
import {Picker} from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseLocation from './ChooseLocation';
import Geolocation from '@react-native-community/geolocation';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';

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
  const data = useSelector(state =>state.user.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [LocationInfo, setLocationInfo] = useState({
    locationName:'',
    description:'',
    latitude:null,
    longitude:null,
    type:'',
    uploadedBy:data._id,
   // image: null,
  });


  useEffect(()=>{
    console.log(LocationInfo)
  },[LocationInfo])


  const locate = ()=>{
    Geolocation.getCurrentPosition(
        (currentLocation) => {
          setLocationInfo({
            ...LocationInfo,
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
        },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 50000, maximumAge: 20000},
    );
  }



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
        //later use
        // setLocationInfo({...LocationInfo,image:response.uri})
      }
    });
  };

  const testSubmit =()=>{
    console.log(LocationInfo);
    axios.post('http://localhost:3001/api/Location/ShareLocation',LocationInfo)
        .then(res=>{
          console.log(res.data);
          navigation.navigate('ShareSuccessScreen')
        })
        .catch(err=>{
          console.log(err.message);
        })

  }

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
              onChangeText={(text) => setLocationInfo({...LocationInfo,locationName:text})}
              value={LocationInfo.locationName}
            />
          </View>

          <View style={styles.LocationDesciption}>
            <Text>Location Desciption</Text>
            {/*All View box will be replaced after data fetch stage*/}
            <Text>Desciption:</Text>
            <TextInput
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              onChangeText={(text) => setLocationInfo({...LocationInfo,description:text})}
              value={LocationInfo.description}
            />
          </View>




          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => locate()}>
              <Text
                style={{
                  fontSize: 20,
                }}>
                Click to Locate your position
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.LocationDesciption}>
            <Text>lagtitude</Text>

            <Text>{LocationInfo.latitude}</Text>
            <Text>longitude</Text>

            <Text>{LocationInfo.longitude}</Text>

          </View>

          <View style={{alignItems:'center'}}>
            <Text>Type</Text>
            <Picker
                selectedValue={LocationInfo.type}
                style={{width:'70%'}}
                onValueChange={(itemValue, itemIndex) => setLocationInfo({...LocationInfo,type:itemValue})}>
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Meals" value="Meals" />
            </Picker>
          </View>



          {/*upload image area 1*/}
          <View
            style={{
              alignItems: 'center',
              padding: 50,
              borderColor: '#ff0000',
              borderWidth: 5,
              borderStyle: 'dashed',
              height: 300,
              // justifyContent: 'center',
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

          <View>
            <Button title={'Button'} onPress={()=>testSubmit()}> </Button>
          </View>
          {/*<View style={{alignItems: 'center'}}>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => {*/}
          {/*      props.navigation.navigate('ChooseLocation');*/}
          {/*    }}>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        fontSize: 20,*/}
          {/*      }}>*/}
          {/*      {' '}*/}
          {/*      Click to Select Location*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


export default ShareScreen;
