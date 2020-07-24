import React, {Component} from 'react'
import {View, Image, FlatList, TouchableOpacity, Dimensions,Button, StyleSheet, Text} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {ActionSheet, Root} from "native-base";


const width = Dimensions.get('window').width;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
    }

  }

  renderItem = ({item, index}) => {
    let {itemViewImage, itemImage} = styles;

    return (
        <View style={itemViewImage}>
          <Image source={item.uri} style={itemImage}/>
        </View>
    );
  }
  


  componentDidMount() {
    this.getPermissionAsync();
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }    
    
  };



  

  onClickAddPicture = () => {
    const BUTTONS = ["Take Photo", "Choose from Library", 'Cancel'];
    ActionSheet.show(
        {options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo'},
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              this.takePhotoFromCamera();
              break;
            case 1:
              this.choosePhotoFromLibrary();
              break;
            default:
          }
        }
    )
  };

  choosePhotoFromLibrary() {
    ImagePicker.launchImageLibraryAsync({
      //mediaTypes: “image”,
      // width: 300,
      // height: 400,
      // cropping: true,
      // cropping: false,
      includeBase64: true,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7
    }).then(image => {
      console.log("Choose Photo Object: ", image);
      this.onSelectedImage(image)
    }).catch(error =>
        console.log("Choose Photo Error: ", error)
    );
  }

  takePhotoFromCamera() {
    ImagePicker.launchCameraAsync({
    //mediaTypes: “image”,
      // width: 300,
      // height: 400,
      // cropping: true,
      // cropping: false,
      includeBase64: true,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7
    }).then(image => {
      console.log("Take Photo Object: ", image);
      this.onSelectedImage(image)
    }).catch(error =>
        console.log("take Photo Error: ", error)
    );
  }

  onSelectedImage(image) {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      uri: source,
      content: image.data,
    };
    newDataImg.push(item);
    this.setState({fileList: newDataImg});
    <View style={styles.container}>
    <Button title="upload image.." onPress={this.uploadImage} />
    </View>

  }


  uploadImage = async (uri, newDataImg) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + newDataImg);
    return ref.put(blob);
  }



  

  render() {
    const {content, btnPressStyle} = styles;
    let {fileList} = this.state;
    return (
        <Root>
          <View style={content}>
            <Text>React Native Add Image</Text>
            <FlatList
                data={fileList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
            />
            <TouchableOpacity style={btnPressStyle} onPress={() => this.onClickAddPicture()}>
              <Text style={{color: '#fff'}}>Press me</Text>
            </TouchableOpacity>

          </View>
        </Root>
    );
  }

}
//export default FirebaseStorageUploader;

const styles = StyleSheet.create({
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 50,
    marginBottom: 30,
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    marginTop: 10
  },
  itemViewImage: {
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10
  },
  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: width - 60,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  btnPressStyle: {
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
});



