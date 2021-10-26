import React, { useEffect } from 'react';
import {View,BackHandler, Image,Text,Platform,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Smartlook from 'smartlook-react-native-wrapper';


Smartlook.setupAndStartRecording("3d0c801590ef29f01ca297cb801c1b33048e1179");


// smartlook key = 3d0c801590ef29f01ca297cb801c1b33048e1179
// const Splash = ({navigation}) => {
//     navigation.setOptions({ tabBarVisible: false })

//     useEffect(() =>{
//         setTimeout(() => {
//                 navigation.navigate('welcome')
//             }, 2000);
//     })
//     return (
//         <View
//         style={{ flex: 1,
//             alignItems: 'center', justifyContent:'center',backgroundColor:'#00008b'
//             }}
//         >
//             <Entypo name="raft-with-circle" size={100} color="#a9a9a9" />
//             <Text style={{color:'#87cefa',fontSize:24,lineHeight:30}}>Grow with us...</Text>
//         </View>
//     );
// };
// export default Splash;

export default class Splash extends React.Component {
    constructor(props){
        super(props)
        this.state={
         margintop:0,
        }
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
            this.props.navigation.navigate('Welcome')
        }, 2000);

        // BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

        // return () =>
        //   // clear/remove event listener
        //   BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

    }

    backActionHandler = () => {
        BackHandler.exitApp();
    }
      


    render() {
        return (
            <View
        style={{ flex: 1,
            alignItems: 'center', justifyContent:'center',backgroundColor:'#2e3191'
            }}
        >
            <Image source={{uri: 'https://romegamart.com/third-party/logo.jpeg'}} style={{height:100,width:100,borderRadius:50}}/>
            <Text style={{color:'#87cefa',fontSize:24,lineHeight:30}}>Grow with us...</Text>
        </View>
        );
    }
}

