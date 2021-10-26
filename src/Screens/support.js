import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground, PermissionsAndroid, Modal, TouchableOpacity,ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import { BASE_URL } from '../api';
var ImagePicker = require('react-native-image-picker');
//import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Support extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            fileUri: '',
            filename: '',
            photo: '',
            uploadclicked: false,
            userid: '',
            issue: '',
            unverifieduserloggedin: '',
            verifieduserloggedin: '',
            showmenu: false,
            modalVisible: false,
            showloader:false,

        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    checklogin = () => {
        if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
            this.props.navigation.navigate('Unverifiedhome')
        }
        else if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
            this.props.navigation.navigate('Verifiedhome')
        }
        else if (this.state.userid) {
            this.props.navigation.navigate('Kyc', { id: this.state.userid })
        }
        else {
            this.props.navigation.navigate('Signup')
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        await AsyncStorage.getItem('unverifieduserloggedin').then((unverifieduserloggedin) => {
            if (unverifieduserloggedin) {
                this.setState({ unverifieduserloggedin: unverifieduserloggedin });
                console.log('unverifiedlogin', this.state.unverifieduserloggedin);
            }
        });

        console.log('unverifiedlogin', this.state.unverifieduserloggedin);

        await AsyncStorage.getItem('verifieduserloggedin').then((verifieduserloggedin) => {
            if (verifieduserloggedin) {
                this.setState({ verifieduserloggedin: verifieduserloggedin });
                console.log('verifiedlogin', this.state.verifieduserloggedin);
            }
        });

        console.log('verifiedlogin', this.state.verifieduserloggedin);

        BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

        // return () =>
        //   // clear/remove event listener
        //   BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

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

    createFormData = (photo, body) => {
        console.log('photo------', photo)
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            //file: photo,
            //uri: this.state.images[0].path,
            //type: this.state.images[0].mime,
            //size: photo.fileSize,
            //name: filename
            uri:
                Platform.OS === "android" ? this.state.photo.uri : this.state.photo.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    };


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
                        // cameraClicked: true,
                        // modalVisible: false,
                        fileUri: response.uri,
                        filename: response.fileName,
                        photo: response,
                        uploadclicked: true
                    });

                    //console.log('photo uri',this.state.profileUri)

                }
            });
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
                    //     cameraClicked: true,
                    //    //modalVisible: false,
                    //    profileimage:response,
                    //    profileUri: response.uri, 
                    //    profilename:response.fileName,
                    //    photo: response, 
                    // uploadclicked: true
                    fileUri: response.uri,
                    filename: response.fileName,
                    photo: response,
                    uploadclicked: true

                });

            }
        });
        //}
    };

    requestsupport = () => {
        this.setState({showloader:true})
        var formdata = new FormData();
        formdata.append("user_id", this.state.userid);
        formdata.append("questions", this.state.issue);
        formdata.append("image", { type: this.state.photo.type, uri: this.state.photo.uri, name: this.state.photo.fileName });

        var requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data'
            },
            //body: this.createFormData(this.state.photo,{"user_id":this.state.userid,"questions":this.state.issue}),
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "supportsave", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == 1) {
                    alert(result.message)
                    this.setState({showloader:false})
                    this.props.navigation.navigate('Final')
                }
                else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    clearasyncdata = async () => {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }


    logincheck = (value) => {
        if (value === 'home') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Verifiedhome')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Unverifiedhome')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'category') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Categories')
                this.props.navigation.navigate('Categories', { id: 50 })
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'deals') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Deals')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'orders') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Orders')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'myaccount') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Myaccount')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }

        }
        else if (value === 'wishlist') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Wishlist')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'cart') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Cart')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'notification') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Notifications')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'rateus') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Rateus')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }
        else if (value === 'shareapp') {
            if (this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid) {
                this.props.navigation.navigate('Shareapp')
            }
            else if (this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid) {
                // this.props.navigation.navigate('Unverifiedhome')
                alert('Your account under verification')
            }
            else {
                alert('Please login')
            }
        }

    }


    render() {
        const { modalVisible } = this.state;
        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f0f8ff'
                }}
            >
                {/* {this.state.showmenu?
                      <View style={{position:'absolute',top:0,left:0,width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,zIndex:1,
                    }}>
                         <TouchableOpacity
                        onPress={() =>this.setState({showmenu:!this.state.showmenu})}
                        >
                       
                        <View >
                <View style={{width:Dimensions.get('window').width/2+50,zIndex:2, marginTop:0,marginBottom:0}}>
                <View style={{height:Dimensions.get('window').height/9, width:Dimensions.get('window').width/2+50, backgroundColor:'#2e3191',borderRightColor:'#000000',borderRightWidth:2}}>
                    <View style={{flexDirection:'row', marginLeft:5}}>
                    <Ionicons name="person" size={30} color="#ffffff" /> 
                    <Text style={{color:'#ffffff',fontSize:24}}>
                        Hello, {this.state.username}
                    </Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:20,marginLeft:15,marginTop:5}}>
                        How are you doing!!
                    </Text>
                </View>
                
                <View style={{ width:Dimensions.get('window').width/2+50, backgroundColor:'#ffffff',borderRightColor:'#000000',borderRightWidth:2,height:Dimensions.get('window').height-160}}>
                <ImageBackground
                source={require('../../assets/sidebar.jpeg')}
                style={{width:Dimensions.get('window').width/2+50,height:Dimensions.get('window').height-160}}
                >
                <View style={{marginLeft:5}}>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() => this.props.navigation.navigate('Verifiedhome')}
                    >
                        <Text style={styles.text1}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Categories')}
                    >
                        <Text style={styles.text1}>
                            Shop by Category
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt,[{borderBottomColor:'#DDDDDD',borderBottomWidth:2,marginLeft:5}]}
                    onPress={() =>this.props.navigation.navigate('Deals')}
                    >
                        <Text style={styles.text1}>
                            Today's Deals
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() => this.props.navigation.navigate('Orders')}
                    >
                        <Text style={styles.text1}>
                            My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Myaccount')}
                    >
                        <Text style={styles.text1}>
                            My Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Wishlist')}
                    >
                        <Text style={styles.text1}>
                           Wishlist
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() => this.props.navigation.navigate('Cart')}
                    >
                        <Text style={styles.text1}>
                            Cart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Notifications')}
                    >
                        <Text style={styles.text1}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt,[{borderBottomColor:'#DDDDDD',borderBottomWidth:2,marginLeft:5}]}
                    >
                        <Text style={styles.text1}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt,[{borderBottomColor:'#DDDDDD',borderBottomWidth:2,height:Dimensions.get('window').height/19,justifyContent:'center',marginLeft:5}]}
                    onPress={() =>this.props.navigation.navigate('Vendor')}
                    >
                        <Text style={styles.text1}>
                            Become a Vendor
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() => this.props.navigation.navigate('About')}
                    >
                        <Text style={styles.text1}>
                            About ROMegaMart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Terms')}
                    >
                        <Text style={styles.text1}>
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt,[{borderBottomColor:'#DDDDDD',borderBottomWidth:2,marginLeft:5}]}
                    onPress={() =>this.props.navigation.navigate('Policy')}
                    >
                        <Text style={styles.text1}>
                            Policy of Use
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() => this.props.navigation.navigate('Rateus')}
                    >
                        <Text style={styles.text1}>
                            Rate Us
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Shareapp')}
                    >
                        <Text style={styles.text1}>
                            Share App
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.props.navigation.navigate('Support')}
                    >
                        <Text style={styles.text1}>
                            Support
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.butt}
                    onPress={() =>this.clearasyncdata()}
                    //onPress={() =>this.props.navigation.navigate('Support')}
                    >
                        <Text style={styles.text1}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
                </View>
                </View>
                </View>
            </TouchableOpacity>
                        </View>
                        :null} */}

                {this.state.showmenu ?
                    <View style={{
                        position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height, zIndex: 1,
                    }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        >

                            <View >
                                <View style={{ width: Dimensions.get('window').width / 2 + 50, zIndex: 2, marginTop: 0, marginBottom: 0 }}>
                                    <View style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 2 + 50, backgroundColor: '#2e3191', borderRightColor: '#000000', borderRightWidth: 2 }}>
                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                            <Ionicons name="person" size={30} color="#ffffff" />
                                            <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                                Hello, {this.state.username}
                                            </Text>
                                        </View>
                                        <Text style={{ color: '#ffffff', fontSize: 20, marginLeft: 15, marginTop: 5 }}>
                                            How are you doing!!
                                        </Text>
                                    </View>
                                    {/* rgba(65,105,225,0.3) */}
                                    <View style={{ width: Dimensions.get('window').width / 2 + 50, backgroundColor: '#ffffff', borderRightColor: '#000000', borderRightWidth: 2, height: Dimensions.get('window').height - 160 }}>
                                        <ImageBackground
                                            source={{ uri: 'https://romegamart.com/third-party/sidebar.jpeg' }}
                                            // source={require('../../assets/sidebar.jpeg')}
                                            style={{ width: Dimensions.get('window').width / 2 + 50, height: Dimensions.get('window').height - 160 }}
                                        >
                                            <View style={{ marginLeft: 5 }}>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('home')}
                                                >
                                                   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Home
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('category')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Shop by Category
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5,marginRight:5 }]}
                                                    onPress={() => this.logincheck('deals')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Today's Deals
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('orders')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            My Orders
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('myaccount')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            My Account
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('wishlist')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Wishlist
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('cart')}
                                                >
                                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Cart
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('notification')}
                                                >
                                                   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Notifications
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5,marginRight:5 }]}
                                                    onPress={() => this.props.navigation.navigate('Settings')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Settings
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, height: Dimensions.get('window').height / 19, justifyContent: 'center', marginLeft: 5,marginRight:5 }]}
                                                    onPress={() => this.props.navigation.navigate('Vendor')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Become a Vendor
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.props.navigation.navigate('About')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            About ROMegaMart
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.props.navigation.navigate('Terms')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Terms & Conditions
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5,marginRight:5 }]}
                                                    onPress={() => this.props.navigation.navigate('Policy')}
                                                >
                                                   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Policy of Use
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('rateus')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Rate Us
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.logincheck('shareapp')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Share App
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.props.navigation.navigate('Support')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Support
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.props.navigation.navigate('Videos')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Videos
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.clearasyncdata()}
                                                //onPress={() =>this.props.navigation.navigate('Support')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Logout
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null}
                <View style={{ height: 50, backgroundColor: '#2e3191', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity
                        //onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
                        onPress={() => this.checklogin()}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity>
                            <Ionicons name="search-outline" size={30} color="#ffffff" style={{ transform: [{ rotateY: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notifications', { id: this.state.userid })}
                        >
                            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            //onPress={() => this.props.navigation.navigate('Menu')}
                            onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        >
                            <Entypo name="menu" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView>

                        <View style={{ marginTop: Dimensions.get('window').height / 15 }}>
                            <View style={{ borderTopColor: '#DDDDDD', borderTopWidth: 3, borderBottomColor: '#DDDDDD', borderBottomWidth: 10, height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 20 }}>
                                            Get quick customer support
                                        </Text>
                                        <Text style={{ fontSize: 20 }}>
                                            by writing to us
                                        </Text>
                                    </View>
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/support.png' }}
                                        // source={require('../../assets/support.png')} 
                                        style={{ height: Dimensions.get('window').height / 11, width: Dimensions.get('window').width / 5 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 10, backgroundColor: '#ffffff', marginTop: 40, height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width, }}>
                            <TextInput
                                // style={{fontSize:16,}}
                                style={{ fontSize: 16, marginLeft: 10, marginRight: 10, textAlignVertical: 'top', flex:1 }}
                                multiline={true}
                                onChangeText={(text) => this.setState({ issue: text })}
                                value={this.state.issue}
                                placeholder={'Write your complaint/issue (in not more than 200 words) ..'}
                                placeholderTextColor={'#000000'}
                            />
                        </View>

                        <View style={{ marginTop: Dimensions.get('window').height / 15 }}>
                            <View style={{ borderTopColor: '#DDDDDD', borderTopWidth: 3, borderBottomColor: '#DDDDDD', borderBottomWidth: 10, height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.uploadclicked ?

                                    <Image source={{ uri: this.state.fileUri }} style={{ height: Dimensions.get('window').height / 8, width: Dimensions.get('window').width / 4 }} />
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Text style={{ fontSize: 18 }}>
                                                Upload any picture (if required)

                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                in jpeg,jpg,png format
                                            </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width / 3 - 30, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                                                //onPress={this.uploaddocument}
                                                // onPress={this.launchCamera}
                                                onPress={() => this.setState({ modalVisible: true })}
                                            >
                                                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                                                    Upload
                                                </Text>
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
                                    </View>

                                }

                            </View>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 25, marginBottom: 70 }}>
                            <TouchableOpacity
                                style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width - 60, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.requestsupport()}
                            >
                                {this.state.showloader?
                                <ActivityIndicator size="large" color="#ffffff"/>
                                :
                                <Text style={{ fontSize: 26, color: '#ffffff' }}>
                                    Submit
                                </Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>

                {/* <View style={{flex:0.1}}>
        <View style={{position:'absolute',height:60,left:0, width:Dimensions.get('window').width,backgroundColor:'rgba(211,211,211,0.5)',bottom:0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
          <View >
            <TouchableOpacity
             onPress={() => this.props.navigation.navigate('Verifiedhome')}
             //onPress={() =>this.setState({showModal:!this.state.showModal})}
           >
              <Entypo name="home" size={35} />

            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
             onPress={() => this.props.navigation.navigate('Cart')}
            //onPress={() =>this.setState({showModal:!this.state.showModal})}
            >
              <Ionicons name="cart" size={35} />

            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
             onPress={() => this.props.navigation.navigate('Support')}
            >
              <Ionicons name="help-circle" size={35} />

            </TouchableOpacity>
          </View>
        </View> 
    </View> */}

                <View style={{ flex: 0.1 }}>
                    <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Verifiedhome')}
                            >
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/home1.png' }}
                                    //  source={require('../../assets/home1.png')} 
                                    style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Home
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View >
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('Categories')}
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                            >
                                {/* <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} /> */}
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/cat1.png' }}
                                    // source={require('../../assets/cat1.png')} 
                                    style={{ height: 30, width: 30, marginLeft: 20 }} />
                                {/* <Entypo name="home" size={35} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Categories
                                </Text>

                            </TouchableOpacity>
                        </View>

                        <View >
                            <TouchableOpacity style={{ alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('Wishlist')}
                            >
                                {/* <Ionicons name="heart" size={35} /> */}
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/wish1.png' }}
                                    // source={require('../../assets/wish1.png')} 
                                    style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Wishlist
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={{ alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                {/* <Ionicons name="cart" size={35} /> */}
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/cart2.png' }}
                                    // source={require('../../assets/cart2.png')} 
                                    style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Cart
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0000ff',
        marginLeft: 10
    },
    textintips: {
        fontSize: 18,
        fontFamily: 'sans-serif-light',
        marginTop: 5

    },
    text1: {
        fontSize: 16,
        color: '#ffffff'
        //fontFamily:'sans-serif-light',
    },
    butt: {
        margin: 5,

    },
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


