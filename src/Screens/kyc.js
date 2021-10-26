import React from 'react';
import { View, BackHandler, TouchableOpacity, Modal, StyleSheet, AsyncStorage, TextInput, Image, Text, Platform, Dimensions, ScrollView, PermissionsAndroid, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
//import { TouchableOpacity } from 'react-native-gesture-handler';

import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { BASE_URL } from '../api';
//import * as ImagePicker from "react-native-image-picker"
var ImagePicker = require('react-native-image-picker');

export default class Kyc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      statename: '',
      city: '',
      gst: '',
      password: '',
      doctype: '',
      documentslist: [],
      fileUri: '',
      photo: '',
      uploadclicked: false,
      profileUri: '',
      type: '',
      modalVisible: false,
      cameraClicked: false,
      listofstateswithids: [],
      listofstates: [],
      listofcities: [],
      userid: '', //this.props.route.params.id
      profileimage: '',
      userid1: '',
      showmenu: false,
      profilename: '',
      showmodal: false,
      filename: '',
      showloader: false,
      otp: '',
      email: '',
    }
    this.backActionHandler = this.backActionHandler.bind(this);
  }

  async componentDidMount() {
    console.log('userid', this.state.userid)
    this.listofdocuments();
    this.getstate();

    await AsyncStorage.getItem('userid').then((userid) => {
      if (userid) {
        this.setState({ userid: userid });

      }
    });
    console.log('userid from async', this.state.userid);

    BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

    //   return () =>
    //     // clear/remove event listener
    //     BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

  }

  // backActionHandler = () => {
  //     BackHandler.exitApp();
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backActionHandler);
  }

  backActionHandler() {
    this.props.navigation.goBack(null);
    return true;
  }


  // setModalVisible = (visible) => {
  //     this.setState({modalVisible: visible});
  //   };

  // launchCamera = async () => {
  //     this.setState({ modalVisible: false,})
  //     let options = {
  //       storageOptions: {
  //         skipBackup: true,
  //         path: 'images',
  //       },
  //     };

  //     // const granted = await PermissionsAndroid.request(
  //     //   PermissionsAndroid.PERMISSIONS.CAMERA,
  //     //   {
  //     //     title: 'App Camera Permission',
  //     //     message: 'App needs access to your camera ',
  //     //     // buttonNeutral: "Ask Me Later",
  //     //     // buttonNegative: "Cancel",
  //     //     // buttonPositive: "OK"
  //     //   },
  //     // );

  //     // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       ImagePicker.launchCamera(options, (response) => {
  //         //console.log('Response = ', response);

  //         if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //         } else if (response.customButton) {
  //           console.log('User tapped custom button: ', response.customButton);
  //           alert(response.customButton);
  //         } else {
  //          // const source = { uri: response.assets[0] };
  //           console.log('photo', JSON.stringify(response));
  //           //console.log('profileimage',response)
  //          // console.log('profileimage',source)
  //           this.setState({
  //              profileimage: response.assets[0],
  //             // filePath: response,
  //             // fileData: response.data,
  //             profileUri: response.assets[0].uri,
  //             type: response.assets[0].type,
  //             cameraClicked: true,
  //             modalVisible: false,
  //           });

  //           //console.log('photo uri',this.state.profileUri)

  //         }
  //       });
  //     //}

  //   }

  launchCamera = async () => {
    this.setState({ modalVisible: false, })
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        // buttonNeutral: "Ask Me Later",
        // buttonNegative: "Cancel",
        // buttonPositive: "OK"
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // const source = { uri: response.uri };
          // console.log('photo', JSON.stringify(response));
          //console.log('profileimage respose',response)
          this.setState({
            // profileimage: response.assets[0],
            // filePath: response,
            // fileData: response.data,
            // profileUri: response.assets[0].uri,
            // type: response.assets[0].type,
            cameraClicked: true,
            //modalVisible: false,
            profileimage: response,
            profileUri: response.uri,
            profilename: response.fileName,
            // photo: response, 
            // uploadclicked: true
          });

          //console.log('photo uri',this.state.profileUri)

        }
      });
    }

  }





  launchImageLibrary = async () => {
    this.setState({ modalVisible: false, })
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: 'App Camera Permission',
    //     message: 'App needs access to your camera ',
    //     // buttonNeutral: "Ask Me Later",
    //     // buttonNegative: "Cancel",
    //     // buttonPositive: "OK"
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //const source = { uri: response.uri };
        // console.log('profileimage response', JSON.stringify(response.assets[0]));
        this.setState({
          //  profileimage:response.assets[0],
          // // filePath: response,
          // // fileData: response.data,
          // profileUri: response.assets[0].uri,
          // type: response.assets[0].type,
          // cameraClicked: true,
          cameraClicked: true,
          //modalVisible: false,
          profileimage: response,
          profileUri: response.uri,
          profilename: response.fileName,
          // photo: response, 
          // uploadclicked: true

        });

      }
    });
    //}
  };

  launchCamera1 = async () => {
    this.setState({ showmodal: false, })
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        // buttonNeutral: "Ask Me Later",
        // buttonNegative: "Cancel",
        // buttonPositive: "OK"
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // const source = { uri: response.uri };
          // console.log('photo', JSON.stringify(response));
          //console.log('profileimage respose',response)
          this.setState({
            fileUri: response.uri,
            filename: response.fileName,
            photo: response,
            uploadclicked: true
            // cameraClicked: true,
            // profileimage:response,
            // profileUri: response.uri, 
            // profilename:response.fileName,
            // photo: response, 

          });

          //console.log('photo uri',this.state.profileUri)

        }
      });
    }

  }





  launchImageLibrary1 = async () => {
    this.setState({ showmodal: false, })
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: 'App Camera Permission',
    //     message: 'App needs access to your camera ',
    //     // buttonNeutral: "Ask Me Later",
    //     // buttonNegative: "Cancel",
    //     // buttonPositive: "OK"
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //const source = { uri: response.uri };
        // console.log('profileimage response', JSON.stringify(response.assets[0]));
        this.setState({
          fileUri: response.uri,
          filename: response.fileName,
          photo: response,
          uploadclicked: true
          //  cameraClicked: true,
          // profileimage:response,
          // profileUri: response.uri, 
          // profilename:response.fileName,
          // photo: response, 


        });

      }
    });
    //}
  };

  uploadprofile = async () => {
    this.setState({ modalVisible: false, })
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log(
      //     res,
      //     res.uri,
      //     res.type, // mime type
      //     res.name,
      //     res.size
      // );
      console.log(res);
      this.setState({ profileUri: res.uri, profileimage: res, cameraClicked: true, })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error', err)
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }




  // Pick a single file

  uploaddocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res,
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      this.setState({ fileUri: res.uri, photo: res, uploadclicked: true })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error', err)
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  validategst = (text) => {
    console.log('gst----',text)
    console.log('gst length ---',text.length)
   // var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
   var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
   let gstnum =text
   if(gstnum.length ==15){
     console.log('inside ist if')
    if (regex.test(gstnum)) {
      alert("gst valid");
     // return regex.test(inputvalues);
     this.setState({gst:gstnum})
    }
    else {
      alert('Invalid gst number, please enter valid gst')
    }
  }
  }


  listofdocuments = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "register-documents/vendors", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        // let docs = result.data.map((myValue,myIndex)=>{
        //     console.log('========',myValue.document)
        //     return(
        //     <Picker.Item label={myValue.document} value={myValue.id} key={myIndex}/>
        //     )
        //     });
        //     this.setState({listofdocuments:docs})

        for (let i = 0; i < result.data.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.documentslist.push(result.data[i].document)
        }

        // // this.setState({documentslist:result})
        // console.log('list of', this.state.documentslist)

      })
      .catch(error => console.log('error', error));
  };

  getkyc = () => {

    if (this.state.address == '') {
      alert('The address field is required')
    } else if (this.state.statename == '') {
      alert('The state id field is required')
    } else if (this.state.city == '') {
      alert('The city id field is required')
    } else if (this.state.doctype == '') {
      alert('The doc type field is required')
    } else if (this.state.password == '') {
      alert('The password field is required')
    } else if (this.state.document == '') {
      alert('File not exists to upload. Plz try again')
    }

    // let formdata = new FormData();
    //   formdata.append("address", this.state.address);
    //   formdata.append("state_id", this.state.statename);
    //   formdata.append("city_id", this.state.city);
    //   formdata.append("gst", this.state.gst);
    //   formdata.append("password", this.state.password);
    //   formdata.append("doc_type", this.state.doctype);
    //   formdata.append("document", this.state.photo);

    var formdata = new FormData();
    formdata.append("address", this.state.address);
    formdata.append("state_id", this.state.statename);
    formdata.append("city_id", this.state.city);
    formdata.append("gst", this.state.gst);
    formdata.append("password", this.state.password);
    formdata.append("doc_type", this.state.doctype);
    formdata.append("document", this.state.photo);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL + "upgrade-kyc/" + this.state.userid, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === 1) {
          this.props.navigation.navigate('Login')
        } else if (result.error) {
          alert(result.error)
        }
      })
      .catch(error => console.log('error', error));
  }


  kyccomplete = () => {

    this.setState({ showloader: !this.state.showloader })
    console.log('userid', this.state.userid)

    // this.updateprofileimage();

    var formdata = new FormData();
    formdata.append("address", this.state.address);
    formdata.append("state_id", this.state.statename);
    formdata.append("city_id", this.state.city);
    formdata.append("gst", this.state.gst);
    formdata.append("otp", this.state.otp);
    formdata.append("password", this.state.password);
    formdata.append("doc_type", this.state.doctype);
    formdata.append("document", { type: this.state.photo.type, uri: this.state.photo.uri, name: this.state.photo.fileName });

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://romegamart.com/api/upgrade-kyc/" + this.state.userid, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('kyc', result)

        if (result.status === 1) {
          this.updateprofileimage();
          //this.uploadprofile();
        }
      })
      .catch(error => console.log('error', error));
  }

  createFormData = (photo) => {
    // console.log('formdata')
    //console.log('photo======',photo)
    //console.log('photo-------',this.state.profileimage)
    const data = new FormData();
    data.append('profile', {                 //this.renderSwitch()   //photo.fileName.replace('.', ''), {
      name: photo.fileName,
      type: photo.type,
      // size:photo.fileSize,
      uri: Platform.OS === 'android' ? this.state.profileimage.uri : this.state.profileimage.uri.replace('file://', '')
    });
    //  Object.keys(body).forEach((key) => {
    //    data.append(key, body[key]);
    //  });
    return data;
  };

  profileimageupdate = () => {
    var formdata = new FormData();
    //formdata.append("user_id", this.state.userid);
    formdata.append("profile_image", this.state.profileimage);

    //console.log('formdata----',formdata)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      //body:this.createFormData(this.state.profileimage,{"user_id": this.state.userid}),
      redirect: 'follow'
    };

    fetch("https://romegamart.com/api/user-profileImage-Update/" + this.state.userid, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === 1) {
          this.props.navigation.navigate('Login')
        }
        else {
          alert(result)
        }
      })
      .catch(error => console.log('error', error));
  }


  updateprofileimage = () => {

    console.log('userid from profile', this.state.userid)
    let formdata = new FormData();

    //formdata.append("user_id", this.state.userid);
    formdata.append("profile_image", { type: this.state.profileimage.type, uri: this.state.profileimage.uri, name: this.state.profileimage.fileName });

    //  console.log('formdata----',formdata)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");

    var requestOptions = {
      method: 'POST',
      //headers: myHeaders,
      body: formdata,
      //body:this.createFormData(this.state.profileimage,{"user_id": this.state.userid}),
      redirect: 'follow'
    };

    //console.log('body---',requestOptions.body)
    fetch(BASE_URL + "user-profileImage-Update/" + this.state.userid, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === 1) {
          //this.getkyc();
          this.setState({ showloader: !this.state.showloader })
          alert(result.message)
          this.props.navigation.navigate('Login')
        } else if (result.status === 0) {
          alert(result.message)
        }
        else {
          alert(result.error)
        }
      })
      .catch(error => console.log('error', error));

  }


  getstate = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "get_state", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)

        // console.log('length', result.data.length)
        //  console.log('states',result.states[0].state_name)
        this.setState({ listofstates: [], listofstateswithids: [] })
        for (let i = 0; i < result.states.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.listofstates.push(result.states[i].state_name)
          this.state.listofstateswithids.push(result.states[i])
        }
        //  console.log('list of states', this.state.listofstateswithids)

      })
      .catch(error => console.log('error', error));
  };

  getcity = async (value) => {

    await this.setState({ statename: value.state_name, state_id: value.state_id })

    // console.log('stateid', this.state.state_id)

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "get_city/" + this.state.state_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        //  console.log(result)
        // console.log('length', result.data.length)
        //  console.log('city',result.cities[0].city_name)
        this.setState({ listofcities: [] })
        for (let i = 0; i < result.cities.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.listofcities.push(result.cities[i].city_name)
        }
        //  console.log('list of', this.state.listofcities)

      })
      .catch(error => console.log('error', error));
  };

  renderStateCodeRow(rowData) {

    const { state_id, state_name } = rowData;
    return (
      <View >
        <Text >{`${state_name}`} </Text>
        {/* <Text > {`${state_id}`}</Text> */}
      </View>
    );
  }

  renderButtonText(rowData) {
    const { state_id, state_name } = rowData;
    console.log(`${state_id} - ${state_name}`);
    return ` ${state_name}`;
  }

  getotp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "mobile_number": this.state.email });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL + "mobile-otp", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.success == 1) {
          alert(result.message)
          // AsyncStorage.setItem('phonenumber', this.state.phonenumber)
          //{ mobilenumber: this.state.phonenumber }
          // this.props.navigation.navigate('Otp')
        }
      })
      .catch(error => console.log('error', error));
  }


  render() {
    const { modalVisible } = this.state;
    return (

      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          backgroundColor: '#f0f8ff'
        }}
      >
        <ScrollView>
          <View style={{ marginTop: 20, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View>
              {/* source={require('../../assets/logo1.jpg')} */}
              <Image source={{ uri: 'https://romegamart.com/third-party/logo1.jpg' }} style={{ height: 50, width: 50, marginLeft: 15, borderRadius: 25 }} />
              <Text style={{ color: '#00008b', fontSize: 16, lineHeight: 30 }}>Grow with us...</Text>
            </View>

            <View style={{ width: 90, height: 90, borderRadius: 45, borderWidth: 5, borderColor: '#0F6E94', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
              >
                {this.state.cameraClicked ?
                  <Image
                    source={{ uri: this.state.profileUri }}
                    style={{ height: 80, width: 80, borderRadius: 40 }}
                  />
                  :
                  <Feather name="user-plus" size={45} color={'#1e90ff'} />
                }
              </TouchableOpacity>
            </View>

            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.btnParentSection}>
                  <View
                    style={{
                      borderRadius: 5,
                      borderWidth: 0.5,
                      backgroundColor: '#FFFFFF',
                      width: 300,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.launchCamera()}
                      style={styles.btnSection}>
                      <Text style={styles.btnText}>Take a photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      //onPress={() =>this.uploadprofile()}
                      onPress={() => this.launchImageLibrary()}
                      style={(styles.btnSection, { margin: 20 })}>
                      <Text style={styles.btnText}>
                        Choose from the device folders
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                style={{ height: 40, width: Dimensions.get('window').width / 4, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('Unverifiedhome')}
              >
                <Text
                  style={{ color: '#ffffff', fontSize: 24 }}
                >Skip</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, borderBottomColor: '#000000', borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, lineHeight: 30 }}>
              Complete Account KYC
            </Text>
            <Text style={{ fontSize: 18, lineHeight: 30, marginBottom: 10 }}>
              Register your business with us
            </Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              placeholder='Enter Your Address'
              style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 16, marginTop: 15 }}
              placeholderTextColor={'#000000'}
              onChangeText={(text) => this.setState({ address: text })}
              value={this.state.address}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              {/* <TextInput
                            placeholder='State'
                            style={{ width: Dimensions.get('window').width / 3, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 18, marginTop: 10,marginRight:Dimensions.get('window').width/7 }}
                            placeholderTextColor={'#000000'}
                            onChangeText={(text) => this.setState({ statename: text })}
                            value={this.state.statename}
                        /> */}

              <View style={{ height: 40, alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                <ModalDropdown
                  style={{ width: Dimensions.get('window').width / 3 - 10, height: 40, borderRadius: 8, backgroundColor: 'rgba(221,221,221,0.5)', justifyContent: 'center', marginRight: Dimensions.get('window').width / 6 }}
                  options={this.state.listofstateswithids}
                  dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                  dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                  textStyle={{ fontSize: 18, marginLeft: 10 }}
                  renderRow={this.renderStateCodeRow.bind(this)}
                  renderButtonText={(rowData) => this.renderButtonText(rowData)}
                  onSelect={async (idx, value) => await this.getcity(value)}
                  defaultValue={"State"}
                />
                <View style={{ position: "absolute", right: 70, top: 10 }}>
                  {/* <Text>▼</Text> */}
                  <Entypo name="chevron-thin-down" size={15} />
                </View>
              </View>

              <View style={{ height: 40, alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                <ModalDropdown
                  style={{ width: Dimensions.get('window').width / 3 - 10, height: 40, borderRadius: 8, backgroundColor: 'rgba(221,221,221,0.5)', justifyContent: 'center', }}
                  options={this.state.listofcities}
                  onSelect={(value) => this.setState({ city: (String(this.state.listofcities[value])) })}    //console.log('val',(String(this.state.documentslist[value]))
                  dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                  dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                  textStyle={{ fontSize: 18, marginLeft: 10 }}
                  // renderRow={this.renderStateCodeRow.bind(this)}
                  //                 renderButtonText={(rowData)=>this.renderButtonText(rowData)}
                  //                 onSelect={(idx, value)=> this.getcity(value)}
                  defaultValue={"City"}
                />
                <View style={{ position: "absolute", right: 20, top: 10 }}>
                  {/* <Text>▼</Text> */}
                  <Entypo name="chevron-thin-down" size={15} />
                </View>
              </View>
              {/* <TextInput
                            placeholder='City'
                            style={{ width: Dimensions.get('window').width / 3, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 18, marginTop: 10 }}
                            placeholderTextColor={'#000000'}
                            onChangeText={(text) => this.setState({ city: text })}
                            value={this.state.city}
                        /> */}
            </View>
            <TextInput
              placeholder='Enter Your GST no'
              style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 16, marginTop: 10 }}
              placeholderTextColor={'#000000'}
              maxLength={15}
              onChangeText={(text) => this.setState({ gst: text },()=>this.validategst(text) )}  //this.setState({ gst: text })
              value={this.state.gst}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                placeholder='Enter Your email OTP'
                style={{ width: Dimensions.get('window').width / 2, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 16, marginTop: 10, marginRight: 25 }}
                placeholderTextColor={'#000000'}
                onChangeText={(text) => this.setState({ otp: text })}
                value={this.state.otp}
              />
              <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                {/* <Text style={{fontSize:16}}>
                    In case you have not received it
                </Text> */}

                <TouchableOpacity
                  style={{ marginTop: 0 }}
                  onPress={() => this.getotp()}
                >
                  <Text style={{ fontSize: 16, color: '#00008b', fontWeight: 'bold', lineHeight: 30 }}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              placeholder='Enter Your Password'
              style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 16, marginTop: 10 }}
              placeholderTextColor={'#000000'}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />

            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
              <ModalDropdown
                style={{ width: Dimensions.get('window').width - 80, height: 40, borderRadius: 8, backgroundColor: 'rgba(106,90,205,0.2)', justifyContent: 'center' }}
                options={this.state.documentslist}
                onSelect={(value) => this.setState({ doctype: (String(this.state.documentslist[value])) })}    //console.log('val',(String(this.state.documentslist[value]))
                dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                textStyle={{ fontSize: 18, marginLeft: 10 }}
                defaultValue={"Upload Business Proof"}
              />
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                {/* <Text>▼</Text> */}
                <Entypo name="chevron-thin-down" size={15} />
              </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 150, height: 100, borderRadius: 5, borderWidth: 1, marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{}}
                  onPress={() => this.setState({ showmodal: !this.state.showmodal })}
                // onPress={this.uploaddocument}
                >
                  {this.state.uploadclicked ?
                    <Image
                      source={{ uri: this.state.fileUri }}
                      style={{ height: 80, width: 80, }}
                    />
                    :
                    // <Image
                    //     source={require('../../assets/camera.png')}
                    //     style={{ height: 20, width: 20, }}
                    // />
                    <Entypo name="camera" size={20} />
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodal}>
                <View style={styles.btnParentSection}>
                  <View
                    style={{
                      borderRadius: 5,
                      borderWidth: 0.5,
                      backgroundColor: '#FFFFFF',
                      width: 300,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.launchCamera1()}
                      style={styles.btnSection}>
                      <Text style={styles.btnText}>Take a photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      //onPress={() =>this.uploadprofile()}
                      onPress={() => this.launchImageLibrary1()}
                      style={(styles.btnSection, { margin: 20 })}>
                      <Text style={styles.btnText}>
                        Choose from the device folders
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>


          {this.state.showloader ?
            <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width }}>
              <ActivityIndicator size="large" color="#2e3191" />
            </View>
            :
            <View style={{ marginTop: Dimensions.get('window').height / 40, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.kyccomplete()}
              //onPress={() =>this.updateprofileimage()}
              >
                <Text style={{ color: '#ffffff', fontSize: 24 }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          }

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 40 }}>
            <Text style={{ fontSize: 20 }}>
              Already have an account /
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={{ fontSize: 20, color: '#00008b', textDecorationLine: 'underline', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>

          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 150,
    width: 120,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 190,
  },
  btnParentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSection: {
    // width:Dimensions.get('window').width,
    // height: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 3,
    //  marginBottom:20,
    marginTop: 20,
    marginLeft: 20,
  },
  btnText: {
    textAlign: 'left',
    color: '#111111',
    fontSize: 18,
  },
  thumbnailPreview: {
    padding: 20,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  thumbnailInfo: {
    color: 'darkblue',
  },
  thumbnailError: {
    color: 'crimson',
  },
});


