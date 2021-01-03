import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

var {height, width} = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
  map: {
    width: width,
    height: '100%',
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: '#FF6347',
    borderWidth: 1,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

function MapScreen({navigation}) {
  //setting inital place
  const [region, setLag] = useState({
    latitude: 33.33333,
    longitude: -144.01234,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0521,
  });

  const mapIndex = 0;
  let mapAnimaton = new Animated.Value(0);

  //sample data fo marker
  const [coordinates, setCooordinates] = useState([
    {
      title: 'Burger',
      latitude: 37.8025259,
      longitude: -122.4351431,
      image: require('../../assets/images/samplephoto/testphoto1.jpg'),
    },
    {
      title: 'Pizza',
      latitude: 37.7946386,
      longitude: -122.421646,
      image: require('../../assets/images/samplephoto/testphoto2.jpg'),
    },
    {
      title: 'Soup',
      latitude: 37.7665948,
      longitude: -122.4165628,
      image: require('../../assets/images/samplephoto/testphoto3.jpg'),
    },
    {
      title: 'Sushi',
      latitude: 37.7834153,
      longitude: -122.4527787,
      image: require('../../assets/images/samplephoto/testphoto4.jpg'),
    },
    {
      title: 'Curry',
      latitude: 37.79489,
      longitude: -122.4596065,
      image: require('../../assets/images/samplephoto/testphoto5.jpg'),
    },
  ]);

  //when the apps start, it will happen (conponent did mounted)
  //run first times only
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (currentLocation) => {
        console.log('inside useEffect');
        console.log('Logging the current ShareScreen');
        console.log(currentLocation.coords);
        setLag({
          ...region,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 50000, maximumAge: 20000},
    );
  }, []);

  // const CheckLocation = () => {
  //   setInterval(() => {
  //     Geolocation.getCurrentPosition(
  //       (currentLocation) => {
  //         console.log(currentLocation.coords);
  //         alert(currentLocation.coords);
  //       },
  //       (error) => console.log(error),
  //       {enableHighAccuracy: true},
  //     );
  //     return () => {};
  //   }, 10000);
  // };

  //for the marker animation
  const interpolations = coordinates.map((marker, idx) => {
    const scale = mapAnimaton.interpolate({
      inputRange: [
        (idx - 1) * CARD_WIDTH,
        idx * CARD_WIDTH,
        (idx + 1) * CARD_WIDTH,
      ],
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  const testSubmit =() =>{
    console.log('inside search');
    axios.get('http://localhost:3001/api/Location/GetAll')
        .then(res=>{
          console.log(res.data.payload);
        })
        .catch(err=>{
          console.log(err.message);
        })
  }

  return (
    <View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        region={region}
        // onRegionChange={
        //     (region)=>console.log(region)
        // }
        onPress={(e) => {
          console.log(e.nativeEvent.coordinate);
        }}
        maxZoomLevel={20}>
        {
          coordinates.map((item, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={item.title}
              onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/images/MapMarker/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
        />
        <Button title="Search" style={{size: 10}} onPress={()=>testSubmit()}>
          {' '}
        </Button>
        {/*<Ionicons name="ios-search" size={20} />*/}
      </View>
      {
        coordinates && (
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showHorizontalScrollInicator={false}
          style={styles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimaton,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          {
            coordinates.map((item, idx) => (
            <View style={styles.card} key={idx}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {item.title}
                </Text>
                <Text nubmerOfLines={1} style={styles.cardDescription}>
                  Latitude:{item.latitude}
                </Text>
                <Text nubmerOfLines={1} style={styles.cardDescription}>
                  Longitude:{item.longitude}
                </Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      navigation.navigate('DetailScreen', {name: 'test'});
                    }}>
                    <Text style={styles.textSign}> Understand more </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
}

export default MapScreen;
