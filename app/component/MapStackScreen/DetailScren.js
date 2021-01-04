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
  Alert,
  TouchableHighlight,
} from 'react-native';
import 'react-native-gesture-handler';
import StarImage from '../../assets/images/PlacesImage/star.png';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector,useDispatch} from 'react-redux';

import samplecomment from '../../assets/sampleComments/MOCK_DATA.json';
import axios from 'axios';

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
    // backgroundColor: "pink",
    borderWidth: 5,
    borderRadius: 15,
    margin: 5,
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
  const data = useSelector(state =>state.user.user);
  const [defaultPlaceImage, setPlaceImage] = useState(null);

  const [comment, setComment] = useState(samplecomment);


  //this method .. need to think think
  // console.log("inside deatil screen");
  // console.log(props.route.params.detailId)
  // axios.get('http://localhost:3001/api/Location/GetDetail')
  //     .then(res=>{
  //       console.log(res.data.payload);
  //     })
  //     .catch(err=>{
  //       console.log(err.message);
  //     })
  //

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>

        <View style={styles.ImageViewStyle}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              borderRadius: 15,
            }}
            source={{uri: 'http://localhost:3001/locationImg/test.jpg'}}
          />
        </View>
        {/*Place Info Field    ----> using api to fetch data later*/}
        <View style={styles.ImageInfoStyle}>
          <Text style={{flex: 1, margin: 10, fontSize: 15}}>
            Place Name: AAB Budiling {'\n'}
            Place Location: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx {'\n'}
            Rating :{' '}
            <Rating
              imageSize={40}
              type="custom"
              startingValue={3.3}
              readonly={true}
            />{' '}
            {'\n'}
            Published by User01
          </Text>
        </View>
        {/*Description Field  ----> using api to fetch data later*/}
        <View style={styles.PlaceDescription}>
          <Text style={{flex: 1, margin: 10, fontSize: 15}}>
            Description {'\n'}
          </Text>
          <Text style={{flex: 1, margin: 10, fontSize: 15}}>
            niodhofuhgohohoihgoihdaif
          </Text>
        </View>
        {/*Comment Field    ----> using api to fetch data later*/}
        <View style={styles.PlaceCommentArea}>
          <Text style={{flex: 1, margin: 10, fontSize: 15}}>
            Comments({comment.length}): {'\n'}{' '}
          </Text>

          {comment.slice([0], [5]).map((item, idx) => (
            <View key={idx} style={{margin: 10, borderWidth: 2}}>
              <Text numberOfLine={1}>Username: {item.first_name}</Text>
              <Text numberOfLine={1}>Gender: {item.gender}</Text>
              <Text numberOfLine={1}>Post Date: {item.post_date}</Text>
              <Text>Content: {item.content}</Text>
            </View>
          ))}
        </View>

        <TouchableHighlight
          onPress={() => {

              data ?
                  props.navigation.navigate('CommentScreen',{detailId:props.route.params.detailId})
                  :
                  props.navigation.navigate('UserInfo')

          }}>
          <View style={styles.CommentsButton}>
            <Text>Give Your Comments</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailScreen;
