import React, {useState, useEffect} from 'react';
import {
  TextInput,
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
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux';

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

function CommentScreen(props) {

  const data = useSelector(state =>state.user.user);

  const [content, setContent] = React.useState({
    uploadedBy:data._id,
    data:'',
    detailId:props.route.params.detailId,
  });

useEffect(()=>{
  //call api
  console.log(props.route.params)
  return
      console.log('component killed')

},[])

  const SuccessCallback =()=>{
    props.navigation.navigate('GiveCommentSuccess',props.route.params)
  }

  const submitComment =()=>{
  console.log(content)
    axios.post('http://localhost:3001/api/Location/GiveComment', content)
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err.message);
        })
   SuccessCallback();
  }

  return(
      <View>
        <SafeAreaView>
          <Text>Type your comments</Text>
          <TextInput
              style={{height:150,borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setContent({...content,data:text})}
              value={content.data}
              multiline={true}
          />
          <Button title={'Submit Comment'} onPress={()=>submitComment()}>
          </Button>
        </SafeAreaView>
      </View>
  );
}

export default CommentScreen;
