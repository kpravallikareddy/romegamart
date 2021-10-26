import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../api';


export default class Rateus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: '',
            rating: '',
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

    updaterating = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");

        // var raw = JSON.stringify({
        //     "user_id":this.state.userid,
        //     "star":this.state.rating
        // });

        var formdata = new FormData();
        formdata.append("user_id", this.state.userid);
        formdata.append("star", this.state.rating);

        var requestOptions = {
            method: 'POST',
            //headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "rating", requestOptions)
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

    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
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
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                        //onPress={() =>this.props.navigation.navigate('Verifiedhome')}
                        //onPress={() =>this.setState({showmenu:!this.state.showmenu})}
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
                            <View style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Image source={require('../../assets/rate.png')} style={{ height: Dimensions.get('window').height/4, width: Dimensions.get('window').width/2+30, marginBottom:20}} /> */}

                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/rate1.png' }}
                                    // source={require('../../assets/rate1.png')} 
                                    style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width / 3, marginBottom: 20 }} />
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                    Rate Us
                                </Text>
                            </View>
                        </View>

                        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ rating: "1" }, () => this.updaterating())}
                                    style={{ paddingTop: 1 }}
                                >
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/43.png' }}
                                        // source={require('../../assets/43.png')} 
                                        style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 6 + 10, }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ rating: "2" }, () => this.updaterating())}
                                >
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/44.png' }}
                                        // source={require('../../assets/44.png')} 
                                        style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 6 + 10, }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ rating: "3" }, () => this.updaterating())}
                                >
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/45.png' }}
                                        // source={require('../../assets/45.png')} 
                                        style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 6 + 10, }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ rating: "4" }, () => this.updaterating())}
                                >
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/46.png' }}
                                        // source={require('../../assets/46.png')} 
                                        style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 6 + 10, }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ rating: "5" }, () => this.updaterating())}
                                >
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/47.png' }}
                                        // source={require('../../assets/47.png')} 
                                        style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 6 + 10, }} />
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{alignItems:'center',justifyContent:'center',}}>
                    <TouchableOpacity
                    style={{height:Dimensions.get('window').height/15,width:Dimensions.get('window').width/2, backgroundColor:'#2e3191', borderRadius:8, alignItems:'center',justifyContent:'center', marginTop:Dimensions.get('window').height/30}}
                    onPress={() =>this.updaterating()}
                    >
                    <Text style={{fontSize:26, color:'#ffffff'}}>
                       Submit
                    </Text>
                    </TouchableOpacity>
                </View> */}
                        </View>
                        {/* {this.state.showmenu?
                      <View style={{position:'absolute',top:0,left:0,width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,zIndex:1,
             }}>
                  <TouchableOpacity
                        onPress={() =>this.setState({showmenu:!this.state.showmenu})}
                        >
                       
                        <View >
                <View style={{width:Dimensions.get('window').width/2+50,zIndex:2, marginTop:-50,marginBottom:0}}>
                <View style={{height:Dimensions.get('window').height/8, width:Dimensions.get('window').width/2+50, backgroundColor:'#2e3191',borderRightColor:'#000000',borderRightWidth:2}}>
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
                
                <View style={{ width:Dimensions.get('window').width/2+50, backgroundColor:'#ffffff',borderRightColor:'#000000',borderRightWidth:2,height:Dimensions.get('window').height-120}}>
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
                    //onPress={() => this.props.navigation.navigate('Home')}
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
                </View>
                </View>
                </View>
            </TouchableOpacity>
                        </View>
                        :null} */}
                    </ScrollView>

                </View>

                {/* <View style={{flex:0.1}}>
        <View style={{position:'absolute',height:50,left:0, width:Dimensions.get('window').width,backgroundColor:'rgba(211,211,211,0.5)',bottom:0, flexDirection: 'row', justifyContent: 'space-around', height: 50, alignItems: 'center', }}>
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
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                            //onPress={() => this.props.navigation.navigate('Categories')}
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


