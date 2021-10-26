import React from 'react';
import { View,BackHandler,FlatList, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView,ImageBackground,ActivityIndicator } from 'react-native';
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


export default class Wishlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showemptylist:true,
            fileUri:'',
            userid:'',
            listofwishlist:[],
            productid:'',
            showmenu:false,
            showloader: true,
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if(userid){
                this.setState({userid: userid});
                
            }
           // console.log('userid',this.state.userid);
        });

        console.log('userid',this.state.userid);

       await this.getwishlist();

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

    deleteproduct = () => {

        console.log('productid',this.state.productid)
        
        var formdata = new FormData();
// formdata.append("user_id", this.state.userid);
formdata.append("product", this.state.productid);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://romegamart.com/api/deletewishlist/"+this.state.userid, requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      if(result.status == true){
        alert(result.message)
        this.getwishlist();
       // this.setState({ showemptylist: true })
    } 
    else if (result.status == false){
        alert(result.message)
    }
    })
  .catch(error => console.log('error', error));
    }


    deletewishlist =() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"product":this.state.productid});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"deletewishlist/"+this.state.userid, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              if(result.status == true){
                  alert(result.message)
              } 
              else if (result.status == false){
                  alert(result.message)
              }
            })
          .catch(error => console.log('error', error));
      }

      clearallwishlist =() => {

        this.setState({showemptylist:true})

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // var raw = JSON.stringify({"user_id":this.state.userid});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
         // body: raw,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"clearallwishlist/"+this.state.userid, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              if(result.status == true){
                  alert(result.message)
              } 
              else if (result.status == false){
                  alert(result.message)
              }
            })
          .catch(error => console.log('error', error));
      }







    getwishlist =() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(BASE_URL+"wishlist/"+this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('wishlist',result)
                this.state.listofwishlist.length = 0;
                if(result.status == true){
                    this.setState({showemptylist:false})
                    for (let i = 0; i < result.Wish_list.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.listofwishlist.push(result.Wish_list[i])
                    }
                    this.setState({ showloader: false })
                    //this.setState({showemptylist:!this.state.showemptylist})
                  
                }
                else if(result.status == false){
                    this.setState({showemptylist:true,showloader:false})
                }
            })
            .catch(error => console.log('error', error));
    }

    deleteImage(e) {
        e.preventDefault();
        return this.setState({fileUri: '',});
      }
    

      renderwish =() => {
        //  console.log('wishlist',this.state.listofwishlist)
        // return this.state.listofcartlist.map((item) => {
         return(
         <View style={{borderBottomColor:'#DDDDDD',borderBottomWidth:3,}}>
             <FlatList 
            // contentContainerstyle={{justifyContent:'space-between',marginLeft:20,marginRight:20}}
             numColumns={2}
             keyExtractor={(item, index) => String(item.id)}
             data={this.state.listofwishlist}
             renderItem={({item,index}) =>{
                 return(
             <View style={{marginTop:5,width:Dimensions.get('window').width/2,height:Dimensions.get('window').height / 4,alignItems:'center',justifyContent:'center'}}>
                 <View style={{marginBottom:10}}>
                     <View style={{flexDirection:'row',}}>
                 <Image key={item.product_id} source={{uri:item.feature_image}} style={{ height: Dimensions.get('window').width/5, width: Dimensions.get('window').width / 5 }} />
                 <TouchableOpacity 
                 onPress={async () =>await this.setState({productid:item.product_id},() =>this.deleteproduct())}
                 >
                           <Entypo name='circle-with-minus' size={20}
                           color={'#ff0000'}
                             style={{
                               marginLeft: -2,
                               marginTop:0,
                               
                             }}
                           />
                         </TouchableOpacity>
                         </View>
                 </View>
                 <View style={{marginTop:5}}>
                 <View style={{padding:5,borderRadius:8,backgroundColor:'rgba(60,63,134,1)'}}>
                 <Text style={{fontSize:14, fontFamily:'sans-serif-light',color:'#ffffff'}}>
                     
                     {item.title}
 
                 </Text>
                 </View>
                 <Text style={{color:'#ff0000'}}>
                     
                     Rs {item.price}
                 </Text>
                 </View>
                 
             
 
                 {/* <View>
                 <View>
                 <View style={{flexDirection:'row'}}>
                 <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                 <TouchableOpacity 
                 onPress={this.deletecart()}
                 >
                           <Entypo name='circle-with-minus' size={20}
                             style={{
                               marginLeft: -2,
                               marginTop:0,
                             }}
                           />
                         </TouchableOpacity>
                         </View>
                 </View>
                 <View style={{marginTop:5}}>
                 <Text style={{fontSize:14, fontFamily:'sans-serif-light'}}>
                     Type 1 Membrane
                 </Text>
                 <Text style={{color:'#ff0000'}}>
                     Rs 350
                 </Text>
                 </View>
                 </View>*/}
             </View> 
              )
             }}
             />
         </View>
         )
     //})
     }
 

    renderwishlist =() => {
        return this.state.listofwishlist.map((item) =>{
        return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-around',borderBottomColor:'#DDDDDD',borderBottomWidth:3,marginTop:5}}>
                <View style={{marginBottom:15}}>
                <View>
                    <View style={{flexDirection:'row',}}>
                <Image 
                source={{uri: 'https://romegamart.com/third-party/34.png'}}
                // source={require('../../assets/34.png')} 
                style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                <TouchableOpacity 
                //onPress={() =>this.deletewishlist()}
                onPress={() =>{this.setState({productid:item.id},this.deletewishlist())}}
                //onPress={this.deleteImage}
                >
                          <Entypo name='circle-with-minus' size={20}
                            style={{
                              marginLeft: -2,
                              marginTop:0,
                            }}
                          />
                        </TouchableOpacity>
                        </View>
                </View>
                <View style={{marginTop:5}}>
                <Text style={{fontSize:14, fontFamily:'sans-serif-light'}}>
                    Type 1 Membrane
                </Text>
                <Text style={{color:'#ff0000'}}>
                    Rs 350
                </Text>
                </View>
                </View>

                {/* <View>
                <View>
                <View style={{flexDirection:'row'}}>
                <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                <TouchableOpacity 
                onPress={() =>this.deletewishlist()}
                //onPress={this.deleteImage}
                >
                          <Entypo name='circle-with-minus' size={20}
                            style={{
                              marginLeft: -2,
                              marginTop:0,
                            }}
                          />
                        </TouchableOpacity>
                        </View>
                </View>
                <View style={{marginTop:5}}>
                <Text style={{fontSize:14, fontFamily:'sans-serif-light'}}>
                    Type 1 Membrane
                </Text>
                <Text style={{color:'#ff0000'}}>
                    Rs 350
                </Text>
                </View>
                </View> */}
            </View>
        </View>
        )
    })
    }

    clearasyncdata = async() => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
       await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({showmenu:!this.state.showmenu})
        this.props.navigation.navigate('Login')
     }

    render() {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f0f8ff'
                }}
                >
                     {this.state.showmenu?
                      <View style={{position:'absolute',top:0,left:0,width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,zIndex:1,
                    }}>
                         <TouchableOpacity
                        onPress={() =>this.setState({showmenu:!this.state.showmenu})}
                        >
                       
                        <View >
                <View style={{width:Dimensions.get('window').width/2+50,zIndex:2, marginTop:0,marginBottom:0}}>
                <View style={{height:Dimensions.get('window').height/9, width:Dimensions.get('window').width/2+50, backgroundColor:'#2e3191',borderRightColor:'#000000',borderRightWidth:2}}>
                    <View style={{flexDirection:'row', marginLeft:5}}>
                    <Ionicons name="person" size={30} color="#ffffff" /> 
                    <Text style={{color:'#ffffff',fontSize:24}}>
                        Hello, {this.state.username}
                    </Text>
                    </View>
                    <Text style={{color:'#ffffff',fontSize:20,marginLeft:15,marginTop:5}}>
                        How are you doing!!
                    </Text>
                </View>
                {/* rgba(65,105,225,0.3) */}
                <View style={{ width:Dimensions.get('window').width/2+50, backgroundColor:'#ffffff',borderRightColor:'#000000',borderRightWidth:2,height:Dimensions.get('window').height-160}}>
                <ImageBackground
                source={{uri: 'https://romegamart.com/third-party/sidebar.jpeg'}}
                // source={require('../../assets/sidebar.jpeg')}
                style={{width:Dimensions.get('window').width/2+50,height:Dimensions.get('window').height-160}}
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
                        :null}
                <View style={{ height: 50, backgroundColor: '#2e3191', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <TouchableOpacity
                   // onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
                   onPress={() =>this.props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/logo.jpeg'}}
                    // source={require('../../assets/logo.jpeg')} 
                    style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                        onPress={() =>this.props.navigation.navigate('Search')}
                        //onPress={() =>this.props.navigation.navigate('Verifiedhome')}
                        >
                            <Ionicons name="search-outline" size={30} color="#ffffff" style={{ transform: [{ rotateY: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity
            onPress={() =>this.props.navigation.navigate('Notifications',{id:this.state.userid})}
            >
            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
                        <TouchableOpacity
                        //onPress={() => this.props.navigation.navigate('Menu')}
                        onPress={() =>this.setState({showmenu:!this.state.showmenu})}
                        >
                            <Entypo name="menu" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:0.9}}>
                <ScrollView>
                {this.state.showloader ?

<View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
    <ActivityIndicator size="large" color="#2e3191" />
</View>
:
                    this.state.showemptylist?
                    <View>
                <View style={{height:Dimensions.get('window').height/3, width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center', borderBottomColor:'#DDDDDD',borderBottomWidth:15}}>
                <Image 
                source={{uri: 'https://romegamart.com/third-party/wishlist1.png'}}
                // source={require('../../assets/wishlist1.png')} 
                style={{ height: Dimensions.get('window').height/5, width: Dimensions.get('window').width/3, }} />
                <Text style={{fontSize:26, }}>
                    Your wishlist is empty
                </Text>
                </View>

                <View style={{borderBottomColor:'#DDDDDD',borderBottomWidth:3}}>
                    <Text style={{fontSize:20,marginLeft:5}}>
                        Save time
                    </Text>
                    <Text style={{fontSize:14, fontFamily:'sans-serif-light', marginBottom:10}}>
                        Add your items and ideas in one shopping bag 
                    </Text>
                </View>

                <View style={{borderBottomColor:'#DDDDDD',borderBottomWidth:3}}>
                    <Text style={{fontSize:20,marginLeft:5}}>
                        Check Price
                    </Text>
                    <Text style={{fontSize:14, fontFamily:'sans-serif-light', marginBottom:10}}>
                        Find better deals and offers
                    </Text>
                </View>

                <View style={{alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/10}}>
                    <TouchableOpacity
                    style={{height:Dimensions.get('window').height/15,width:Dimensions.get('window').width-60, backgroundColor:'#2e3191', borderRadius:8, alignItems:'center',justifyContent:'center'}}
                   // onPress={() =>this.props.navigation.navigate('Categories')}
                   onPress={() => this.props.navigation.navigate('Categories',{id:50})}
                    >
                    <Text style={{fontSize:26, color:'#ffffff'}}>
                        Create a list
                    </Text>
                    </TouchableOpacity>
                </View>
                </View> 
                :
                <View>
                    <View style={{margin:10}}>
                        <Text style={{fontSize:30}}>
                            Wishlist
                        </Text>
                    </View>
                    {this.renderwish()}
                   
                    

                    <View style={{}}>
                        <View style={{ alignItems:'center',justifyContent:'center',marginTop:Dimensions.get('window').height/3+50}}>
                            <TouchableOpacity
                            style={{height:Dimensions.get('window').height/15,width:Dimensions.get('window').width/3, backgroundColor:'#00008b',borderRadius:8, alignItems:'center',justifyContent:'center'}}
                            onPress={() => {this.clearallwishlist()}}
                            >
                                <Text style={{color:'#ffffff',fontSize:28,}}>
                                    Clear all
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                    }    
                    
                </ScrollView>
                         
                </View>

                    


                {/* <View style={{ flex: 0.1 }}>
                    <View style={{ position: 'absolute', height: 50, left: 0, width: Dimensions.get('window').width, backgroundColor: '#ffffff', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: '#DDDDDD', borderTopWidth: 3 }}>
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
                                <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} />

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
                    <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',  }}>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Verifiedhome')}
                            >
                                 <Image 
                                 source={{uri: 'https://romegamart.com/third-party/home1.png'}}
                                //  source={require('../../assets/home1.png')} 
                                 style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                    <Text style={{fontWeight:'bold',textAlign:'center'}}>
                                        Home
                                        </Text>
                            </TouchableOpacity>
                        </View>

                        <View >
                            <TouchableOpacity
                                //onPress={() => this.props.navigation.navigate('Categories')}
                                onPress={() => this.props.navigation.navigate('Categories',{id:50})}
                            >
                                {/* <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} /> */}
                                <Image 
                                source={{uri: 'https://romegamart.com/third-party/cat1.png'}}
                                // source={require('../../assets/cat1.png')} 
                                style={{ height: 30, width: 30,marginLeft:20 }} />
                                {/* <Entypo name="home" size={35} /> */}
                                    <Text style={{fontWeight:'bold',textAlign:'center'}}>
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
                                source={{uri: 'https://romegamart.com/third-party/wish1.png'}}
                                // source={require('../../assets/wish1.png')} 
                                style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                    <Text style={{fontWeight:'bold',textAlign:'center'}}>
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
                                source={{uri: 'https://romegamart.com/third-party/cart2.png'}}
                                // source={require('../../assets/cart2.png')} 
                                style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                    <Text style={{fontWeight:'bold',textAlign:'center'}}>
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
        color:'#ffffff'
        //fontFamily:'sans-serif-light',
    },
    butt:{
        margin:5,
        
    }

});


