import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

export default styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position : 'absolute',
        left: 0,
        top: 0,
        width : width, 
        height : height,
        paddingTop : 10,
        paddingLeft : 10,
        paddingRight : 10,
        paddingBottom : 10
    },
    label:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'bold'
    },
    value:{
      color:'#ffffff',
      fontSize:18
    },
    labelview:{
        //height:30,
        width:Dimensions.get('window').width/2,
        borderBottomColor:'#ffffff',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderRightColor:'#ffffff',
        borderRightWidth:3,
        paddingLeft:10,
    },
    valueview:{
      width:Dimensions.get('window').width/2,
      borderBottomColor:'#ffffff',
      paddingTop:10,
      paddingBottom:10,
      borderBottomColor:'#ffffff',
      borderBottomWidth:1,
      paddingLeft:10,
    },
});