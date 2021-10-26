import React from 'react';
import {View,BackHandler, AsyncStorage,TextInput, Image,Text,Platform,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { BASE_URL } from '../api';

import RnSmsRetriever from "rn-sms-retriever";

export default class Mobile extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
         phonenumber:'',
         showmenu:false,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    

   async componentDidMount(){


    await this.innerAsync()
      // await this._onPhoneNumberPressed();
      //  console.log('splash')
    
        // setTimeout(() => {
        //    // this.props.navigation.navigate('Welcome')
        // }, 2000);
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

    _onPhoneNumberPressed = async () => {
        try {
          const phoneNumber = await SmsRetriever.requestPhoneNumber();
          //console.log('phonenumber', phoneNumber)
          let phone = phoneNumber.toString();
          let num = phone.slice(3);
          console.log('phonenumber', num)
          this.setState({phonenumber:num})
        } catch (error) {
          console.log(JSON.stringify(error));
        }
       };
    
      async innerAsync() {
        // get list of available phone numbers
        const selectedPhone = await RnSmsRetriever.requestPhoneNumber();
        console.log('Selected Phone is : ' + selectedPhone);
        let phone = selectedPhone.toString();
          let num = phone.slice(3);
          console.log('phonenumber', num)
          this.setState({phonenumber:num})
        // get App Hash
        // const hash = await RnSmsRetriever.getAppHash();
        // console.log('Your App Hash is : ' + hash);
        // // set Up SMS Listener;
        // smsListener = DeviceEventEmitter.addListener(RnSmsRetriever.SMS_EVENT, (data: any) => {
        //   console.log(data, 'SMS value');
        // });
        // start Retriever;
        //await RnSmsRetriever.startSmsRetriever();
      }



    verifyinput = async () => {
        console.log('phonenumber:',this.state.phonenumber.length)
        if (this.state.phonenumber.length == 10) {
            await  this.getotp();
            //onPress={() => this.props.navigation.navigate('newsdetails',{id:item.id})}
           // this.props.navigation.navigate('otp', { mobilenumber: this.state.phonenumber })
        }
        else {
            alert('please enter 10 digit phone number')
        }
    }

    getotp = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "mobile_number": this.state.phonenumber });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BASE_URL+"mobile-otp", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success === 1) {
                    AsyncStorage.setItem('phonenumber', this.state.phonenumber)
             //{ mobilenumber: this.state.phonenumber }
                    this.props.navigation.navigate('Otp')
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <View
        style={{ flex: 1,
            backgroundColor:'#f0f8ff'
            }}
        >   
        <ScrollView>
        <View style={{alignItems:'center',justifyContent:'center',marginTop:30,}}>
            {/* <Entypo name="raft-with-circle" size={150} color="#00008b" />  source={require('../../assets/5.png')}*/}
            <Image source={{uri: 'https://romegamart.com/third-party/5.png'}} style={{height:200,width:200,}}/>
        </View> 
        
        <View style={{margin:25}}>
            <Text style={{fontSize:24,fontWeight:'bold',lineHeight:30}}>
                Trusted By
            </Text>
            <Text style={{fontSize:24,fontWeight:'bold',}}>
                1 lakh+ Retailers
            </Text>
        </View>

        <View style={{alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection: 'row', height: 40, width: Dimensions.get('window').width - 40,borderBottomColor:'#000000',borderBottomWidth:1}}>
            <Text style={{paddingTop:5,fontSize:22}}>
                +91
            </Text>
            <TextInput 
            style={{height:46,flex:1, fontSize:16,marginLeft:10}}
            placeholder='Enter 10 digit number'
            value={this.state.phonenumber}
            onChangeText={(text) => this.setState({ phonenumber: text })}
            maxLength={10}
            keyboardType='number-pad'
            />
        </View>
        </View>


            <View style={{marginTop:Dimensions.get('window').height/10,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity
                style={{height:40,width:Dimensions.get('window').width-50,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                onPress={() => this.verifyinput()}
                >
                <Text style={{color:'#ffffff',fontSize:20}}>
                    Get OTP
                </Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{alignItems:'center',justifyContent:'center', marginTop:20}}>
                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Otp')}
                style={{height:40,width:Dimensions.get('window').width/4,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                >
                    <Text
                    style={{color:'#ffffff',fontSize:24}}
                    >Skip</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/12,marginBottom:40}}>
                <Text>
                    By continuing, you agree that you have read and
                </Text>
                <View style={{flexDirection:'row'}}>

                <Text> accept our </Text>
                    <TouchableOpacity 
                    style={{paddingTop:0}}
                    onPress={() => this.props.navigation.navigate('Terms')}
                    >
                        <Text style={{textDecorationLine:'underline',}}>
                           
                            Terms & Conditions</Text> 
                            </TouchableOpacity> 
                            <Text>
                            {' '}and{' '}
                            </Text>
                            <TouchableOpacity 
                    style={{paddingTop:0}}
                    onPress={() => this.props.navigation.navigate('Policy')}
                    >
                            <Text style={{textDecorationLine:'underline',}}>
                             Privacy policy
                </Text>
                </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
        );
    }
}


