import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import { BASE_URL } from '../api';
//import SideMenu from 'react-native-side-menu'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Terms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phonenumber: '',
            companyname: '',
            emailid: '',
            address: '',
            city: '',
            statename: '',
            pincode: '',
            gst: '',
            userid: '',
            textedit: false,
            photo: '',
            showmenu: false,

        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        // AsyncStorage.getItem('username').then((username) => {
        //     if(username){
        //         this.setState({name: username});
        //         console.log(this.state.username);
        //     }
        // });

        this.getuserdetails();

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


    updatemyaccount = () => {
        var formdata = new FormData();
        formdata.append("full_name", this.state.name);
        formdata.append("address", this.state.address);
        formdata.append("state", this.state.statename);
        formdata.append("city", this.state.city);
        formdata.append("zipcode", this.state.pincode);
        formdata.append("gst", this.state.gst);
        formdata.append("email", this.state.emailid);
        formdata.append("company_name", this.state.companyname);
        formdata.append("phone", this.state.phonenumber);
        formdata.append("document", this.state.photo);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "myaccount/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.status == 1)
                if (result.status == 1) {
                    this.setState({ textedit: !this.state.textedit })
                    alert(result.message)
                }
                else {
                    alert(result)
                }
            })
            .catch(error => console.log('error', error));
    }


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


    getuserdetails = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/myprofile/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success == 1) {
                    this.setState({
                        name: result.data.name,
                        phonenumber: result.data.phone,
                        companyname: result.data.company_name,
                        emailid: result.data.email,
                        address: result.data.address,
                        city: result.data.city,
                        statename: result.data.state_id,
                        pincode: result.data.pincode,
                        gst: result.data.gst
                    })
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


    render() {
        // const menu = <Menu navigator={navigator}/>;
        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f0f8ff'
                }}
            >
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
                                            //source={require('../../assets/sidebar.jpeg')}
                                            style={{ width: Dimensions.get('window').width / 2 + 50, height: Dimensions.get('window').height - 160 }}
                                        >
                                            <View style={{ marginLeft: 5 }}>
                                                <TouchableOpacity
                                                    style={styles.butt}
                                                    onPress={() => this.props.navigation.navigate('Verifiedhome')}
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
                                                    onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                                                //onPress={() =>this.props.navigation.navigate('Categories')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Shop by Category
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5, marginRight: 5 }]}
                                                    onPress={() => this.props.navigation.navigate('Deals')}
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
                                                    onPress={() => this.props.navigation.navigate('Orders')}
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
                                                    onPress={() => this.props.navigation.navigate('Myaccount')}
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
                                                    onPress={() => this.props.navigation.navigate('Wishlist')}
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
                                                    onPress={() => this.props.navigation.navigate('Cart')}
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
                                                    onPress={() => this.props.navigation.navigate('Notifications')}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.text1}>
                                                            Notifications
                                                        </Text>
                                                        <AntDesign name="arrowright" size={20} color="#ffffff" style={{ marginRight: 5 }} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5, marginRight: 5 }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, height: Dimensions.get('window').height / 19, justifyContent: 'center', marginLeft: 5, marginRight: 5 }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5, marginRight: 5 }]}
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
                                                    onPress={() => this.props.navigation.navigate('Rateus')}
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
                                                    onPress={() => this.props.navigation.navigate('Shareapp')}
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
                        // onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
                        //source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Verifiedhome')}
                        >
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
                        <View>
                            <View style={{ flexDirection: 'row', margin: 10, marginBottom: 0 }}>
                                <Text style={{ fontSize: 22, marginRight: 10 }}>
                                    My Account
                                </Text>
                                <Ionicons name="person" size={25} />
                            </View>

                            <View>
                                <TouchableOpacity
                                    style={{ alignItems: 'flex-end', margin: 10, marginTop: 0 }}
                                    onPress={() => this.setState({ textedit: true })}
                                >
                                    <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', color: '#0000cd' }}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                                <View pointerEvents={this.state.textedit ? "auto" : "none"}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                Name
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={(text) => this.setState({ name: text })}
                                                value={this.state.name}
                                                importantForAutofill={'yes'}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                Phone No
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={async (text) => await this.setState({ phonenumber: text })}
                                                value={this.state.phonenumber}
                                                maxLength={10}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                Company
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={(text) => this.setState({ companyname: text })}
                                                value={this.state.companyname}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                Email Address
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={(text) => this.setState({ emailid: text })}
                                                value={this.state.emailid}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                Address
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={(text) => this.setState({ address: text })}
                                                value={this.state.address}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginLeft: Dimensions.get('window').width / 3 + 27 }}>
                                        <TextInput
                                            placeholder='city'
                                            style={styles.textintips}
                                            placeholderTextColor={'#000000'}
                                            onChangeText={(text) => this.setState({ city: text })}
                                            value={this.state.city}
                                        />
                                        <TextInput
                                            placeholder='state'
                                            style={styles.textintips}
                                            placeholderTextColor={'#000000'}
                                            onChangeText={(text) => this.setState({ statename: text })}
                                            value={this.state.statename}
                                        />
                                        <TextInput
                                            placeholder='pincode'
                                            style={styles.textintips}
                                            placeholderTextColor={'#000000'}
                                            onChangeText={async (text) => await this.setState({ pincode: text })}
                                            value={this.state.pincode}
                                            maxLength={6}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.textview}>
                                            <Text style={styles.nametext}>
                                                GST No
                                            </Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder=''
                                                maxLength={16}
                                                style={styles.text}
                                                placeholderTextColor={'#000000'}
                                                onChangeText={async (text) => await this.setState({ gst: text })}
                                                value={this.state.gst}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                                    <TouchableOpacity
                                        onPress={this.uploaddocument}
                                    >
                                        <Text style={{ color: '#0000cd', fontSize: 15, fontWeight: 'bold', flexWrap: 'wrap' }}>
                                            Upload Business proof
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Settings')}
                                    >
                                        <Text style={{ color: '#0000cd', fontSize: 15, fontWeight: 'bold' }}>
                                            Change Password
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginBottom: 50, marginTop: Dimensions.get('window').height / 25 }}>
                                    <TouchableOpacity
                                        style={{ height: 40, width: Dimensions.get('window').width / 2 + 30, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                        onPress={() => this.updatemyaccount()}
                                    >
                                        <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>


                    </ScrollView>

                </View>

                {/* <View style={{flex:0.1}}>
                    <View style={{ position:'absolute',height:50,left:0, width:Dimensions.get('window').width,backgroundColor:'#ffffff',bottom:0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',borderTopColor:'#DDDDDD',borderTopWidth:3 }}>
                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Verifiedhome')}
                        >
                            <Entypo name="home" size={35} />

                        </TouchableOpacity>
                    </View>

                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Categories')}
                        >
                            <Image source={require('../../assets/menu.png')} style={{ height:30, width: 30 }} />

                        </TouchableOpacity>
                    </View>

                    <View >
                        <TouchableOpacity style={{ alignItems: 'center' }}
                         onPress={() => this.props.navigation.navigate('Wishlist')}
                        >
                            <Ionicons name="heart" size={35} />

                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={{ alignItems: 'center' }}
                         onPress={() => this.props.navigation.navigate('Cart')}
                        >
                            <Ionicons name="cart" size={35} />

                        </TouchableOpacity>
                    </View>
                </View>
                </View> */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(211,211,211,0.5)', height: 50, position: 'absolute', width: Dimensions.get('window').width, alignItems: 'center', top: Dimensions.get('window').height-50,borderTopColor:'#DDDDDD',borderTopWidth:3 }}>
                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('home')}
                        >
                            <Entypo name="home" size={35} />

                        </TouchableOpacity>
                    </View> */}

                {/* <View >
                        <TouchableOpacity
                          //  onPress={() => this.props.navigation.navigate('home')}
                        >
                            <Image source={require('../../assets/menu.png')} style={{ height:30, width: 30 }} />

                        </TouchableOpacity>
                    </View> */}

                {/* <View >
                        <TouchableOpacity style={{ alignItems: 'center' }}
                         onPress={() => this.props.navigation.navigate('Cart')}
                        >
                            <Ionicons name="cart" size={35} />

                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={{ alignItems: 'center' }}
                        // onPress={() => this.props.navigation.navigate('cart')}
                        >
                            <Ionicons name="help-circle" size={35} />

                        </TouchableOpacity>
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
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                            // onPress={() => this.props.navigation.navigate('Categories')}
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
                                    //source={require('../../assets/wish1.png')} 
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
        width: Dimensions.get('window').width / 2 + 20,
        height: 40,
        backgroundColor: 'rgba(221,221,221,0.5)',
        fontSize: 15,
        marginBottom: 15,
        borderRadius: 8,
        textAlign: 'center',
        //marginLeft:Dimensions.get('window').width/3
    },
    textintips: {
        width: Dimensions.get('window').width / 6,
        height: 40,
        backgroundColor: 'rgba(221,221,221,0.5)',
        fontSize: 16,
        marginBottom: 15,
        marginRight: 10,
        borderRadius: 8,
        textAlign: 'center',

    },
    nametext: {
        fontSize: 18,
        paddingTop: 2,
        textAlign: 'center'
    },
    textview: {
        width: Dimensions.get('window').width / 2 - 50,
        alignItems: 'flex-end',
        marginRight: 10
    },
    text1: {
        fontSize: 16,
        color: '#ffffff'
        //fontFamily:'sans-serif-light',
    },
    butt: {
        margin: 5,

    }


});





