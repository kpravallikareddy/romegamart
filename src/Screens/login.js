import React from 'react';
import {View,BackHandler,AsyncStorage,TextInput, Image,Text,Platform,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { BASE_URL } from '../api';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
        
         emailid:'',
         password:'',
         showmenu:false,
         hidepassword:true,
         emailStatus:'onFocus',
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    componentDidMount(){
      // this.getlogin();
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

    login =() => {

        if(this.state.password == ''){
            alert('The password field is required')
        } else if(this.state.email == ''){
            alert('The email field is required')
        }
        var formdata = new FormData();
formdata.append("email",this.state.emailid);
formdata.append("password", this.state.password);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://romegamart.com/api/login", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)

      if(result.status === 1){
        console.log('userid',result.user_id)
        AsyncStorage.setItem('userid',JSON.stringify(result.user_id))
        AsyncStorage.setItem('unverifieduserloggedin','unverifieduserloggedin')
          this.props.navigation.navigate('Unverifiedhome')  
        } 
       else if(result.status === 2 ){
        console.log('userid',result.user_id)
        AsyncStorage.setItem('userid',JSON.stringify(result.user_id))
        AsyncStorage.setItem('verifieduserloggedin','verifieduserloggedin')
        this.props.navigation.navigate('Verifiedhome')
       }
        else if(result.success.status == false) {
          alert(result.success.message)
        } 
    
    })
  .catch(error => console.log('error', error));
    }

    getlogin = () => {

        if(this.state.password == ''){
            alert('The password field is required')
        } else if(this.state.email == ''){
            alert('The email field is required')
        }

        console.log('test');
        console.log('pw',this.state.password)
    
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"email":this.state.email,"password":this.state.password});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(BASE_URL+"login", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log("login---",result)
      if(result.status === 1){
        console.log('userid',result.user_id)
        AsyncStorage.setItem('userid',JSON.stringify(result.user_id))
        AsyncStorage.setItem('unverifieduserloggedin','unverifieduserloggedin')
          //this.props.navigation.navigate('Unverifiedhome')  
        } 
       else if(result.status === 2 ){
           console.log('userid',result.user_id)
        AsyncStorage.setItem('userid',JSON.stringify(result.user_id))
        AsyncStorage.setItem('verifieduserloggedin','verifieduserloggedin')
        //this.props.navigation.navigate('Verifiedhome')
       }
        else if(result.success.status == false) {
          alert(result.success.message)
        } 
    //   else if(result.error){
    //       alert(result.error.password[0])
    //   }
})
  .catch(error => console.log('error', error));
}

passwordvisibility = () => {
    this.setState({hidepassword:!this.state.hidepassword})
}

    render() {
        return (
            <View
        style={{ flex: 1,
            backgroundColor:'#f0f8ff'
            }}
        >   
        <ScrollView>
        <View style={{marginTop:30, marginLeft:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
           <View>
            {/* <Entypo name="raft-with-circle" size={80} color="#00008b" /> */}
            <Image 
             source={{uri: 'https://romegamart.com/third-party/logo1.jpg'}}
            // source={require('../../assets/logo1.jpg')} 
            style={{height:50,width:50,borderRadius:25,marginLeft:15}}/>
            <Text style={{color:'#00008b',fontSize:15,lineHeight:30}}>Grow with us...</Text>
            </View>
            <View style={{marginRight:10}}>
                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Unverifiedhome')}
                style={{height:40,width:Dimensions.get('window').width/4,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                >
                    <Text
                    style={{color:'#ffffff',fontSize:24}}
                    >Skip</Text>
                </TouchableOpacity>
            </View>
        
        </View> 

        <View style={{alignItems:'center',justifyContent:'center',marginTop:-30}}>
        <Image 
         source={{uri: 'https://romegamart.com/third-party/38.png'}}
        // source={require('../../assets/38.png')} 
        style={{height:150,width:120,}}/>
        </View>
        
        

        <View style={{alignItems:'center',justifyContent:'center'}}>
            <TextInput 
            placeholder='Enter Your Email Id'
            style={{width:Dimensions.get('window').width-70,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:15,}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({emailid:text})}
            value={this.state.emailid}
            />
            <View style={{flexDirection:'row'}}>
            <TextInput 
            placeholder='Enter Your Password'
            //secureTextEntry={(this.state.emailid.length <= 0 && !this.state.hidepassword) ? false : true}
            secureTextEntry={this.state.hidepassword?true:false}
            style={{width:Dimensions.get('window').width-70,height:40,backgroundColor:'rgba(221,221,221,0.5)',borderRadius:8,textAlign:'center',fontSize:16,marginTop:25,}}
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({password:text})}
            value={this.state.password}
            />
            <View style={{position:'absolute',left:Dimensions.get('window').width-100}}> 
            <TouchableOpacity
                style={{height:40,width:20,alignItems:'center',justifyContent:'center',marginTop:25}}
                onPress={this.passwordvisibility}
                >
                    {(this.state.hidepassword)?
                    <Ionicons name="eye" size={20} />
                    :
                    <Ionicons name="eye-off" size={20} />
                    }
                    {/* <Image source={this.state.hidepassword?require('../../assets/showpw.png'):require('../../assets/hidepw.png')} style={{height:20,width:20, marginLeft:0 }} /> */}
                </TouchableOpacity>
                </View>
                </View>
        </View>
       

        <View style={{marginTop:Dimensions.get('window').height/15,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20}}>
                    Forgot Your Password ?
                </Text>

                <TouchableOpacity 
                style={{marginTop:10}}
                onPress={()=> this.props.navigation.navigate('Forgotpw')}
                >
                    <Text style={{fontSize:20, color:'#00008b',fontWeight:'bold',lineHeight:30,textDecorationLine:'underline'}}>
                        Reset Password
                    </Text>
                </TouchableOpacity>
            </View>
            

            <View style={{marginTop:Dimensions.get('window').height/11,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity
                style={{height:40,width:Dimensions.get('window').width-50,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                onPress={() => this.login()}
                >
                <Text style={{color:'#ffffff',fontSize:24}}>
                    Login
                </Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,marginBottom:40}}>
                <Text style={{fontSize:20}}>
                    Create a New Account /
                </Text>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}
                >
                    <Text style={{fontSize:20,color:'#00008b',textDecorationLine:'underline',fontWeight:'bold'}}>Signup</Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>
            </ScrollView>
        </View>
        );
    }
}


