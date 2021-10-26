import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { BASE_URL } from '../api';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class Vendor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyname: '',
            emailid: '',
            city: '',
            statename: '',
            pincode: '',
            phonenumber: '',
            address: '',
            gst: '',
            userid: '',
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

    updatevendor = () => {
        //         var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "name":this.state.companyname,
        //     "phone":this.state.phonenumber,
        //     "email":this.state.emailid,
        //     "city":this.state.city,
        //     "zip":this.state.pincode,
        //     "address":this.state.address,
        //     "state":this.state.statename,
        //     "gst":this.state.gst
        // });
        if (this.state.phonenumber == '') {
            alert('phonenumber field is required')
        } else if (this.state.companyname == '') {
            alert('company name field is required')
        } else if (this.state.emailid == '') {
            alert('email field is required')
        } else if (this.state.city == '') {
            alert('city field is required')
        } else if (this.state.pincode == '') {
            alert('pincode field is required')
        } else if (this.state.address == '') {
            alert('address field is required')
        }
        else if (this.state.statename == '') {
            alert('statename field is required')
        }
        else if (this.state.gst == '') {
            alert('gst field is required')
        }
        else {

            var formdata = new FormData();
            formdata.append("name", this.state.companyname);
            formdata.append("phone", this.state.phonenumber);
            formdata.append("email", this.state.emailid);
            formdata.append("city", this.state.city);
            formdata.append("zip", this.state.pincode);
            formdata.append("address", this.state.address);
            formdata.append("state", this.state.statename);
            formdata.append("gst", this.state.gst);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(BASE_URL + "vendorprofile", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status == true) {
                        alert(result.message)
                        this.props.navigation.navigate('Final')
                    }
                    else if (result.status == false) {
                        alert(result.message)
                    }
                    else {
                        alert(result)
                    }
                })
                .catch(error => console.log('error', error));
        }
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
                this.props.navigation.navigate('Categories')
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


    render() {

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
                                            // source={require('../../assets/sidebar.jpeg')}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5,marginRight:5  }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5,marginRight:5  }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, height: Dimensions.get('window').height / 19, justifyContent: 'center', marginLeft: 5,marginRight:5  }]}
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
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Search')}
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
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/vendor1.png' }}
                                    // source={require('../../assets/vendor1.png')} 
                                    style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width / 3, }} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 26, fontWeight: 'bold', fontFamily: 'sans-serif-light' }}>
                                    Become a Vendor
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    You can register to become a vendor by submitting this form and our team will get in touch with you shortly.
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Enter Your Phone No'
                                    style={styles.text}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={async (text) => await this.setState({ phonenumber: text })}
                                    value={this.state.phonenumber}
                                    maxLength={10}
                                    keyboardType='number-pad'
                                />
                                <TextInput
                                    placeholder='Enter Your Company Name'
                                    style={styles.text}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ companyname: text })}
                                    value={this.state.companyname}
                                />
                                <TextInput
                                    placeholder='Enter Your Email Address'
                                    style={styles.text}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ emailid: text })}
                                    value={this.state.emailid}
                                />
                                <TextInput
                                    placeholder='Enter Your Address'
                                    style={styles.text}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ address: text })}
                                    value={this.state.address}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        placeholder='City'
                                        style={styles.textintips}
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(text) => this.setState({ city: text })}
                                        value={this.state.city}
                                    />
                                    <TextInput
                                        placeholder='State'
                                        style={styles.textintips}
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(text) => this.setState({ statename: text })}
                                        value={this.state.statename}
                                    />
                                    <TextInput
                                        placeholder='Pincode'
                                        style={styles.textintips}
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(text) => this.setState({ pincode: text })}
                                        value={this.state.pincode}
                                    />
                                </View>
                                <TextInput
                                    placeholder='Enter Your GST no'
                                    style={styles.text}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ gst: text }, ()=>this.validategst(text))}
                                    value={this.state.gst}
                                    maxLength={16}
                                />

                                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                                    <TouchableOpacity
                                        style={{ height: 40, width: Dimensions.get('window').width - 40, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                        onPress={() => this.updatevendor()}
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




                {/* <View style={{position:'absolute',height:50,left:0, width:Dimensions.get('window').width,backgroundColor:'#ffffff',bottom:0, flexDirection: 'row', justifyContent: 'space-around', height: 50, alignItems: 'center', borderTopColor: '#DDDDDD', borderTopWidth: 3 }}>
                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('home')}
                        >
                            <Entypo name="home" size={35} />

                        </TouchableOpacity>
                    </View>

                    <View >
                        <TouchableOpacity
                        //  onPress={() => this.props.navigation.navigate('home')}
                        >
                            <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} />

                        </TouchableOpacity>
                    </View>

                    <View >
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
        width: Dimensions.get('window').width - 40,
        height: 40,
        backgroundColor: 'rgba(221,221,221,0.5)',
        fontSize: 18,
        marginBottom: 15,
        borderRadius: 8,
        textAlign: 'center',
    },
    textintips: {
        width: Dimensions.get('window').width / 3 - 20,
        height: 40,
        backgroundColor: 'rgba(221,221,221,0.5)',
        fontSize: 18,
        marginBottom: 15,
        marginRight: 10,
        borderRadius: 8,
        textAlign: 'center',
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


