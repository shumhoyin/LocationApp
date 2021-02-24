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
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import LoadingSpinner from '../LoadingSpinner';

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

function DetailScreen(props) {
  const data = useSelector((state) => state.user.user);
  const [detail, setDetail] = useState({});

  //state for loading spinner
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      axios
        .get('http://localhost:3001/api/Location/GetDetail', {
          params: {LocationId: props.route.params.LocationId},
        })
        .then((res) => {
          setLoading(false);
          setDetail(res.data.payload);
          console.log(res.data.payload);
        });

      //clean up action
      return () => console.log('exit deatil screen');
    }, []),
  );

  const needSignIn = () => {
    alert('Please Login to Give Comment');
    props.navigation.navigate('UserInfo');
  };

  const addFavouriteList = () => {
    console.log(data._id);
    console.log(detail._id);

    let postData = {
      user_id: data._id,
      location_id: detail._id,
    };

    axios
      .post('http://localhost:3001/api/User/AddToFavouriteList', postData)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  const GiveLike = () => {
    let reqBody = {
      detailId: props.route.params.detailId,
      user_id: data._id,
    };
    setLoading(true);
    console.log(reqBody);
    axios
      .post('http://localhost:3001/api/Location/GiveLike', reqBody)
      .then((res) => {
        setLoading(false);
        console.log(res.data.payload);
        if (res.data.resCode === 0) {
          alert(res.data.message);
        } else {
          setDetail({
            ...detail,
            locationDetail: {
              ...detail.locationDetail,
              like: res.data.payload.like,
              dislike: res.data.payload.dislike,
            },
          });
        }
      });
  };

  const GiveDislike = () => {
    let reqBody = {
      detailId: props.route.params.detailId,
      user_id: data._id,
    };
    setLoading(true);
    axios
      .post('http://localhost:3001/api/Location/GiveDislike', reqBody)
      .then((res) => {
        setLoading(false);
        console.log(res.data.payload);
        if (res.data.resCode === 0) {
          alert(res.data.message);
        } else {
          setDetail({
            ...detail,
            locationDetail: {
              ...detail.locationDetail,
              like: res.data.payload.like,
              dislike: res.data.payload.dislike,
            },
          });
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
            backgroundColor: '#e0e0ebaa',
          }}>
          <LoadingSpinner />
        </View>
      ) : (
        <View />
      )}
      {/*for loading spinner*/}
      <ScrollView>
        <View style={styles.ImageViewStyle}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              borderRadius: 15,
            }}
            source={{uri: detail.image}}
          />
        </View>

        <View>
          <TouchableHighlight onPress={() => addFavouriteList()}>
            <View style={styles.CommentsButton}>
              <Text>add to favourite list</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight onPress={() => GiveLike()}>
            <View style={styles.CommentsButton}>
              <Text>Thumbs Up !</Text>
            </View>
          </TouchableHighlight>
        </View>


          <TouchableHighlight onPress={() => GiveDislike()}>

            <View style={styles.CommentsButton}>
              <Text>Thumbs Down !</Text>
            </View>
          </TouchableHighlight>


        <View style={styles.ImageInfoStyle}>
          <Text style={{flex: 1, margin: 5, fontSize: 15}}>
            {' '}
            Location Name : {detail.locationName}{' '}
          </Text>

          {detail.locationDetail && (
            <Text style={{flex: 1, margin: 5, fontSize: 15}}>
              {' '}
              Like: {detail.locationDetail.like}{' '}
            </Text>
          )}

          {detail.locationDetail && (
            <Text style={{flex: 1, margin: 5, fontSize: 15}}>
              {' '}
              DisLike: {detail.locationDetail.dislike}{' '}
            </Text>
          )}

          {detail.uploadedBy && (
            <Text style={{flex: 1, margin: 5, fontSize: 15}}>
              {' '}
              Suggested By: {detail.uploadedBy.userName}{' '}
            </Text>
          )}
        </View>
        {/*Description Field  ----> using api to fetch data later*/}
        {detail.uploadedBy && (
          <View style={styles.PlaceDescription}>
            <Text style={{flex: 1, margin: 10, fontSize: 15}}>
              Description :{' '}
            </Text>
            <Text style={{flex: 1, margin: 10, fontSize: 15}}>
              {detail.locationDetail.description}{' '}
            </Text>
          </View>
        )}

        {/*Comment Field    ----> using api to fetch data later*/}
        <View style={styles.PlaceCommentArea}>
          <Text style={{margin: 5}}> Comments : </Text>
          <ScrollView>
            {detail.locationDetail &&
              detail.locationDetail.comments.map((item, idx) => (
                <View key={idx} style={{margin: 10, borderWidth: 2}}>
                  <Text numberOfLine={1}>
                    Username: {item.uploadedBy.userName}
                  </Text>
                  {/*<Text numberOfLine={1}>Gender: {item.gender}</Text>*/}
                  <Text numberOfLine={1}>Post Date: {item.createdAt}</Text>
                  <Text>Content: {item.content}</Text>
                </View>
              ))}
          </ScrollView>
        </View>

        <TouchableHighlight
          onPress={() => {
            data
              ? props.navigation.navigate('CommentScreen', {
                  detailId: props.route.params.detailId,
                })
              : needSignIn();
          }}
          style={styles.CommentsButton}
        >
          <Text>Give Your Comments</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailScreen;
