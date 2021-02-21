import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
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
          console.log(res.data.payload);
        });

      //clean up action
      return () => console.log('exit favourite screen');
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {detail && (
          detail.map((itm, idx) => {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  backgroundColor: '#FFFFFF',
                }}>
                <Image
                  source={{uri: itm.image}}
                  style={{
                    width: 100,
                    height: 100,
                    margin: 10,
                  }}
                />
                <View style={{margin: 10}}>
                  <Text>Name: {itm.locationName}</Text>
                  <Text>Type: {itm.type}</Text>
                  <Text>uploadedBy: {itm.uploadedBy.userName}</Text>
                  <Text>Like: {itm.locationDetail.like}</Text>
                  <Text>Dislike: {itm.locationDetail.dislike}</Text>
                </View>
              </View>
            );
          })
        )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default FavouriteScreen;
