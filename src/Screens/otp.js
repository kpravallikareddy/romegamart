import React from 'react';
import {View,BackHandler,AsyncStorage,TextInput, Image,Text,Platform,Dimensions, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { BASE_URL } from '../api';

export default class Otp extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
         phonenumber:'',
         otp:'',
         optInputs1:'',
         optInputs2:'',
         optInputs3:'',
         optInputs4:'',
         otpNumber:'',
         unverifieduserloggedin:'',
         verifieduserloggedin:'',
         showmenu:false,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

   async componentDidMount(){
       await AsyncStorage.getItem('phonenumber').then((phonenumber) => {
            if(phonenumber){
                this.setState({phonenumber1: phonenumber});
                console.log(this.state.phonenumber1);
            }
        });

       await AsyncStorage.getItem('unverifieduserloggedin').then((unverifieduserloggedin) => {
            if(unverifieduserloggedin){
                this.setState({unverifieduserloggedin: unverifieduserloggedin});
                console.log('unverifiedlogin',this.state.unverifieduserloggedin);
            }
        });

        console.log('unverifiedlogin',this.state.unverifieduserloggedin);

       await AsyncStorage.getItem('verifieduserloggedin').then((verifieduserloggedin) => {
            if(verifieduserloggedin){
                this.setState({verifieduserloggedin: verifieduserloggedin});
                console.log('verifiedlogin',this.state.verifieduserloggedin);
            }
        });

        console.log('verifiedlogin',this.state.verifieduserloggedin);

        await  AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
               // console.log('userid',this.state.userid);
            }
        });
        console.log('userid',this.state.userid);

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

    verifyotp = async () => {
     await this.setState({otp:this.state.optInputs1+this.state.optInputs2+this.state.optInputs3+this.state.optInputs4})
       console.log('otp',this.state.otp)
        console.log('phone', this.state.phonenumber1)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "mobile_number": this.state.phonenumber1, "otp": this.state.otp });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BASE_URL+"verifymobile-OTP", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success === 1) {
                    // if(this.state.unverifieduserloggedin === 'unverifieduserloggedin' && this.state.userid){
                    //     this.props.navigation.navigate('Unverifiedhome')
                    // }
                    // else if(this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid){
                    //     this.props.navigation.navigate('Verifiedhome')
                    // }
                    if(this.state.userid){
                        if(this.state.verifieduserloggedin === 'verifieduserloggedin' && this.state.userid){
                                this.props.navigation.navigate('Verifiedhome')
                            }
                            else{
                    this.props.navigation.navigate('Login',{id:this.state.userid})
                            }
                    }
                    else {
                        this.props.navigation.navigate('Signup')
                    }
                }
                else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    

    getotp = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "mobile_number": this.state.phonenumber1 });

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
                if (result.success == 1) {
                    alert(result.message)
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
        <View style={{alignItems:'center',justifyContent:'center',marginTop:30}}>
            {/* <Entypo name="raft-with-circle" size={80} color="#00008b" /> source={require('../../assets/logo1.jpg')}*/}
            <Image source={{uri: 'https://romegamart.com/third-party/logo1.jpg'}} style={{height:100,width:100,borderRadius:50}}/>
            <Text style={{color:'#00008b',fontSize:18,lineHeight:30}}>Grow with us...</Text>
        </View> 
        
        <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
            <Text style={{fontSize:26,lineHeight:60}}>
                Verify Mobile Number
            </Text>
            <Text style={{fontSize:18,lineHeight:30}}>
                Enter OTP sent to your number
            </Text>
        </View>

       
            <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
              <TextInput
                style={{height:50,width:50,borderColor:'#00008b',borderWidth:1,marginRight:10, fontSize:20,textAlign:'center'}}
                ref="input_1"
                numeric
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onChangeText={(value) => {this.setState({optInputs1:value})
                if (value) this.refs.input_2.focus();
                }}
                
              />
              <TextInput
                style={{height:50,width:50,borderColor:'#00008b',borderWidth:1,marginRight:10,fontSize:24,textAlign:'center'}}
                ref="input_2"
                numeric
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onChangeText={(value) => {this.setState({optInputs2:value})
                if (value) this.refs.input_3.focus();
                }}
                
              />
              <TextInput
                style={{height:50,width:50,borderColor:'#00008b',borderWidth:1,marginRight:10,fontSize:24,textAlign:'center'}}
                ref="input_3"
                numeric
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onChangeText={(value) => {this.setState({optInputs3:value})
                if (value) this.refs.input_4.focus();
                }}
               
              />
              <TextInput
                style={{height:50,width:50,borderColor:'#00008b',borderWidth:1,fontSize:24,textAlign:'center'}}
                ref="input_4"
                numeric
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onChangeText={(value) => {this.setState({optInputs4:value})
                // if (value) this.refs.input_.focus();
                }}
              />
            </View>
            
            <View style={{marginTop:Dimensions.get('window').height/15,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16}}>
                    In case you have not received it
                </Text>

                <TouchableOpacity 
                style={{marginTop:10}}
                onPress={() =>this.getotp()}
                >
                    <Text style={{fontSize:20, color:'#00008b',fontWeight:'bold',lineHeight:30}}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{alignItems:'flex-end',marginTop:5,marginBottom:-15}}>
            {/* source={require('../../assets/4.png')} */}
            <Image source={{uri: 'https://romegamart.com/third-party/4.png'}} style={{height:150,width:100}}/>
            </View>

            <View style={{marginTop:Dimensions.get('window').height/40,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity
                style={{height:40,width:Dimensions.get('window').width/3,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                onPress={() => this.verifyotp()}
                >
                <Text style={{color:'#ffffff',fontSize:24}}>
                    Submit
                </Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>

            {/* <View style={{alignItems:'center',justifyContent:'center', marginTop:20,marginBottom:40}}>
                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Signup')}
                style={{height:40,width:Dimensions.get('window').width/4,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                >
                    <Text
                    style={{color:'#ffffff',fontSize:24}}
                    >Skip</Text>
                </TouchableOpacity>
            </View> */}

            </ScrollView>
        </View>
        );
    }
}


