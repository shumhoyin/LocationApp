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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';

import RNPickerSelect from 'react-native-picker-select';
import {RNS3} from 'react-native-aws3';

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
  const data = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [LocationInfo, setLocationInfo] = useState({
    locationName: '',
    description: '',
    latitude: null,
    longitude: null,
    type: '',
    image: '',
    uploadedBy: data._id,
  });

  useEffect(() => {
    console.log(LocationInfo);
  }, [LocationInfo]);

  const locate = () => {
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
  };

  const takePhotoFromLibrary = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 700,
      maxHeight: 300,
    };
    launchImageLibrary(options, (response) => {
      console.log(response);
      setImage({
        ...image,
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
    });
  };

  const testSubmit = () => {
    //upload the image to s3 first
    const options = {
      keyPrefix: 'locationImg/',
      bucket: '2020fyp',
      region: 'ap-northeast-2',
      accessKey: 'AKIAIDYA54HCULXTGQRA',
      secretKey: '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',
      successActionStatus: 201,
    };

    RNS3.put(image, options)
      .progress((e) => console.log(e.percent))
      .then((response) => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image to S3');
        }
        console.log(response.body.postResponse.location);
        setLocationInfo({
          ...LocationInfo,
          image: response.body.postResponse.location,
        });

        //upload the whole infomation
        axios
          .post(
            'http://localhost:3001/api/Location/ShareLocation',
            LocationInfo,
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
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
              onChangeText={(text) =>
                setLocationInfo({...LocationInfo, locationName: text})
              }
              value={LocationInfo.locationName}
            />
          </View>

          <View style={styles.LocationDesciption}>
            <Text>Location Desciption</Text>
            {/*All View box will be replaced after data fetch stage*/}
            <Text>Desciption:</Text>
            <TextInput
              style={{height: 40, borderColor: 'black', borderWidth: 1}}
              onChangeText={(text) =>
                setLocationInfo({...LocationInfo, description: text})
              }
              value={LocationInfo.description}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => locate()}>
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

          <View
            style={{
              alignItems: 'center',
              height: 100,
              borderWidth: 2,
              backgroundColor: '#00ff00aa',
            }}>
            <Text>Type</Text>
            {/*<Picker*/}
            {/*  selectedValue={LocationInfo.type}*/}

            {/*  onValueChange={(itemValue, itemIndex) =>*/}
            {/*    setLocationInfo({...LocationInfo, type: itemValue})*/}
            {/*  }>*/}
            {/*  <Picker.Item label="Shopping" value="Shopping" />*/}
            {/*  <Picker.Item label="Entertainment" value="Entertainment" />*/}
            {/*  <Picker.Item label="Meals" value="Meals" />*/}
            {/*</Picker>*/}
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <RNPickerSelect
                style={{width: '70%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setLocationInfo({...LocationInfo, type: itemValue})
                }
                items={[
                  {label: 'Shopping', value: 'Shopping'},
                  {label: 'Entertainment', value: 'Entertainment'},
                  {label: 'Meals', value: 'Meals'},
                ]}
              />
            </View>
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
                  source={{uri: image.uri}}
                />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Button title={'Button'} onPress={() => testSubmit()}>
              {' '}
            </Button>
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
