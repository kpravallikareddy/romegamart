import React from 'react';
import { View,BackHandler, AsyncStorage, TextInput, Image, Text, Platform, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../api';

export default class Resetpw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailid: '',
            password:'',
            confirmpw:'',
            showmenu:false,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    componentDidMount() {
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

    resetpw = () => {
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({ "email": this.state.emailid });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        let formdata = new FormData();
        
        formdata.append("email", this.state.emailid);
        formdata.append("password", this.state.password);
        //formdata.append("password_confirm", this.state.confirmpw);
       
       var myHeaders = new Headers();
 myHeaders.append("Content-Type", "multipart/form-data");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

        fetch(BASE_URL+"reset-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status == true) {
                    alert(result.message)
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f0f8ff'
                }}
            >
                <ScrollView>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: 30, marginLeft: 10 }}>
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/logo1.jpg'}}
                    // source={require('../../assets/logo1.jpg')}
                     style={{ height: 50, width: 50, borderRadius: 25, marginLeft: 15 }} />
                    <Text style={{ color: '#00008b', fontSize: 15, lineHeight: 30 }}>Grow with us...</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Fontisto name="unlocked" size={100} color="#2e3191" />
                    {/* rgba(0,0,139,0.8) */}
                </View>

                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 20 }}>
                    <Text style={{ fontSize: 28 }}>
                        Forgot your Password
                </Text>
                    <Text style={{ fontSize: 28 }}>
                        No Worries!!
                </Text>
                </View> */}

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 16 }}>
                    {/* <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light' }}>
                        Reset password link will be sent to your
                </Text> */}
                    {/* <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light' }}>
                        registered email address
                </Text> */}
                <Text style={{ fontSize: 20,marginBottom:30 }}>
                    Reset your password
                </Text>
                    <TextInput
                        placeholder='Enter Your Email id'
                        style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 18, marginTop: 15 }}
                        placeholderTextColor={'#000000'}
                        onChangeText={(text) => this.setState({ emailid: text })}
                        value={this.state.emailid}
                    />
                    <TextInput
                        placeholder='Enter password'
                        style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 18, marginTop: 15 }}
                        placeholderTextColor={'#000000'}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                    {/* <TextInput
                        placeholder='Enter confirm passord'
                        style={{ width: Dimensions.get('window').width - 80, height: 40, backgroundColor: 'rgba(221,221,221,0.5)', borderRadius: 8, textAlign: 'center', fontSize: 18, marginTop: 15 }}
                        placeholderTextColor={'#000000'}
                        onChangeText={(text) => this.setState({ confirmpw: text })}
                        value={this.state.confirmpw}
                    /> */}
                </View>



                <View style={{ marginTop: Dimensions.get('window').height / 11, alignItems: 'center', justifyContent: 'center',marginBottom:40 }}>
                    <TouchableOpacity
                        style={{ height: 40, width: Dimensions.get('window').width - 50, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                       // onPress={() => this.props.navigation.navigate('Kyc')}
                       onPress={()=> this.resetpw()}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 26 }}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
                </ScrollView>
            </View>
        );
    }
}


