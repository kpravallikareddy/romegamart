import React from 'react';
import {View,BackHandler, Image,Text,Platform,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
export default class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    setmargintop =() => {
        if(Platform.OS === 'ios') {
            this.setState({margintop:Dimensions.get('window').height-80})
        }
        else if(Platform.OS === 'android') {
            this.setState({margintop:Dimensions.get('window').height-80})
        }
    }


    componentDidMount(){
        console.log('splash')
        this.setmargintop();
        setTimeout(() => {
           // this.props.navigation.navigate('Welcome')
        }, 2000);
      
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
    

    render() {
        return (
            <View
        style={{ flex: 1,
            alignItems: 'center', justifyContent:'center',backgroundColor:'rgba(224,255,255,0.4)'
            }}
        >   
        <ScrollView>
        <View style={{marginTop:Dimensions.get('window').height/4,alignItems:'center',justifyContent:'center'}}>
            
            <Image source={{uri: 'https://romegamart.com/third-party/logo1.jpg'}} style={{height:100,width:100,borderRadius:50}}/>
            <Text style={{color:'#2e3191',fontSize:24,lineHeight:30}}>Grow with us...</Text>
            </View> 
            <View style={{alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/15}}>
                <Text style={{fontSize:24,}}>
                    Welcome to
                </Text>
                <Text style={{fontSize:24,textAlign:'center'}}>
                    India's largest B2B RO Platform
                </Text>

            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:15}}>
                <Text style={{fontSize:14,lineHeight:24}}>
                    Retailers | Traders | Wholesalers
                </Text>
                <Text style={{fontSize:12,lineHeight:24}}>
                    Distributors | Manufacturers | Importers
                </Text>
            </View>

            <View style={{marginTop:Dimensions.get('window').height/10,marginBottom:40}}>
                <TouchableOpacity
                style={{height:40,width:Dimensions.get('window').width-50,backgroundColor:'#2e3191',borderRadius:8,alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.props.navigation.navigate('Mobile')}
                >
                <Text style={{color:'#ffffff',fontSize:20}}>
                    Get Started
                </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        );
    }
}


