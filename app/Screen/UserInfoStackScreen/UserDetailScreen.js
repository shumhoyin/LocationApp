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
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {logoutUserRequest} from '../../redux';
import {Avatar, ListItem} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {changeUserIconRequest} from '../../redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {RNS3} from 'react-native-aws3';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    flex: 1,
    backgroundColor: 'white',
    shadowOffset: {height: 10, width: 5},
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
});

function UserDetailScreen() {
  const data = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const [Loading, setLoading] = useState(true);

  const bottomSheetOptions = [
    {
      title: 'Take photo from Camera',
      titleStyle: {color: 'black'},
      onPress: () => alert(),
    },
    {
      title: 'Take photo from Album',
      titleStyle: {color: 'black'},
      onPress: () => {
        takePhotoFromLibrary();
      },
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'black'},
      onPress: () => setVisible(false),
    },
  ];

  const successCallback = () => {
    Alert.alert('Logout Success');
    navigation.navigate('Map');
  };

  const changeIconSuccessCallback = () => {
    setVisible(false);
    Alert.alert('Icon Successfully Changed');
  };

  const takePhotoFromLibrary = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 700,
      maxHeight: 300,
    };
    launchImageLibrary(options, (response) => {
        dispatch(
            changeUserIconRequest(response, data._id, changeIconSuccessCallback)
        )
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEDED'}}>
      <View style={styles.container}>

        <View style={{ flexDirection: "row",justifyContent:'flex-end'}}>
          <Icon.Button
            name="edit"
            size={30}
            color={'black'}
            backgroundColor={'rgba(0,0,0,0)'}/>
        </View>

        <View style={{paddingTop: 30, alignItems: 'center'}}>
          {data.userIcon ? (
            <Avatar
              rounded={true}
              size={120}
              activeOpacity={0.7}
              source={{
                uri: data.userIcon,
              }}>
              <Avatar.Accessory
                size={35}
                onPress={() => {
                  setVisible(true);
                }}
              />
            </Avatar>
          ) : (
            <Avatar
              rounded={true}
              size={120}
              activeOpacity={0.7}
              containerStyle={{backgroundColor: '#D5DBDB'}}
              icon={{name: 'user', type: 'antdesign', color: 'black'}}>
              <Avatar.Accessory
                size={35}
                onPress={() => {
                  setVisible(true);
                }}
              />
            </Avatar>
          )}

          <View style={{paddingTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 35}}>
              {data.firstName} {data.lastName}
            </Text>
            <Text />
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingTop: 30, paddingLeft: 20}}>
          <Text style={{fontSize: 20}}>UserName</Text>
          <AntDesign size={25} name="user" />
        </View>

        <View
          style={{
            borderRadius: 50,
            width: '50%',
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#D6EAF8',
            paddingLeft: 20,
          }}>
          <Text style={{fontSize: 15}}>{data.userName}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingTop: 30, paddingLeft: 20}}>
          <Text style={{fontSize: 20}}>Email</Text>
          <MaterialIcons size={25} name="email" />
        </View>

        <View
          style={{
            borderRadius: 50,
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#D6EAF8',
            paddingLeft: 20,
          }}>
          <Text style={{fontSize: 15}}>{data.email}</Text>
        </View>

        <View style={{borderColor: '#F2F3F4', borderWidth: 1, margin: 10}} />

        <View>
          <TouchableOpacity
            onPress={() => {
              dispatch(logoutUserRequest(successCallback));
            }}
            style={{
              opacity: 20,
              justifyContent: 'center',
              height: 40,
              backgroundColor: '#82E0AA',
              margin: 10,
              borderRadius: 50,
            }}>
            <Text style={{textAlign: 'center', fontSize: 20}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
        {bottomSheetOptions.map((item, idx) => (
          <ListItem
            key={idx}
            containerStyle={item.containerStyle}
            onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
}

export default UserDetailScreen;
