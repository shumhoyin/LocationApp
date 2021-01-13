import React, {useState, useEffect, useCallback} from 'react';
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
  Alert,
  TouchableHighlight,
} from 'react-native';
import 'react-native-gesture-handler';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const styles = StyleSheet.create({
  ImageViewStyle: {
    height: 300,
    flex: 1,
    // backgroundColor: "pink",
    borderWidth: 5,
    borderRadius: 20,
    margin: 5,
  },
  ImageInfoStyle: {
    flex: 1,
    // backgroundColor: "pink",
    borderWidth: 5,
    borderRadius: 15,
    margin: 5,
  },
  PlaceDescription: {
    flex: 1,
    // backgroundColor: "pink",
    borderWidth: 5,
    borderRadius: 15,
    margin: 5,
  },
  PlaceCommentArea: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 15,
    margin: 5,
    height: 300,
  },
  CommentsButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
});

function FavouriteScreen(props) {
  const data = useSelector((state) => state.user.user);
  const [detail, setDetail] = useState(null);

  useFocusEffect(
    useCallback(() => {
      console.log(data._id);
      axios
        .get('http://localhost:3001/api/User/GetUserFavouriteList', {
          params: {user_id: data._id},
        })
        .then((res) => {
          setDetail(res.data.payload);
        });
      //clean up action
      return () => console.log('exit favourite screen');
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {detail ? (
          detail.map((itm, idx) => {
            return (
              <View>
                <Text> {itm.locationName}</Text>
              </View>
            );
          })
        ) : (
          <View>
            <Text>nothing</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FavouriteScreen;
