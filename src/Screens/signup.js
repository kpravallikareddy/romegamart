import React from 'react';
import {View,BackHandler,AsyncStorage,TextInput, Image,Text,Platform,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { BASE_URL } from '../api';

export default class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state={
         name:'',
         companyname:'',
         emailid:'',
         pincode:'',
         showmenu:false,
         phonenumber:'',
         phonenumber1:'',
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

        console.log('phone number from mobile screen',this.state.phonenumber1);
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

    getregister =() =>{
    
        if(this.state.name == ''){
            alert('name field is required')
        }else if(this.state.companyname == ''){
            alert('company name field is required')
        }else if(this.state.emailid == ''){
            alert('email field is required')
        }else if(this.state.phonenumber1 == ''){
            alert('phone number field is required')
        }
        else if(this.state.pincode == ''){
            alert('pincode field is required')
        }

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "name":this.state.name,
    "company_name":this.state.companyname,
    "pincode":this.state.pincode,
    "email":this.state.emailid,
    "phone":this.state.phonenumber1
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(BASE_URL+"register", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)

      if(result.status === 1){
          AsyncStorage.setItem('userid',JSON.stringify(result.id))
          AsyncStorage.setItem('username',JSON.stringify(this.state.name))
          
        this.props.navigation.navigate('Kyc',{id:result.id})
      }
      else if(result.error){
         // alert(result.error.email[0])
         alert(result.message)
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
        <View style={{alignItems:'flex-start',justifyContent:'center',marginTop:30, marginLeft:10}}>
        {/* source={require('../../assets/logo1.jpg')} */}
            <Image source={{uri: 'https://romegamart.com/third-party/logo.jpeg'}} style={{height:50,width:50,borderRadius:25,marginLeft:15}}/>
            <Text style={{color:'#00008b',fontSize:15,lineHeight:30}}>Grow with us...</Text>
        </View> 

        <View style={{alignItems:'center',justifyContent:'center',marginTop:-30}}>
        {/* source={require('../../assets/2.png')} */}
        <Image source={{uri: 'https://romegamart.com/third-party/38.png'}}  style={{height:150,width:120,}}/>
        </View>
        
        <View style={{marginLeft:5}}>
            <Text style={{fontSize:24,lineHeight:30}}>
                Enter your details to Sign-up
            </Text>
            <Text style={{fontSize:16,lineHeight:30}}>
                Please provide us a few details about yourself
            </Text>
        </View>

        <View style={{alignItems:'center',justifyContent:'center'}}>
            <TextInput 
            placeholder='Enter Your Name'
            style={{width:Dimensions.get('window').width-80,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({name:text})}
            value={this.state.name}
            />
            <TextInput 
            placeholder='Enter Your Company Name'
            style={{width:Dimensions.get('window').width-80,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({companyname:text})}
            value={this.state.companyname}
            />
            <TextInput 
            placeholder='Enter Your Email id'
            style={{width:Dimensions.get('window').width-80,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({emailid:text})}
            value={this.state.emailid}
            />
            <TextInput 
            placeholder='Enter Your Phone number'
            style={{width:Dimensions.get('window').width-80,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({phonenumber1:text})}
            value={this.state.phonenumber1}
            maxLength={10}
            keyboardType='number-pad'
            />
            <TextInput 
            placeholder='Enter Your Pin Code'
            style={{width:Dimensions.get('window').width-80,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({pincode:text})}
            value={this.state.pincode}
            />
        </View>
       
            

            <View style={{marginTop:Dimensions.get('window').height/11,alignItems:'center',justifyContent:'center',marginBottom:0}}>
                <TouchableOpacity
                style={{height:40,width:Dimensions.get('window').width-50,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                onPress={() => this.getregister()}
                >
                <Text style={{color:'#ffffff',fontSize:24}}>
                    Continue
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,marginBottom:40 }}>
                    <Text style={{ fontSize: 20 }}>
                        Already have an account /
                </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={{ fontSize: 20, color: '#00008b', textDecorationLine: 'underline', fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        );
    }
}


