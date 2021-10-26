import React from 'react';
import { View, BackHandler, FlatList, ActivityIndicator, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default class Deals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listofdeals: [],
            showloader: false,
            userid: '',
            showmenu: false,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        await this.getdeals();

        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

        //     return () =>
        //       // clear/remove event listener
        //       BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

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


    UNSAFE_componentWillMount() {
        // this.getdeals();
    }

    clearasyncdata = async () => {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }

    getdeals = () => {
        console.log('1')
        // await delay(5000);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "todaydeals", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('deals', result)

                for (let i = 0; i < result.today_deals.length; i++) {

                    this.state.listofdeals.push(result.today_deals[i])
                }
                this.setState({ showloader: !this.state.showloader })
                // console.log('deals1', this.state.listofdeals)

            })
            .catch(error => console.log('error', error));
    }

    renderdeals = () => {
        //console.log('2')
        // console.log('deals',this.state.listofdeals)
        return this.state.listofdeals.map((deals, index) => {
            return (
                <View >
                    {/* <View style={{ width: Dimensions.get('window').width, backgroundColor: '#87ceeb',alignItems:'center',justifyContent:'center',marginBottom:70 }}> */}
                    <View key={index} style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: -15 }}>
                        <TouchableOpacity>
                            <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5, alignItems: 'center', justifyContent: 'center' }}>
                                {/* source={require('../../assets/24.png')} */}
                                <Image key={index} source={{ uri: deals.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3, }} />
                                <Text style={{ color: '#ff0000' }}>
                                    {deals.title}
                                    {/* at (({deals.previous_price}-{deals.price})/{deals.previous_price})*100% off   */}
                                    {/* Faucets at 20% off for weekend */}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', }}>
                            <Image key={index} source={{ uri: deals.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3 }} />
                            <Text style={{ color: '#ff0000' }}>
                                {/* Pumps at 20% off for weekend */}
                                {deals.title}
                                {/* at (({deals.previous_price}-{deals.price})/{deals.previous_price})*100% off   */}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={{flexDirection:'row'}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/26.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                     Tanks at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff',borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center'  }}>
                                <Image source={require('../../assets/27.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Housings at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,marginBottom:30}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>
                            
                        </View> */}
                </View>

            )
        })
    }

    discount(x, y) {
        let z = Math.round(((x - y) / y) * 100)
        return z
    }


    renderdeal() {
        return (
            <View >
                {/* <TouchableOpacity
                   // onPress={() => this.props.navigation.navigate('Deals')}
                > */}
                <View >
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item, index) => String(item.product_id)}
                        data={this.state.listofdeals}
                        renderItem={({ item, index }) => {
                            //console.log('deals inside flatlist', item)
                            return (
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: 0 }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Productdetails', { id: item.product_id })}
                                    >
                                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image key={item.product_id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, }} />
                                        </View>
                                        <View
                                            style={{ backgroundColor: 'rgba(88,126,190,1)', height: 44, width: Dimensions.get('window').width / 2 - 40, marginTop: 0, alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'center', flexWrap: 'wrap' }}>
                                                {/* {item.title} at  {this.discount(item.previous_price, item.price)}% off for the weekend */}
                                                {item.description}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            )
                        }}

                    />
                </View>
                {/* </TouchableOpacity> */}
            </View>
        )
    }


    render() {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
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
                        //onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
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

                        <View style={{ marginLeft: 10, marginTop: 20, marginBottom: 20, }}>
                            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                                Today's Deals
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                Great Savings.Shop from our deal of the day
                            </Text>
                        </View>

                        <View style={{ marginTop: Dimensions.get('window').height / 18 }}>
                            {/* width: Dimensions.get('window').width - 80, height: 35,  */}
                            <View style={{ backgroundColor: 'rgba(17,161,245,0.8)', alignItems: 'center', justifyContent: 'center', top: -25, marginLeft: 20, position: 'absolute', zIndex: 1, paddingBottom: 5, paddingTop: 5, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                                    Deals and offers of the day
                                </Text>
                            </View>


                            <View style={{ width: Dimensions.get('window').width, backgroundColor: 'rgba(100,215,255,.1)', alignItems: 'center', justifyContent: 'center', paddingBottom: 30 }}>

                                <View>
                                    {/* {this.state.showloader? */}
                                    {this.renderdeal()}
                                    {/* :
                            <View style={{justifyContent:'center',alignItems:'center', height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}}>
                            <ActivityIndicator size="large" color="#2e3191" />
                            </View>
                            } */}
                                </View>
                                {/* <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,marginTop:30 }}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3, }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/26.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                     Tanks at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff',borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center'  }}>
                                <Image source={require('../../assets/27.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Housings at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,marginBottom:30}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>*/}

                            </View>
                        </View>

                    </ScrollView>
                </View>
                {/* <View style={{flex:0.1}}>
                    <View style={{ position:'absolute',height:60,left:0, width:Dimensions.get('window').width,backgroundColor:'#ffffff',bottom:0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',borderTopColor:'#DDDDDD',borderTopWidth:3 }}>
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


