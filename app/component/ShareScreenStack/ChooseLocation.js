import React ,{useState,useEffect} from 'react';
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
    TextInput
} from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator , useIsDrawerOpen} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
var {height, width} = Dimensions.get('window');

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
    map: {
        width:width,
        height:'94%'
    },
});

function ChooseLocation({ navigation })  {
    const [region, setLag] = useState({
        latitude: 33.33333,
        longitude: -144.01234,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [MarkerCoords, setMarkerCoords] = useState({
        latitude: 33.33333,
        longitude: -144.01234,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    // const [defaultMarker, setMarker] = useState('../assets/images/MapMarker/DefaultMarker.png');

    //for the first time inital loccation
    useEffect(()=>{
        Geolocation.getCurrentPosition(
            (currentLocation) => {
                console.log("inside useEffect");
                console.log("Logging the current ShareScreen");
                console.log(currentLocation.coords);
                setMarkerCoords({
                    ...MarkerCoords,
                    latitude:currentLocation.coords.latitude,
                    longitude:currentLocation.coords.longitude
                })
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout:50000, maximumAge:20000},
        );
    },[])

    //trigger when marker coords changed
    useEffect(()=>{
        console.log('Marker Coords Updated');
        console.log(MarkerCoords);
    },[MarkerCoords])



    const check =()=>{
        console.log(MarkerCoords);
    }

    const change=(item)=>{
        console.log(item);
        // setMarkerCoords({
        //     ...MarkerCoords,
        //     latitude:item.latitude,
        //     longitude: item.longitude
        //
        // })
        setLag(...region,{
            latitude:item.latitude,
            longitude: item.longitude
                }
            )
    }
    return (
    <View>
        <MapView style={styles.map}
                 // showsUserLocation={true}
                 //followsUserLocation={true}
                 region={MarkerCoords}
                 >
            <Marker
                draggable={true}
                coordinate={{latitude:MarkerCoords.latitude, longitude:MarkerCoords.longitude}}
                title={'Marker'}
                description={'New Point Here'}
                onDragEnd={(e) => {
                    setMarkerCoords(
                        {
                            latitude:e.nativeEvent.coordinate.latitude,
                            longitude:e.nativeEvent.coordinate.longitude
                         },
                        )
                }}>
                <Image source={require('../../assets/images/MapMarker/map_marker.png')} style={{ width:30, height: 30 }} />
            </Marker>
        </MapView>

        <View style={{borderWidth:2, position:'absolute',width:'80%',height:'5%',alignSelf:'center',
            backgroundColor:'#FFFFFF',marginTop:10}}>
            <TextInput style={{fontsize:50}} placeholder={'Search'}>
            </TextInput>

        </View>

        <Button onPress={(e) => {navigation.navigate('Share')}} title={'Finish'}></Button>
    </View>
    );
}
export default ChooseLocation
