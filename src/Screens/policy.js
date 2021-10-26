import React from 'react';
import { View, BackHandler, TouchableOpacity, AsyncStorage, Modal, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


export default class Terms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: '',
            unverifieduserloggedin: '',
            verifieduserloggedin: '',
            showModal: false,
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

        //         return () =>
        //           // clear/remove event listener
        //           BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

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
            this.props.navigation.navigate('Mobile')
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
                //this.props.navigation.navigate('Categories')
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5, marginRight:5 }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, marginLeft: 5, marginRight:5 }]}
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
                                                    style={styles.butt, [{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2, height: Dimensions.get('window').height / 19, justifyContent: 'center', marginLeft: 5, marginRight:5 }]}
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
                        // onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
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


                        <View style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 3, height: Dimensions.get('window').height / 9, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, }}>
                                RO Mega Mart Privacy Policy
                            </Text>
                        </View>

                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline', textAlign: 'center' }}>
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, marginRight: 10 }}>

                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                RO Mega Mart.com and its mobile application platform (each a
                                <Text style={{ fontWeight: 'bold' }}> “Platform”</Text>
                                <Text>) is a platform which allows the users to shop from various vendors and suppliers aboard.. RO Mega Mart recognizes the importance of privacy as well as the importance of maintaining the confidentiality of personal information. This Privacy Policy applies to all products and services provided by RO Mega Mart and sets out how RO Mega Mart may collect, use and disclose information in relation to Users of the Platform.
                                    User may use RO Mega Mart's services and products via a mobile device either through mobile applications or mobile optimized websites. This Privacy Policy also applies to such use of RO Mega Mart’s services and products.
                                    All capitalized terms not defined in this document shall have the meanings ascribed to them in the Terms of Use of the Platform, which can be found here. Contracting entity shall be Pure Water Mart Private Limited (herein after referred to as
                                    <Text style={{ fontWeight: 'bold' }}> ‘RO Mega Mart’</Text> or <Text style={{ fontWeight: 'bold' }}>‘us’</Text> or <Text style={{ fontWeight: 'bold' }}>‘our’</Text>).{'\n'}
                                </Text>
                            </Text>

                        </View>
                        <View style={{ marginLeft: 10, marginTop: -30 }}>
                            <Text style={{ fontWeight: 'bold' }}>•	COLLECTION OF INFORMATION{'\n'}</Text>
                        </View>
                        <View style={{ marginLeft: 30, marginTop: -10, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                •	User(s) privacy is important to RO Mega Mart and RO Mega Mart have taken steps to ensure that RO Mega Mart do not collect more information from User than is necessary for RO Mega Mart to provide User(s) with RO Mega Mart’s services and to protect User(s) account.{'\n'}
                                •	Information including, but not limited to, User name, address, phone number, fax number, email address, gender, date and/or year of birth and user preferences ("Registration Information") may be collected at the time of User registration on the Platform.{'\n'}
                                •	In connection with any communication or transaction and payment services or any other services that you may avail using the Platform, information, including but not limited to, bank account numbers, billing and delivery information, credit/debit card numbers and expiration dates and tracking information from cheques or money orders ("Account Information") may be collected, among other things, to facilitate the sale and purchase as well as the settlement of purchase price of the products or services transacted on or procured through the Platform.{'\n'}
                                •	RO Mega Mart record and retain details of Users’ activities on the Platform. Information relating to communication or transactions including, but not limited to, the types and specifications of the goods, pricing and delivery information, any dispute records and any information disclosed in any communication forum provided by us and/or other affiliated companies of RO Mega Mart (“Activities Information”) may be collected as and when the communication and / or transactions are conducted through the Platform.{'\n'}
                                •	RO Mega Mart record and retain records of Users’ browsing or buying activities on Platform including but not limited to IP addresses, browsing patterns and User behavioural patterns. In addition, we gather statistical information about the Platform and visitors to the Platform including, but not limited to, IP addresses, browser software, operating system, software and hardware attributes, pages viewed, number of sessions and unique visitors (together "Browsing Information").{'\n'}
                                •	Registration Information, Account Information, Activities Information, and Browsing Information are collectively referred to as User Data.{'\n'}
                                •	It is mandatory for Users of the Platform to provide certain categories of User Data (as specified at the time of collection). In the event that Users do not provide any or sufficient User Data marked as mandatory, RO Mega Mart may not be able to complete the registration process or provide such Users with RO Mega Mart’s products or services.{'\n'}

                            </Text>
                        </View>
                        <View style={{ marginTop: -30, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>•	USE OF USER DATA{'\n'}</Text>
                        </View>

                        <View style={{ marginLeft: 30, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                If you provide any User Data to RO Mega Mart, you are deemed to have authorized RO Mega Mart to collect, retain and use that User Data for the following purposes:{'\n'}
                                •	Verification of User’s identity;{'\n'}
                                •	Processing User’s registration as a user, providing User with a log-in ID for the Platform and maintaining and managing User’s registration;{'\n'}
                                •	Providing User with customer service and responding to User(s) queries, feedback, claims or disputes;{'\n'}
                                •	To facilitate communication between Users on the Platform and / or processing Users transactions on the Platform;{'\n'}
                                •	Performing research or statistical analysis in order to improve the content and layout of the Platform, to improve RO Mega Mart’s product offerings and services and for marketing and promotional purposes;{'\n'}
                                •	Subject to applicable law, RO Mega Mart (including our affiliated companies and their designated Service Providers may use User’s name, phone number, residential address, email address, fax number and other data ("Marketing Data") to provide notices, surveys, product alerts, communications and other marketing materials to User(s) relating to products and services offered by RO Mega Mart or RO Mega Mart’s affiliated companies;{'\n'}
                                •	If User voluntarily submit any User information or other information to the Platform for publication on the Platform through the publishing tools, then Users are deemed to have given consent to the publication of such information on the Platform; and{'\n'}
                                •	Making such disclosures as may be required for any of the above purposes or as required by law, regulations and guidelines or in respect of any investigations, claims or potential claims brought on or against us or against third parties. {'\n'}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>•	DISCLOSURE OF USER DATA{'\n'}</Text>
                        </View>
                        <View style={{ marginLeft: 30, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                •	User further agrees that RO Mega Mart may disclose and transfer User Data to third party service providers (including but not limited to data entry, database management, promotions, products and services alerts, delivery services, payment extension services, authentication and verification services and logistics services) ("Service Providers"). These Service Providers are under a duty of confidentiality to RO Mega Mart and are only permitted to use User Data in connection with the purposes specified in clause 2 herein above.{'\n'}
                                •	User(s) agree that RO Mega Mart may disclose and transfer User Data to RO Mega Mart’s affiliated companies and/or their designated Service Providers.{'\n'}
                                •	When necessary RO Mega Mart may also disclose and transfer User Data to our professional advisers, law enforcement agencies, insurers, government and regulatory and other organizations.{'\n'}
                                •	Any User Data supplied by User will be retained by RO Mega Mart and will be accessible by our employees, any Service Providers engaged by RO Mega Mart and third parties referred to in clause 3 herein, for or in relation to any of the purposes stated in Clause 2 herein above.{'\n'}
                                •	All voluntary information uploaded by you on the Platform (including without limitation information about your products, images, remarks, feedbacks etc. ) may be made publicly available on the Platform and therefore accessible by any internet user. Any voluntary information that User disclose to RO Mega Mart becomes public information and User relinquishes any proprietary rights (including but not limited to the rights of confidentiality and copyright) in such information. User should exercise caution when deciding to include personal or proprietary information in the voluntary information that User submits to RO Mega Mart or uploads on the Platform.{'\n'}
                                •	RO Mega Mart may share User Data with third parties, including without limitation, banks, financial institutions, credit agencies, or vendors to enable such third parties to offer their products or services to such Users. While RO Mega Mart shall endeavour to have in place internal procedures to keep User Data secure from intruders, there is no guarantee that such measures/procedures can eliminate all of the risks of theft, loss or misuse.{'\n'}
                                RO Mega Mart may establish relationships with other parties and websites to offer User the benefit of products and services which RO Mega Mart does not offer. RO Mega Mart may offer you access to these other parties and/or their websites. This Privacy Policy does not apply to the products and services enabled or facilitated by such third parties. The privacy policies of those other parties may differ from RO Mega Mart, and RO Mega Mart has no control over the information that User may submit to those third parties. User should read the relevant privacy policy for those third parties before responding to and availing any offers, products or services advertised or provided by those third parties.{'\n'}
                            </Text>
                        </View>
                        <View style={{ marginTop: -30, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>•	RIGHT TO UPDATE USER DATA{'\n'}</Text>
                        </View>
                        <View style={{ marginLeft: 30, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                                •	Under the applicable laws, User have the right of access to personal information held by RO Mega Mart and to request updating / correcting the information.COOKIES{'\n'}
                                •	RO Mega Mart uses "cookies" to store specific information about User and track User(s) visits to the Sites. A "cookie" is a small amount of data that is sent to User’s browser and stored on User’s device. If User does not deactivate or erase the cookie, each time User uses the same device to access the Platform, our services will be notified of User visit to the Platform and in turn RO Mega Mart may have knowledge of User visit and the pattern of User’s usage.Generally, RO Mega Mart use cookies to identify User and enable RO Mega Mart to i) access User’s Registration Information or Account Information so User do not have to re-enter it; ii) gather statistical information about usage by Users; iii) research visiting patterns and help target advertisements based on User interests; iv) assist RO Mega Mart’s partners to track User visits to the Platform and process orders; and v) track progress and participation on the Platform.User can determine if and how a cookie will be accepted by configuring the browser which is installed in User’s device. If User choose, User can change those configurations. If User reject all cookies by choosing the cookie-disabling function, User may be required to re-enter information on the Platform more often and certain features of the Platform may be unavailable.MINORS{'\n'}
                                •	The Platform and its contents are not targeted to minors (those under the age of 18). However, RO Mega Mart have no way of distinguishing the age of individuals who access our Platform. If a minor has provided RO Mega Mart with personal information without parental or guardian consent, the parent or guardian should contact RO Mega Mart’s Legal Department at the address set out in clause 9 below to remove the information.SECURITY MEASURES{'\n'}
                                •	RO Mega Mart employs commercially reasonable security methods to prevent unauthorized access to the Platform, to maintain data accuracy and to ensure the correct use of the information RO Mega Mart hold. No data transmission over the internet or any wireless network can be guaranteed to be perfectly secure. As a result, while RO Mega Mart tries to protect the information RO Mega Mart hold, RO Mega Mart cannot guarantee the security of any information the User transmits to RO Mega Mart and Users do so at their own risk.CHANGES TO THIS PRIVACY POLICY{'\n'}
                                •	Any changes to this Privacy Policy will be communicated by us posting an amended and restated Privacy Policy on the Platform. Once posted on the Platform the new Privacy Policy will be effective immediately. Your continued use of the Platform shall be deemed to be your acceptance to the provisions of the Privacy Policy. User agree that any information RO Mega Mart hold about User (as described in this Privacy Policy and whether or not collected prior to or after the new Privacy Policy became effective) will be governed by the latest version of the Privacy Policy. GRIEVANCE OFFICER{'\n'}
                                In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:{'\n'}
                            </Text>
                        </View>


                    </ScrollView>
                </View>

                {/* <View style={{flex:0.1}}>
                <View>
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showModal}
                  >
                    <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,}}
                    >
                      <View style={{width:Dimensions.get('window').width-80, height:Dimensions.get('window').height/5, backgroundColor:'#ffffff', alignItems:'center',justifyContent:'center'}}>
                     <View>
                      <Text style={{fontSize:16}}>
                        Please login
                      </Text>
                     </View>
                      <View style={{}}>
                  
                      <TouchableOpacity 
                      onPress={() =>this.setState({showModal:!this.state.showModal})}
                      style={{height:40, width:40, backgroundColor:'#ffffff', alignItems:'center',justifyContent:'center', marginLeft:30, marginTop:15}}
                      >
                        <Text style={{fontSize:16}}>ok</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                    </View>

                  </Modal>
                </View>
        <View style={{position:'absolute',height:50,left:0, width:Dimensions.get('window').width,backgroundColor:'rgba(211,211,211,0.5)',bottom:0, flexDirection: 'row', justifyContent: 'space-around', height: 50, alignItems: 'center', }}>
          <View >
            <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('Verifiedhome')}
             //onPress={() =>this.setState({showModal:!this.state.showModal})}
                onPress={() =>this.setState({showModal:!this.state.showModal})}
           >
              <Entypo name="home" size={35} />

            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
            // onPress={() => this.props.navigation.navigate('Cart')}
            //onPress={() =>this.setState({showModal:!this.state.showModal})}
            onPress={() =>this.setState({showModal:!this.state.showModal})}
            >
              <Ionicons name="cart" size={35} />

            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
            // onPress={() => this.props.navigation.navigate('Support')}
            onPress={() =>this.setState({showModal:!this.state.showModal})}
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

    }

});


