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
  Platform,
  Modal,
  TouchableHighlight,
} from 'react-native';
import 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import Slider from '@react-native-community/slider';

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
  //style for filter modal:
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 350,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function MapScreen({navigation}) {
  //setting inital place
  const [region, setLag] = useState({
    latitude: 33.33333,
    longitude: -144.01234,
    latitudeDelta: 0.0211,
    longitudeDelta: 0.023,
  });

  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [condition, setCondition] = useState({
    distance: 10,
    type: '',
    keyword: '',
  });

  const mapIndex = 0;
  let mapAnimaton = new Animated.Value(0);

  //sample data fo marker
  const [coordinates, setCooordinates] = useState([]);

  //when the apps start, it will happen
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

  const Submit = () => {
    setLoading(true);
    setCooordinates([]);
    // console.log('inside search')
    const param = {
      ...condition,
      latitude: region.latitude,
      longitude: region.longitude,
    };
    axios
      .get('http://localhost:3001/api/Location/GetAll', {
        params: param,
      })
      .then((res) => {
        if (res.data.payload && res.data.payload.length) {
          setLoading(false);
          console.log(res.data.payload);
          setCooordinates(res.data.payload);
        } else {
          setLoading(false);
          alert('No Suitable Result');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <View>
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
      {/*for loading spinner*/}

      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={false}
        region={region}
        //add a initalregion
        onPress={(e) => {
          console.log(e.nativeEvent.coordinate);
        }}
        maxZoomLevel={20}>
        {coordinates.map((item, index) => {
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
              coordinate={{
                latitude: item.location.coordinates[1],
                longitude: item.location.coordinates[0],
              }}
              title={item.locationName}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          alert('closing modal');
          setVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter : </Text>

            <Text style={styles.modalText}>
              Range: {condition.distance} Meters
            </Text>

            <Slider
              style={{width: 200, height: 40}}
              minimumValue={10}
              maximumValue={3000}
              minimumTrackTintColor="#FF0000"
              maximumTrackTintColor="#00FFFF"
              onValueChange={(value) => {
                setCondition({...condition, distance: Math.round(value)});
              }}
              // onSlidingComplete = {(value)=>{setCondition({...condition,distance:Math.round(value)})}}
              value={condition.distance}
            />

            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                margin: 20,
              }}
              onPress={() => {
                setCondition({
                  distance: 10,
                  type: '',
                });
              }}>
              <Text style={styles.textStyle}>Clear</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setVisible(false);
                Submit();
              }}>
              <Text style={styles.textStyle}>Apply and search</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                margin: 20,
              }}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
          value={condition.keyword}
          onChangeText={(text) => setCondition(text)}
        />
        <Button
          title="Search"
          style={{size: 10}}
          onPress={() => setVisible(true)}
        />
        {/*<Ionicons name="ios-search" size={20} />*/}
      </View>

      {coordinates && (
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
          {coordinates.map((item, idx) => (
            <View style={styles.card} key={idx}>
              <Image
                source={{uri: item.image}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {item.locationName}
                </Text>
                <Text nubmerOfLines={1} style={styles.cardDescription}>
                  Latitude:{item.location.coordinates[1]}
                </Text>
                <Text nubmerOfLines={1} style={styles.cardDescription}>
                  Longitude:{item.location.coordinates[0]}
                </Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      //should be location id
                      navigation.navigate('DetailScreen', {
                        LocationId: item._id,
                        detailId: item.locationDetail,
                      });
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
