import React from 'react';
import { View, BackHandler, ActivityIndicator, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { BASE_URL } from '../api';
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class Addaddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            addressline1: '',
            addressline2: '',
            city: '',
            statename: '',
            pincode: '',
            phonenumber: '',
            userid: '',
            addresslist: [],
            id: '',
            showloader: false,
            showmenu: false,
            listofstateswithids: [],
            listofstates: [],
            listofcities: [],
            showstate:false,
            showcity:false,
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
        await this.getaddress();
        this.getstate();
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


    addresssave = () => {
        var formdata = new FormData();
        formdata.append("user_id", this.state.userid);
        formdata.append("city", this.state.city);
        formdata.append("state", this.state.statename);
        formdata.append("zipcode", this.state.pincode);
        formdata.append("address_line1", this.state.addressline1);
        formdata.append("full_name", this.state.name);
        formdata.append("address_line2", this.state.addressline2);
        formdata.append("mobile", this.state.phonenumber);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/addresssave", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                    this.setState({ showloader: !this.state.showloader })
                    this.getaddress();
                }
                else {
                    alert(result)
                }
            })
            .catch(error => console.log('error', error));
    }



    saveaddress = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "full_name": this.state.name,
            "user_id": this.state.userid,
            "city": this.state.city,
            "zip": this.state.pincode,
            "address_line1": this.state.addressline1,
            "address_line2": this.state.addressline2,
            "mobile": this.state.phonenumber,
            "state": this.state.statename
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BASE_URL + "addressupdate/" + this.state.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
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


    deleteaddress = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "user_id": this.state.userid });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BASE_URL + "deleteaddress/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                }
                else if (result.status == false) {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    getaddress = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json'
            },
        };

        fetch(BASE_URL + "myaddress/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.state.addresslist.length = 0
                if (result.status == true) {
                    for (let i = 0; i < result.address_list.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.addresslist.push(result.address_list[i])
                    }

                    this.setState({ showloader: !this.state.showloader })
                    console.log('address list', this.state.addresslist)
                }
                else if (result.status == false) {
                    //this.setState({showemptylist:true})
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
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
                        statename: result.data.state,
                        pincode: result.data.zip,
                        gst: result.data.gst
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    renderaddress = () => {
        console.log('address list1', this.state.addresslist)
        return this.state.addresslist.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => console.log('addressiddd-----',item.id), AsyncStorage.setItem('addressid', (item.id).toString()), AsyncStorage.setItem('name', (item.name)), AsyncStorage.setItem('addressline1', (item.address_line1)), AsyncStorage.setItem('addressline2', (item.address_line2)), AsyncStorage.setItem('city', (item.city)), AsyncStorage.setItem('state', (item.state)), AsyncStorage.setItem('zipcode', (item.zipcode)),() => this.props.navigation.navigate('Payment')}  //() => this.props.navigation.navigate('Payment') console.log('addressid---',item.id),
                    >
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width - 50, justifyContent: 'center', marginTop: 10, borderRadius: 10, borderColor: 'rgba(128,131,190,1)', borderWidth: 2 }}>
                            {/* <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width - 80, backgroundColor: 'rgba(135,206,235,0.5)', }}> */}
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline', color: 'rgba(60,63,134,1)' }}>
                                    {/* Ankur Rohilla */}
                                    {item.name}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'rgba(60,63,134,1)' }}>
                                    {/* 27, New Rajdhani enclave */}
                                    {item.address_line1},{item.address_line2}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'rgba(60,63,134,1)' }}>
                                    {/* Preet Vihar */}
                                    {item.city}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'rgba(60,63,134,1)' }}>
                                    {/* Delhi - 110092 */}
                                    {item.state} - {item.zipcode}
                                </Text>
                            </View>
                            {/* </View> */}
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    clearasyncdata = async () => {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })

        this.props.navigation.navigate('Login')
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
                this.setState({listofstates:[],listofstateswithids:[]})
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
                this.setState({listofcities:[]})
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
                                            // source={require('../../assets/sidebar.jpeg')}
                                            source={{ uri: 'https://romegamart.com/third-party/sidebar.jpeg' }}
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
                        // source={require('../../assets/logo.jpeg')} 
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
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
                            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('Menu')}
                            onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        >
                            <Entypo name="menu" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView>
                        <View>
                            <View style={{ marginTop: 10, marginBottom: 10 }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 40, width: Dimensions.get('window').width / 3 + 50, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'rgba(60,63,134,1)' }}>
                                        <Text style={{ fontSize: 24, color: '#ffffff' }}>
                                            Add Address
                                        </Text>
                                    </View>
                                    <View style={{ height: 10, width: Dimensions.get('window').width / 2 + 50, backgroundColor: 'rgba(60,63,134,1)' }}>

                                    </View>
                                </View>

                            </View>

                            <View style={{ margin: 10 }}>
                                <Text>
                                    Please select a address and proceed to payment
                                </Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Full Name'
                                    style={styles.text}
                                    placeholderTextColor={'rgba(60,63,134,1)'}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={this.state.name}
                                />
                                <TextInput
                                    placeholder='Address line 1'
                                    style={styles.text}
                                    placeholderTextColor={'rgba(60,63,134,1)'}
                                    onChangeText={(text) => this.setState({ addressline1: text })}
                                    value={this.state.addressline1}
                                />
                                <TextInput
                                    placeholder='Address line 2'
                                    style={styles.text}
                                    placeholderTextColor={'rgba(60,63,134,1)'}
                                    onChangeText={(text) => this.setState({ addressline2: text })}
                                    value={this.state.addressline2}
                                />
                                <View style={{ flexDirection: 'row', marginLeft: 0, marginRight: 0 }}>
                                    {/* <TextInput
                                    placeholder='City'
                                    style={styles.textintips}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ city: text })}
                                    value={this.state.city} width: Dimensions.get('window').width / 3 - 20,
        height: 40,
        backgroundColor: 'rgba(173,216,230,0.3)',
                                /> */}
                                    <View style={{ height: 40, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center', flexDirection: 'row', marginTop: 0, marginLeft: 5, marginRight: 10 }}>
                                        <ModalDropdown
                                            style={{ width: Dimensions.get('window').width / 3 - 20, height: 40, borderWidth: 2, borderColor: 'rgba(60,63,134,1)', justifyContent: 'center', marginRight: Dimensions.get('window').width / 6 }}
                                            options={this.state.listofstateswithids}
                                            dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                                            dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                                            textStyle={{ fontSize: 18, marginLeft: 10, color: 'rgba(60,63,134,1)' }}
                                            renderRow={this.renderStateCodeRow.bind(this)}
                                            renderButtonText={(rowData) => this.renderButtonText(rowData)}
                                            onSelect={(idx, value) =>this.setState({showstate:true},()=> this.getcity(value))}
                                            defaultValue={"State"}
                                        />
                                        {this.state.showstate?
                                        <View>
                                        </View>
                                        :
                                        <View style={{ position: "absolute", right: 10, top: 10 }}>
                                            {/* <Text>▼</Text> */}
                                            <Entypo name="chevron-thin-down" size={15} />
                                        </View>
                                        }
                                    </View>
                                    <View style={{ height: 40, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center', flexDirection: 'row', marginTop: 0, marginRight: 10 }}>
                                        <ModalDropdown
                                            style={{ width: Dimensions.get('window').width / 3 - 20, height: 40, justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(60,63,134,1)' }}
                                            options={this.state.listofcities}
                                            onSelect={(value) => this.setState({showcity:true, city: (String(this.state.listofcities[value])) })}    //console.log('val',(String(this.state.documentslist[value]))
                                            dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                                            dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                                            textStyle={{ fontSize: 18, marginLeft: 10, color: 'rgba(60,63,134,1)' }}
                                            // renderRow={this.renderStateCodeRow.bind(this)}
                                            //                 renderButtonText={(rowData)=>this.renderButtonText(rowData)}
                                            //                 onSelect={(idx, value)=> this.getcity(value)}
                                            defaultValue={"City"}
                                        />
                                        {this.state.showcity?
                                        <View>
                                        </View>
                                        :
                                        <View style={{ position: "absolute", right: 20, top: 10 }}>
                                            {/* <Text>▼</Text> */}
                                            <Entypo name="chevron-thin-down" size={15} />
                                        </View>
                                        }
                                    </View>
                                    {/* <TextInput
                                    placeholder='State'
                                    style={styles.textintips}
                                    placeholderTextColor={'#000000'}
                                    onChangeText={(text) => this.setState({ statename: text })}
                                    value={this.state.statename}
                                /> */}
                                    <TextInput
                                        placeholder='Pincode'
                                        style={styles.textintips}
                                        placeholderTextColor={'rgba(60,63,134,1)'}
                                        onChangeText={(text) => this.setState({ pincode: text })}
                                        value={this.state.pincode}
                                    />
                                </View>
                                <TextInput
                                    placeholder='Phone no'
                                    style={styles.text}
                                    placeholderTextColor={'rgba(60,63,134,1)'}
                                    onChangeText={(text) => this.setState({ phonenumber: text })}
                                    value={this.state.phonenumber}
                                />

                                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                        //onPress={() => this.saveaddress()}
                                        onPress={() => this.addresssave()}
                                    >
                                        <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                            Add address
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#008000', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 22, color: '#ffffff' }}>
                                        Save Address
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ height: 40, width: Dimensions.get('window').width / 3, backgroundColor: '#808080', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                    onPress={() => this.deleteaddress()}
                                >
                                    <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                        Clear all
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                {/* <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 50, backgroundColor: 'rgba(173,216,230,0.3)', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width - 80, backgroundColor: 'rgba(135,206,235,0.5)', }}> */}
                                {this.state.showloader ?
                                    this.renderaddress()
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <ActivityIndicator size="large" color="#2e3191" />
                                    </View>
                                }
                                {/* <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                            Ankur Rohilla
                                        </Text>
                                        <Text style={{ fontSize: 20 }}>
                                            27, New Rajdhani enclave
                                        </Text>
                                        <Text style={{ fontSize: 20 }}>
                                            Preet Vihar
                                        </Text>
                                        <Text style={{ fontSize: 20 }}>
                                            Delhi - 110092
                                        </Text>
                                    </View> */}
                                {/* </View>
                            </View> */}
                            </View>

                            <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                                <TouchableOpacity
                                    style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#DD0000', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                // onPress={() => this.getregister()}
                                >
                                    <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                        Done
                                    </Text>
                                </TouchableOpacity>
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
                                //onPress={() => this.props.navigation.navigate('Categories')}
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
        width: Dimensions.get('window').width - 40,
        height: 40,
        // backgroundColor: 'rgba(173,216,230,0.3)',
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'rgba(60,63,134,1)',
    },
    textintips: {
        width: Dimensions.get('window').width / 3 - 20,
        height: 40,
        // backgroundColor: 'rgba(173,216,230,0.3)',
        fontSize: 18,
        marginBottom: 15,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'rgba(60,63,134,1)',
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


