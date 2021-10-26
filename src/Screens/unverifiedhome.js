import React from 'react';
import { TouchableOpacity, BackHandler, ActivityIndicator, View, Modal, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, TouchableWithoutFeedback, ImageBackground, Linking } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import AutoScrolling from "react-native-auto-scrolling";
import { BASE_URL } from '../api';
import WebView from 'react-native-webview';
// import VideoPlayer from 'react-native-video-player';
//import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import getVideoId from 'get-video-id';


export default class Unverifiedhome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bordercolor: '#4b0082',
      textcolor: '#000000',
      bordercolor1: '#4b0082',
      textcolor1: '#000000',
      bordercolor2: '#4b0082',
      textcolor2: '#000000',
      bordercolor3: '#4b0082',
      textcolor3: '#000000',
      imageclicked: false,
      listofvideosverified: [],
      listofvideosunverified: [],
      videourlverified: '',
      videourlunverified: '',
      listofreviews: [],
      listofbanners: [],
      listofnews: [],
      showModal: false,
      listofbrands: [],
      showloader: false,
      userid: '',
      showmenu: false,
      listofcategories: [],
      fblink: '',
      twitterlink: '',
      youtubelink: '',
      instalink: '',
      unverifiedvideoid:'',
      verifiedvideoid:'',

    }
  }



  async componentDidMount() {
    this.getvideoverified();
    this.getvideounverified();
    this.gettestimonials();
    this.getbanners();
    this.getnews();
    this.getbrandnames();
    this.getsociallinks();

    // await this.getcategories();

    await AsyncStorage.getItem('userid').then((userid) => {
      if (userid) {
        this.setState({ userid: userid });
        // console.log('userid',this.state.userid);
      }
    });
    console.log('userid', this.state.userid);

    BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

  }

  backActionHandler = () => {
    // BackHandler.exitApp();
    this.props.navigation.navigate('Login');
    return true;
  }

  UNSAFE_componentWillMount() {
    // this.getfeatureproducts();
    // this.getdeals();
    this.getcategories();

  }

  getsociallinks = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://romegamart.com/api/social-links", requestOptions)
      .then(response => response.json())
      .then(result => {
       // console.log(result)
       // console.log(result.data[0].twiter)
        if (result.status == 1) {
          this.setState({
            fblink: result.data[0].facebook,
            twitterlink: result.data[0].twiter,
            youtubelink: result.data[0].g_plus,
            instalink: result.data[0].linkedin,
          })
        }
        else {
          alert(result)
        }

      })
      .catch(error => console.log('error', error));
  }


  gettestimonials = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "testimonials", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        for (let i = 0; i < result.data.length; i++) {

          this.state.listofreviews.push(result.data[i])
        }

        // console.log('reviews',this.state.listofreviews)
      })
      .catch(error => console.log('error', error));
  }

  getvideoverified = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "videos/verified", requestOptions)
      .then(response => response.json())
      .then(result => {
       // console.log('video verified', result)

        for (let i = 0; i < result.data.length-1; i++) {
          // this.setState({documentslist:result.data[i].document})

          this.state.listofvideosverified.push(result.data[i])
        }
        let verifiedid = getVideoId(this.state.listofvideosverified[0].video_link);

        this.setState({ videourlverified: result.data[0].video_link, verifiedvideoid:verifiedid.id })
       // console.log('verified id',this.state.verifiedvideoid)
        // console.log('verified link', this.state.videourlverified)
      })
      .catch(error => console.log('error', error));
  }

  getvideounverified = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "videos/unverified", requestOptions)
      .then(response => response.json())
      .then(result => {
         // console.log('unverified video',result)

        for (let i = 0; i < result.data.length-1; i++) {
          // this.setState({documentslist:result.data[i].document})

          this.state.listofvideosunverified.push(result.data[i])
        }

        let unverifiedid = getVideoId(this.state.listofvideosunverified[0].video_link);

        this.setState({ videourlunverified: result.data[0].video_link,unverifiedvideoid:unverifiedid.id })
        // console.log('unverified link', this.state.videourlunverified)
       // console.log('unverified video',this.state.listofvideosunverified[0])
      })
      .catch(error => console.log('error', error));
  }


  getnews = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "news", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        for (let i = 0; i < result.data.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.listofnews.push(result.data[i])
          // this.state.listofnewsimages.push(result.data[i].image)
          //this.state.listofnewsdescription.push(result.data[i].description)
        }
        // console.log('news',this.state.listofnewsimages[0])
       // console.log('news', this.state.listofnews)

      })
      .catch(error => console.log('error', error));
  }

  getbanners = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "banners/unverified", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        for (let i = 0; i < result.data.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.listofbanners.push(result.data[i])
        }
        //console.log('listof',this.state.listofbanners)

      })
      .catch(error => console.log('error', error));
  }

  changecolor = (value) => {
    if (value === 'Domestic') {
      this.setState({
        bordercolor: '', textcolor: '#ffffff',
        bordercolor1: '#4b0082', textcolor1: '#000000',
        bordercolor2: '#4b0082', textcolor2: '#000000',
        bordercolor3: '#4b0082', textcolor3: '#000000',
      })
      this.props.navigation.navigate('Categories')
    }
    else if (value === 'Industrial') {
      this.setState({
        bordercolor: '#4b0082', textcolor: '#000000',
        bordercolor1: '', textcolor1: '#ffffff',
        bordercolor2: '#4b0082', textcolor2: '#000000',
        bordercolor3: '#4b0082', textcolor3: '#000000',
      })
      this.props.navigation.navigate('Categories')
    }
    else if (value === 'Domestic Models') {
      this.setState({
        bordercolor: '#4b0082', textcolor: '#000000',
        bordercolor1: '#4b0082', textcolor1: '#000000',
        bordercolor2: '', textcolor2: '#ffffff',
        bordercolor3: '#4b0082', textcolor3: '#000000',
      })
      this.props.navigation.navigate('Categories')
    }
    else if (value === 'Water Softeners') {
      this.setState({
        bordercolor: '#4b0082', textcolor: '#000000',
        bordercolor1: '#4b0082', textcolor1: '#000000',
        bordercolor2: '#4b0082', textcolor2: '#000000',
        bordercolor3: '', textcolor3: '#ffffff',
      })
      this.props.navigation.navigate('Categories')
    }
  }

  rendernews = () => {
    return this.state.listofnews.map((item) => {
      return (
        <View>
          <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 3, }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Newsdetails', { id: item.id })}
            >
              <Image key={item.id} source={{ uri: item.image }} style={{ margin: 10, height: 100, width: 100, borderRadius: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Newsdetails', { id: item.id })}
              style={{ width: Dimensions.get('window').width - 115 }}
            >
              <Text style={styles.textintips1}>
                {item.description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  renderbanners = () => {
    return this.state.listofbanners.map((item) => {
      return (
        <View>
          <Image key={item.id} source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 3 + 50, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10 }} />
        </View>
      )
    })
  }

  renderverifiedvideo = () => {
    return this.state.listofvideosverified.map((item) => {
      return (
        <View>
          {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}> */}
            {/* <VideoPlayer
    video={{ uri: item.video_link }}
   
/> */}
          {/* </View> */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <YoutubePlayer
              height={Dimensions.get('window').height / 3-45}
              width={Dimensions.get('window').width - 30}
              play={false}
              videoId={this.state.verifiedvideoid}   
              // onChangeState={this.onChangeState()}  oSQkYYetzPA  84WIaK3bl_s
             // style={{ borderRadius: 10 }}
            />
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, flex: 1, flexWrap: 'wrap' }}>
              {/* For the buyers */}
              {item.title}
            </Text>

            <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, marginRight: 20 }}>
              {/* For the buyers */}
              {item.language}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 20, fontFamily: 'sans-serif-light', marginRight: 20, flex: 1, flexWrap: 'wrap' }}>
              {item.description}
            </Text>
          </View>
        </View>
      )
    })
  }

  renderunverifiedvideo = () => {
    return this.state.listofvideosunverified.map((item) => {
      return (
        <View>
          {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>

            <Thumbnail url={item.video_link}
              imageWidth={Dimensions.get('window').width - 50}
              imageHeight={Dimensions.get('window').height / 4}
              iconStyle={{ height: 20, width: 20 }}
            />
          </View> */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <YoutubePlayer
              height={Dimensions.get('window').height / 3-45}
              width={Dimensions.get('window').width - 30}
              play={false}
              videoId={this.state.unverifiedvideoid}   
              // onChangeState={this.onChangeState()}  oSQkYYetzPA  84WIaK3bl_s
             // style={{ borderRadius: 10 }}
            />
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, flex: 1, flexWrap: 'wrap' }}>
              {/* For the buyers */}
              {/* {this.state.listofvideosunverified[0].title} */}
              {item.title}
            </Text>

            <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, marginRight: 20 }}>
              {/* For the buyers */}
              {/* {this.state.listofvideosunverified[0].language} */}
              {item.language}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 20, fontFamily: 'sans-serif-light', marginRight: 20, flex: 1, flexWrap: 'wrap' }}>
              {/* {this.state.listofvideosunverified[0].description} */}
            {item.description}
            </Text>
          </View>
        </View>
      )
    })
  }

  renderreviews = () => {
    return this.state.listofreviews.map((item) => {
      return (
        <View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderColor: '#DDDDDD', borderWidth: 2, height: Dimensions.get('window').height / 2 - 100, width: Dimensions.get('window').width - 50, alignItems: 'center', marginLeft: 15, marginRight: 15, backgroundColor: '#f0f8ff' }}>
              <Text style={{ fontSize: 24, paddingTop: 0 }}>
                What People Speak !!
              </Text>
              {/* source={require('../../assets/logo.jpeg')} */}
              <View style={{ width: 90, height: 90, borderRadius: 45, }}>
                <Image key={item.id} source={{ uri: item.photo }} style={{ height: 80, width: 80, borderRadius: 40 }} />

              </View>
              <Text style={{ fontSize: 20 }}>
                {item.client}
              </Text>
              <Text style={{ color: '#ff0000', fontSize: 18, marginLeft: 10, marginRight: 10, textAlign: 'center' }}>
                {item.review}
                {/* Loved the experience !! Extremely satisfying service, would recommend it to all friend in the industry. */}
              </Text>
            </View>
          </View>

        </View>
      )
    })
  }


  getbrandnames = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "brand", requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result)
        for (let i = 0; i < result.data.length; i++) {

          this.state.listofbrands.push(result.data[i])
        }
        this.setState({ showloader: !this.state.showloader })

        // console.log('brands',this.state.listofbrands)
      })
      .catch(error => console.log('error', error));
  }

  renderbrands = () => {
    return this.state.listofbrands.map((item) => {
      return (
        <View>
          {/* <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Dimensions.get('window').height / 5, alignItems: 'center' }}> */}
          {/* source={require('../../assets/16.png')} */}
          <Image key={item.id} source={{ uri: item.brand_image }} style={{ height: 100, width: 100, marginLeft: 10, marginRight: 10 }} />
          {/* <Text>{item.brand_title}</Text> */}
          {/* </View>
        </ScrollView>  */}
        </View>
      )
    })
  }

  getcategories = () => {
    // await delay(5000);
    //console.log('1')
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "categories", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        for (let i = 0; i < result.data.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.listofcategories.push(result.data[i])
        }
        //   this.setState({ showloader: !this.state.showloader })
        //  console.log('categories', this.state.listofcategories)
      })
      .catch(error => console.log('error', error));
  }


  rendercategoriesbanner = () => {
    // console.log('cate',this.state.listofcategories)
    return this.state.listofcategories.map((item) => {
      return (
        <View>
          <View style={{ marginLeft: 10, }}>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
              // this.changecolor('Domestic')
              //onPress={() => this.props.navigation.navigate('Categories')}
              style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor, borderWidth: 1, marginRight: 10 }}
            >
              {/* source={require('../../assets/73.jpg')} */}
              <Image key={item.id} source={{ uri: item.cat_icon }} style={{ height: 80, width: 80, borderRadius: 40 }} />
            </TouchableOpacity>
            <View style={{ position: 'absolute', top: 80, alignItems: 'center', flexWrap: 'nowrap' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 10, textAlign: 'center' }}>
                {/* Domestic    color: this.state.textcolor,*/}
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      )
    })
  }




  render() {
    const { showModal } = this.state;
    // const images =[  
    //   <Image source={require('../../assets/49.jpeg')} style={{height: 120,width:Dimensions.get('window').width }} />,
    //   <Image source={require('../../assets/48.jpeg')} style={{height: Dimensions.get('window').height / 6,width:Dimensions.get('window').width, }} />,
    //   <Image source={require('../../assets/50.jpeg')} style={{height: Dimensions.get('window').height / 6,width:Dimensions.get('window').width, }} />
    // ];
    return (

      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff'
        }}
      >
        <View style={{ height: 50, backgroundColor: '#2e3191', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('Menu')}
            onPress={() => this.setState({ showModal: !this.state.showModal })}
            style={{ marginLeft: 10 }}>
            <Entypo name="menu" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Image 
          source={{uri: 'https://romegamart.com/third-party/logo1.jpg'}}
          // source={require('../../assets/logo1.jpg')} 
          style={{ height: 40, width: 40, borderRadius: 20, marginLeft: Dimensions.get('window').width / 8 }} />
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
            // onPress={() =>this.props.navigation.navigate('Notifications',{id:this.state.userid})}
            >
              <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
            // onPress={() =>this.props.navigation.navigate('Myaccount')}
            >
              <Ionicons name="person" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.9 }}>
          <ScrollView>
            {/* <View style={{height:Dimensions.get('window').height/4, backgroundColor:'rgba(135,206,235,0.5)'}}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row'}}>
            <Image source={require('../../assets/drop.jpeg')} style={{height:40,width:40,backgroundColor:'rgba(135,206,235,0.5)'}}/>
            <Image source={require('../../assets/drop.jpeg')} style={{height:20,width:20,backgroundColor:'rgba(135,206,235,0.5)'}}/>
            <Image source={require('../../assets/drop.jpeg')} style={{height:20,width:20,backgroundColor:'rgba(135,206,235,0.5)'}}/>
            
            </View>
            <View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#00008b',fontWeight:'bold',fontSize:24}}>
                Welcome
              </Text>
              <Text style={{color:'#00008b',fontWeight:'bold',fontSize:24}}>
                All Buyers and Sellers...
              </Text>
              <Text style={{color:'#00008b',fontWeight:'bold',fontSize:24}}>
                RO Mega Mart
              </Text>
            </View>
            </View>
            <View style={{alignItems:'baseline'}}>
            <Image source={require('../../assets/drop.jpeg')} style={{height:100,width:100,backgroundColor:'rgba(135,206,235,0.5)'}}/>
            </View>
            </View>
          </View> */}

            <View style={{ height: 115 }}>
              <Image 
              source={{uri: 'https://romegamart.com/third-party/wel.jpeg'}}
              // source={require('../../assets/wel.jpeg')} 
              style={{ height: 115, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10 }} />
            </View>

            <View style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
              {/* <AutoScrolling> */}
              <Swiper
                style={{ height: Dimensions.get('window').height / 2 - 50 }}
                horizontal={true}
                autoplay={true}
                key={this.state.listofbanners.length}
                showsPagination={true}
                autoplayTimeout={3}
                loop={true}
                dot={<View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 8, height: 8, borderRadius: 4, margin: 3 }} />}
                activeDot={<View style={{ backgroundColor: '#000000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
              >
                {/* <View style={{flexDirection:'row',}}> */}
                {this.renderbanners()}
                {/* </View> */}
                {/* <Image source={require('../../assets/10.png')} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width, }} /> */}
              </Swiper>
              {/* </AutoScrolling> */}
            </View>


            {/* <View style={{height:40,backgroundColor:'#00bfff',width:Dimensions.get('window').width,marginTop: 30,justifyContent:'center'}}>
            <View style={{flexDirection:'row', marginLeft:10, marginRight:10, justifyContent:'space-between'}}>
              <View>
              <Text style={{color:'#ffffff',fontSize:20, }}>
                Categories
              </Text>
              </View>
            
            <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Categories')}
            >
              <Text style={{color:'#ffffff',fontSize:20}}>
                Explore all
              </Text>
            </TouchableOpacity>
          </View>
          </View> */}
            {/* <TouchableOpacity 
         // onPress={() =>this.props.navigation.navigate('Categories')}
         onPress={() =>this.setState({showModal:!this.state.showModal})}
         style={{ height:110, backgroundColor: '#87cefa', width:Dimensions.get('window').width,marginTop:20 }}> */}



            {/* <AutoScrolling> */}
            {/* <View style={{flexDirection:'row'}}>
            <ScrollView horizontal={true}>
            <Image source={require('../../assets/49.jpeg')} style={{height: 130,width:Dimensions.get('window').width,}} />
            <Image source={require('../../assets/48.jpeg')} style={{height: 130,width:Dimensions.get('window').width, }} />
            <Image source={require('../../assets/50.jpeg')} style={{height: 130,width:Dimensions.get('window').width, marginRight:-100}} />
            </ScrollView>
            </View> */}
            {/* </AutoScrolling> */}
            {/* <AutoScrolling>
            <View>
            <Image source={require('../../assets/48.jpeg')} style={{height: Dimensions.get('window').height / 6,width:Dimensions.get('window').width, }} />
            </View>
            </AutoScrolling>
            <AutoScrolling>
            <View>
            <Image source={require('../../assets/50.jpeg')} style={{height: Dimensions.get('window').height / 6,width:Dimensions.get('window').width, }} />
            </View>
            </AutoScrolling> */}

            <ImageBackground 
            source={{uri: 'https://romegamart.com/third-party/catbg.jpg'}}
            // source={require('../../assets/catbg.jpg')}
              style={{ height: 150, width: Dimensions.get('window').width }}
            >
              <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>

                  {this.rendercategoriesbanner()}
                </View>
              </ScrollView>
            </ImageBackground>

            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showModal}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,

                  }}
                >
                  <View style={{ width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height / 3, backgroundColor: '#2e3191', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textintips}>
                      Note:
                    </Text>
                    <Text style={styles.textintips}>

                      Your account details are under
                    </Text>
                    <Text style={styles.textintips}>

                      verfication, you will be able to place

                    </Text>
                    <Text style={styles.textintips}>

                      orders after your account is verified

                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textintips}>

                        within 24 hours

                      </Text>
                      </View>
                      <View style={{flexDirection:'row', marginTop:0,}}>
                      <TouchableOpacity
                       // onPress={() => this.setState({ showModal: !this.state.showModal })}
                       onPress={() =>{this.setState({showModal:!this.state.showModal},() =>this.props.navigation.navigate('Login'))}}
                        style={{ height: 40, width: 100, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center',  marginTop: 15,marginRight:15 }}
                      >
                        <Text style={{ fontSize: 14, color: '#ffffff' }}>Login</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() =>{this.setState({showModal:!this.state.showModal},() =>this.props.navigation.navigate('Kyc'))}}
                       // onPress={() => this.setState({ showModal: !this.state.showModal })}
                        style={{ height: 40, width: 100, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center',  marginTop: 15,marginRight:15 }}
                      >
                        <Text style={{ fontSize: 14, color: '#ffffff' }}>Complete KYC</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.setState({ showModal: !this.state.showModal })}
                        style={{ height: 40, width: 40, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}
                      >
                        <Text style={{ fontSize: 16, color: '#ffffff' }}>OK</Text>
                      </TouchableOpacity>
                      </View>
                      
                    
                  </View>
                </View>

              </Modal>
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => this.changecolor('Domestic')}
                  style={{ height: 80, width: 80, borderRadius: 40, borderColor: this.state.bordercolor, borderWidth: 1 }}
                >
                  <Image source={require('../../assets/11.jpeg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor }}>
                    Domestic
              </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor }}>
                    Components
              </Text>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => this.changecolor('Industrial')}
                  style={{ height: 80, width: 80, borderRadius: 40, borderColor: this.state.bordercolor1, borderWidth: 1 }}
                >
                  <Image source={require('../../assets/12.jpeg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor1 }}>
                    Industrial
              </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor1 }}>
                    Components
              </Text>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => this.changecolor('Domestic Models')}
                  style={{ height: 80, width: 80, borderRadius: 40, borderColor: this.state.bordercolor2, borderWidth: 1 }}
                >
                  <Image source={require('../../assets/13.jpeg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor2 }}>
                    Domestic
              </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor2 }}>
                    Models
              </Text>
                </View>
              </View>

              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => this.changecolor('Water Softeners')}
                  style={{ height: 80, width: 80, borderRadius: 40, borderColor: this.state.bordercolor3, borderWidth: 1 }}
                >
                  <Image source={require('../../assets/14.jpeg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 80, marginRight: 10, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor3 }}>
                    Water
              </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor3 }}>
                    Softeners
              </Text>
                </View>
              </View>
            </View> */}
            {/* </TouchableOpacity> */}

            <View style={{ height: Dimensions.get('window').height / 7, marginTop: 15, width: Dimensions.get('window').width }}>
              <Image 
              source={{uri: 'https://romegamart.com/third-party/ro2.jpeg'}}
              // source={require('../../assets/ro2.jpeg')} 
              style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width, }} />
            </View>

            {/* <View style={{ height: Dimensions.get('window').height / 7, backgroundColor: 'rgba(135,206,235,0.5)', marginTop: Dimensions.get('window').height / 16, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 35, color: '#ff69b4', fontWeight: 'bold', marginLeft: 10 }}>
                500+
            </Text>
              <Text style={{ fontSize: 35, color: '#ff69b4', fontWeight: 'bold' }}>
                5 LAKH+
            </Text>
              <Text style={{ fontSize: 35, color: '#ff69b4', fontWeight: 'bold', marginRight: 10 }}>
                5000+
            </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 22, color: '#00bfff', fontWeight: 'bold', marginLeft: 10 }}>
                CITIES
            </Text>
              <Text style={{ fontSize: 22, color: '#00bfff', fontWeight: 'bold' }}>
                PRODUCTS
            </Text>
              <Text style={{ fontSize: 22, color: '#00bfff', fontWeight: 'bold', marginRight: 10 }}>
                SUPPLIERS
            </Text>
            </View>
          </View> */}

            {/* <View style={{ height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
              RO MEGA MART
            </Text>
          </View> */}

            <View style={{ marginTop: 0, borderBottomColor: '#000000', borderBottomWidth: 2, height: 120, width: Dimensions.get('window').width, }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
              >
                <Image 
                source={{uri: 'https://romegamart.com/third-party/kyc5.jpeg'}}
                // source={require('../../assets/kyc5.jpeg')} 
                style={{ height: 105, width: Dimensions.get('window').width, }} />
              </TouchableOpacity>
            </View>

            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 5 }}>
              <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 15, backgroundColor: '#f0f8ff', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, }}>
                  Associated Brands
                </Text>
              </View>
              <ScrollView horizontal={true}>
                {/* <AutoScrolling> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Dimensions.get('window').height / 5, alignItems: 'center' }}>
                  {this.state.showloader ?
                    <ScrollView horizontal={true}>
                      {this.renderbrands()}
                    </ScrollView>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                      <ActivityIndicator size="large" color="#2e3191" />
                    </View>
                  }
                  {/* <Image source={require('../../assets/16.png')} style={{ height: 100, width: 100, marginLeft: 10,marginRight:10 }} />
              <Image source={require('../../assets/17.png')} style={{ height: 100, width: 100,marginRight:10 }} />
              <Image source={require('../../assets/18.png')} style={{ height: 50, width: 150, marginRight:10 }} />
              <Image source={require('../../assets/16.png')} style={{ height: 100, width: 100,marginRight:10  }} />
              <Image source={require('../../assets/17.png')} style={{ height: 100, width: 100, marginRight:10}} /> */}
                </View>
                {/* </AutoScrolling> */}
              </ScrollView>

            </View>

            <View>
              {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>

              <Thumbnail url={this.state.videourlunverified}
                imageWidth={Dimensions.get('window').width - 50}
                imageHeight={Dimensions.get('window').height / 4}
              />
            </View>
            <Text style={{ textAlign: 'left', fontSize: 20, marginLeft: 20, fontFamily: 'sans-serif-light' }}>
              For the buyers
        </Text>*/}
              
              {this.renderunverifiedvideo()}

            </View>

            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }}>
              {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 6 }}>

              <Thumbnail url={this.state.videourlverified}
                imageWidth={Dimensions.get('window').width - 50}
                imageHeight={Dimensions.get('window').height / 4}
              />
            </View>
            <Text style={{ textAlign: 'left', fontSize: 20, marginLeft: 20, fontFamily: 'sans-serif-light', marginBottom: Dimensions.get('window').height / 6 }}>
              For the sellers
                        </Text> */}
              {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            <YoutubePlayer
              height={Dimensions.get('window').height / 3}
              width={Dimensions.get('window').width - 30}
              play={false}
              videoId={'oSQkYYetzPA'}   
              // onChangeState={this.onChangeState()}  oSQkYYetzPA  84WIaK3bl_s
             // style={{ borderRadius: 10 }}
            />
            </View> */}
              {this.renderverifiedvideo()}
            </View>

           

            {/* <View>
          <YouTube
  videoId="KVZ-P-ZI6W4"   // The YouTube video ID
  play={true}             // control playback of video with true/false
  fullscreen={true}       // control whether the video should play in fullscreen or inline
  loop={true}             // control whether the video should loop when ended

  //onReady={e => this.setState({ isReady: true })}
 // onChangeState={e => this.setState({ status: e.state })}
 // onChangeQuality={e => this.setState({ quality: e.quality })}
  //onError={e => this.setState({ error: e.error })}

  style={{ alignSelf: 'stretch', height: 300 }}
/>
          </View> */}
            {/* Dimensions.get('window').height / 8+15 */}
            <View style={{ height: 105, width: Dimensions.get('window').width, backgroundColor: 'rgba(135,206,235,0.5)', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
              >
                <Image 
                source={{uri: 'https://romegamart.com/third-party/kyc4.jpeg'}}
                // source={require('../../assets/kyc4.jpeg')} 
                style={{ height: 105, width: Dimensions.get('window').width }} />
              </TouchableOpacity>
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
                style={{ width: Dimensions.get('window').width / 3 - 40, height: 30, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                  CLICK HERE
                        </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>
                COMPLETE YOUR KYC
                        </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
                style={{ width: Dimensions.get('window').width / 3 - 40, height: 30, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                  UPLOAD KYC
                        </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Fontisto name="shopping-sale" size={55} color={'red'} style={{ marginLeft: 10 }} />
              <AntDesign name="Safety" size={55} color={'green'} />
              <FontAwesome5 name="shipping-fast" size={55} color={'red'} style={{ marginRight: 10 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', marginLeft: 10 }}>
                BEST OFFERS AND DEALS
                        </Text>
              <Text style={{ fontSize: 9, fontWeight: 'bold' }}>
                100% SAFE AND SECURE
                        </Text>
              <Text style={{ fontSize: 9, fontWeight: 'bold', marginRight: 10 }}>
                EXPRESS DELIVERY TO DOORSTEP
                        </Text>
            </View> */}
            </View>

            <View style={{ marginTop: 0 }}>
              <TouchableOpacity
                style={{ margin: 10 }}
              // onPress={() =>this.props.navigation.navigate('Categories')}
              >
                <Text style={{ fontSize: 22, color: '#00008b', textAlign: 'center' }}>
                  Water Softeners
                </Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                onPress={() => this.setState({ showModal: !this.state.showModal })}
              // style={{flexDirection: 'row', height: Dimensions.get('window').height / 5,  backgroundColor: 'rgba(135,206,235,0.5)', alignItems: 'center', justifyContent: 'center',}}
              >
                
                <ImageBackground 
                source={{uri: 'https://romegamart.com/third-party/bgb.jpeg'}}
                // source={require('../../assets/bgb.jpeg')}
                  style={{ height: 110, width: Dimensions.get('window').width, }}
                >
                     <AutoScrolling 
            endPaddingWidth={-50}
            style={{flexDirection: 'row', height: 110,   alignItems: 'center', justifyContent: 'center',}}
            >
                  {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                    {/* <ScrollView horizontal={true}> */}
                   <View style={{flexDirection:'row'}}>
                      <Image 
                      source={{uri: 'https://romegamart.com/third-party/dom2.jpeg'}}
                      // source={require('../../assets/dom2.jpeg')} 
                      style={{ height: 70, width: 70, marginRight: 15, marginLeft: 0 }} />
                      <Image 
                      source={{uri: 'https://romegamart.com/third-party/dom1.jpeg'}}
                      // source={require('../../assets/dom1.jpeg')} 
                      style={{ height: 70, width: 70, marginRight: 15 }} />
                      <Image 
                      source={{uri: 'https://romegamart.com/third-party/ind1.jpeg'}}
                      // source={require('../../assets/ind1.jpeg')} 
                      style={{ height: 70, width: 70, marginRight: 15 }} />
                      <Image 
                      source={{uri: 'https://romegamart.com/third-party/ind2.jpeg'}}
                      // source={require('../../assets/ind2.jpeg')} 
                      style={{ height: 70, width: 70, marginRight: 15 }} />
                      {/* <Image source={require('../../assets/20.png')} style={{ height: 100, width: 100, marginRight: 15 }} /> */}
                      </View>
                    {/* </ScrollView> */}
                  {/* </View> */}
                  </AutoScrolling>
                </ImageBackground>
               
              </TouchableOpacity>

              
            </View>

            <TouchableOpacity
              style={{ margin: 10 }}
            // onPress={() =>this.props.navigation.navigate('Categories')}
            >
              <Text style={{ fontSize: 22, color: '#00008b', textAlign: 'center' }}>
                Domestic Spares
              </Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
            //style={{flexDirection: 'row', height: Dimensions.get('window').height / 5,  backgroundColor: '#1e90ff', alignItems: 'center', justifyContent: 'center',}}
            >
              <ImageBackground 
              source={{uri: 'https://romegamart.com/third-party/bgb.jpeg'}}
              // source={require('../../assets/bgb.jpeg')}
                style={{ height: 110, width: Dimensions.get('window').width, }}
              >
                 <AutoScrolling 
            endPaddingWidth={-50}
            style={{flexDirection: 'row', height: 110,   alignItems: 'center', justifyContent: 'center',}}
            >
                  {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                    {/* <ScrollView horizontal={true}> */}
                   <View style={{flexDirection:'row'}}>
                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                  {/* <ScrollView horizontal={true}> */}
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ind3.jpeg'}}
                    // source={require('../../assets/ind3.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15, marginLeft: 0 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ind4.jpeg'}}
                    // source={require('../../assets/ind4.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ind6.jpeg'}}
                    // source={require('../../assets/ind6.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ind5.jpeg'}}
                    // source={require('../../assets/ind5.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    {/* <Image source={require('../../assets/20.png')} style={{ height: 100, width: 100, marginRight: 15 }} /> */}

                  {/* </ScrollView> */}
                </View>
                </AutoScrolling>
              </ImageBackground>
              
            </TouchableOpacity>
           

            <TouchableOpacity
              style={{ margin: 10 }}
            // onPress={() =>this.props.navigation.navigate('Categories')}
            >
              <Text style={{ fontSize: 22, color: '#00008b', textAlign: 'center' }}>
                Industrial Spares
              </Text>
            </TouchableOpacity>

            {/* <AutoScrolling 
            endPaddingWidth={-50}
            style={{flexDirection: 'row', height: Dimensions.get('window').height / 5,  backgroundColor: 'rgba(135,206,235,0.5)', alignItems: 'center', justifyContent: 'center',}}
            > */}
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
            // style={{ flexDirection: 'row', height: Dimensions.get('window').height / 5, backgroundColor: 'rgba(135,206,235,0.5)', alignItems: 'center', justifyContent: 'center',marginRight:-100 }}
            >
              <ImageBackground 
              source={{uri: 'https://romegamart.com/third-party/bgb.jpeg'}}
              // source={require('../../assets/bgb.jpeg')}
                style={{ height: 110, width: Dimensions.get('window').width, }}
              >
                <AutoScrolling 
            endPaddingWidth={-50}
            style={{flexDirection: 'row', height: 110,   alignItems: 'center', justifyContent: 'center',}}
            >
                  {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                    {/* <ScrollView horizontal={true}> */}
                   <View style={{flexDirection:'row'}}>
                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  <ScrollView horizontal={true}> */}
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ws4.jpeg'}}
                    // source={require('../../assets/ws4.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15, marginLeft: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ws3.jpeg'}}
                    // source={require('../../assets/ws3.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ws2.jpeg'}}
                    // source={require('../../assets/ws2.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/ws1.jpeg'}}
                    // source={require('../../assets/ws1.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    {/*<Image source={require('../../assets/20.png')} style={{ height: 100, width: 100, marginRight: 15 }} /> */}
                  {/* </ScrollView> */}
                </View>
                </AutoScrolling>
              </ImageBackground>
            </TouchableOpacity>
            {/* </AutoScrolling> */}

            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => this.props.navigation.navigate('Categories')}
            >
              <Text style={{ fontSize: 22, color: '#00008b', textAlign: 'center' }}>
                Commercial
              </Text>
            </TouchableOpacity>
            {/* <AutoScrolling
           endPaddingWidth={-50}
           style={{flexDirection: 'row', height: Dimensions.get('window').height / 5,  backgroundColor: '#1e90ff', alignItems: 'center', justifyContent: 'center',}}
            > */}
            <TouchableOpacity
              onPress={() => this.setState({ showModal: !this.state.showModal })}
            // style={{ flexDirection: 'row', height: Dimensions.get('window').height / 5, backgroundColor: '#1e90ff', alignItems: 'center', justifyContent: 'center', marginRight:-100}}
            >
              <ImageBackground 
              source={{uri: 'https://romegamart.com/third-party/bgb.jpeg'}}
              // source={require('../../assets/bgb.jpeg')}
                style={{ height: 110, width: Dimensions.get('window').width, }}
              >
                <AutoScrolling 
            endPaddingWidth={-50}
            style={{flexDirection: 'row', height: 110,   alignItems: 'center', justifyContent: 'center',}}
            >
                  {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                    {/* <ScrollView horizontal={true}> */}
                   <View style={{flexDirection:'row'}}>
                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  <ScrollView horizontal={true}> */}
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/wvm1.jpeg'}}
                    // source={require('../../assets/wvm1.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15, marginLeft: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/wvm2.jpeg'}}
                    // source={require('../../assets/wvm2.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/wvm4.jpeg'}}
                    // source={require('../../assets/wvm4.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/wvm3.jpeg'}}
                    // source={require('../../assets/wvm3.jpeg')} 
                    style={{ height: 70, width: 70, marginRight: 15 }} />
                    {/*<Image source={require('../../assets/20.png')} style={{ height: 100, width: 100, marginRight: 15 }} /> */}

                  {/* </ScrollView> */}
                </View>
                </AutoScrolling>
              </ImageBackground>
            </TouchableOpacity>
            {/* </AutoScrolling> */}
            <View style={{ height: 115, width: Dimensions.get('window').width, backgroundColor: 'rgba(135,206,235,0.5)', }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
              >
                <Image 
                source={{uri: 'https://romegamart.com/third-party/kyc6.jpeg'}}
                // source={require('../../assets/kyc6.jpeg')} 
                style={{ height: 115, width: Dimensions.get('window').width }} />
              </TouchableOpacity>
              {/* <View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: 18, lineHeight: 20, marginTop: 10 }}>
                To see wholesale and B2B prices of products
                            </Text>
              <Text style={{ fontSize: 24, lineHeight: 30, marginTop: 5 }}>
                COMPLETE YOUR KYC
                            </Text>
              <Text style={{ fontSize: 14, lineHeight: 20, marginTop: 10 }}>
                Upload ANY ONE of the following documents
                            </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Kyc')}
                style={{ width: Dimensions.get('window').width / 3 - 40, height: 30, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 5 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                  UPLOAD KYC
                        </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
              <Text style={{ color: '#00008b' }}>
                GST Certificate | Adhaar | Visiting Card | Shop/Business photo
                            </Text>
            </View> */}
            </View>

            <View>
              <View style={{ justifyContent: 'center', marginTop: 25 }}>
                <View style={{ height: 50, backgroundColor: 'rgba(135,206,235,0.5)', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#000000', borderBottomWidth: 3, }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 20, paddingTop: 5 }}>
                    News & Updates
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('News')}
                  >
                    <Text style={{ color: '#ff0000', fontSize: 20, paddingTop: 5 }}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>



            <View style={{ marginBottom: 10 }}>
              {this.rendernews()}
              {/* <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 3, }}>
              <TouchableOpacity
              // onPress={() =>{this.props.navigation.navigate('newsdetails',{imageData: require('../../assets/comlogo.jpeg')})}}
              >
                <Image
                  source={require('../../assets/logo.jpeg')}
                  // source={this.state.listofnewsimages[0]} 
                  style={{ margin: 10, height: 80, width: 80, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('newsdetails')}
              >
                <Text style={styles.textintips}>
                  {/* {this.state.listofnewsdescription[0]} 
                       Studies claim that neutral {'\n'}water can
                      cause heart {'\n'}problems, it is no more {'\n'}safe
                      for drinking, switch to {'\n'}alkaline water (ph-8)
                    </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 3, }}>
              <TouchableOpacity>
                <Image source={require('../../assets/logo.jpeg')} style={{ margin: 10, height: 80, width: 80, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textintips}>
                  Does drinking water reduce {'\n'}side effects after a COVID-19 {'\n'}shot?
                    </Text>
              </TouchableOpacity>

            </View> 

            <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 3, }}>
              <TouchableOpacity>
                <Image source={require('../../assets/logo.jpeg')} style={{ margin: 10, height: 80, width: 80, borderRadius: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textintips}>
                  Is it safe to drink water after {'\n'}having fruits?
                    </Text>
              </TouchableOpacity>
            </View>*/}
            </View>

            {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderColor: '#DDDDDD', borderWidth: 2, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width - 50, alignItems: 'center', justifyContent: 'center', marginLeft: 15, marginRight: 15, backgroundColor: '#f0f8ff' }}>
              <Text style={{ fontSize: 24 }}>
                What People Speak !!
                            </Text>
              <Image source={require('../../assets/logo.jpeg')} style={{ margin: 10, height: 70, width: 70, borderRadius: 35 }} />
              <Text style={{ fontSize: 20 }}>
                ABC
                            </Text>
              <Text style={{ color: '#ff0000', fontSize: 18, marginLeft: 10, marginRight: 10, textAlign: 'center' }}>
                Loved the experience !! Extremely satisfying service, would recommend it to all friend in the industry.
                            </Text>
            </View>
          </View> */}
            <Swiper
              style={{ height: Dimensions.get('window').height / 2 - 75 }}
              horizontal={true}
              showsPagination={true}
              dot={<View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 14, height: 14, borderRadius: 7, margin: 3 }} />}
              activeDot={<View style={{ backgroundColor: '#000000', width: 14, height: 14, borderRadius: 7, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
            >
              {this.renderreviews()}
            </Swiper>

            <View >
              <View style={{ height: 85, width: Dimensions.get('window').width, backgroundColor: '#fffff0', marginTop: 15, }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Kyc')}
                >
                  <Image 
                  source={{uri: 'https://romegamart.com/third-party/kyc7.jpeg'}}
                  // source={require('../../assets/kyc7.jpeg')} 
                  style={{ height: 85, width: Dimensions.get('window').width }} />
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row' }}>
                <View >
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#483d8b', marginLeft: 10 }}>
                    TO BUY VERIFIED PRODUCTS
                            </Text>
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#483d8b', marginLeft: 60 }}>
                    AT BEST RATES
                            </Text>
                </View>
                <View >
                  <Ionicons name="cloud-upload-outline" size={50} color="#ff6347" style={{ marginLeft: 10 }} />
                </View> 
              </View>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Feather name="check-circle" size={40} color="#2A9134" style={{ marginLeft: 10, marginTop: -15 }} />
                  <View>
                    <TouchableOpacity
                      style={{ height: 30, width: Dimensions.get('window').width / 2 - 50, backgroundColor: '#ff6347', borderRadius: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', marginTop: -10 }}
                      onPress={() => this.props.navigation.navigate('Kyc')}
                    >
                      <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        CLICK HERE FOR KYC
                                </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>*/}
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: Dimensions.get('window').height / 14, marginTop: Dimensions.get('window').height / 30, marginBottom: 5 }}>
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => { Linking.openURL(this.state.fblink) }}
              >
                <Entypo name="facebook-with-circle" size={30} color="#4267B2" />

              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => { Linking.openURL(this.state.twitterlink) }}
              >
                <Entypo name="twitter-with-circle" size={30} color="#1DA1F2" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => { Linking.openURL(this.state.instalink) }}
              >

                <Image 
                source={{uri: 'https://romegamart.com/third-party/insta.jpeg'}}
                // source={require('../../assets/insta.jpeg')} 
                style={{ height: 30, width: 30, }} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => { Linking.openURL(this.state.youtubelink) }}
              >
                <Entypo name="youtube-with-circle" size={30} color="#FF0000" />

              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
        {/* <View style={{flex:0.1}}>  
        <View style={{position:'absolute',height:60,left:0, width:Dimensions.get('window').width,backgroundColor:'rgba(211,211,211,0.5)',bottom:0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
          <View >
            <TouchableOpacity
             // onPress={() => this.props.navigation.navigate('home')}
             onPress={() =>this.setState({showModal:!this.state.showModal})}
           >
              <Entypo name="home" size={35} />

            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
            // onPress={() => this.props.navigation.navigate('Cart')}
            onPress={() =>this.setState({showModal:!this.state.showModal})}
            >
              <Ionicons name="cart" size={35} />

            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
            // onPress={() => this.props.navigation.navigate('Support')}
            onPress={() =>this.setState({showModal:!this.state.showModal})}
            >
              <Ionicons name="help-circle" size={35} />

            </TouchableOpacity>
          </View>
        </View> 
    </View> */}
        <View style={{ flex: 0.1 }}>
          <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
            <View >
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Verifiedhome')}
                onPress={() => this.setState({ showModal: !this.state.showModal })}
              >
                <Image 
                source={{uri: 'https://romegamart.com/third-party/home1.png'}}
                // source={require('../../assets/home1.png')} 
                style={{ height: 30, width: 30, }} />

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>

            <View >
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Categories')}
                onPress={() => this.setState({ showModal: !this.state.showModal })}
              >

                <Image 
                source={{uri: 'https://romegamart.com/third-party/cat1.png'}}
                // source={require('../../assets/cat1.png')} 
                style={{ height: 30, width: 30, marginLeft: 20 }} />

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Categories
                </Text>

              </TouchableOpacity>
            </View>

            <View >
              <TouchableOpacity style={{ alignItems: 'center' }}
                // onPress={() => this.props.navigation.navigate('Wishlist')}
                onPress={() => this.setState({ showModal: !this.state.showModal })}
              >

                <Image 
                source={{uri: 'https://romegamart.com/third-party/wish1.png'}}
                // source={require('../../assets/wish1.png')} 
                style={{ height: 30, width: 30, }} />

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Wishlist
                </Text>
              </TouchableOpacity>
            </View>
            <View >
              <TouchableOpacity style={{ alignItems: 'center' }}
                // onPress={() => this.props.navigation.navigate('Cart')}
                onPress={() => this.setState({ showModal: !this.state.showModal })}
              >

                <Image 
                source={{uri: 'https://romegamart.com/third-party/cart2.png'}}
                // source={require('../../assets/cart2.png')} 
                style={{ height: 30, width: 30, }} />

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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0000ff',
    marginLeft: 10
  },
  textintips: {
    fontSize: 16,
    //fontFamily: 'sans-serif-light',
    marginTop: 5,
    //flex:1, 
    flexWrap: 'wrap',
    color: '#ffffff'
    //flexShrink:1,
    // textAlign:'justify'


  },
  textintips1: {
    fontSize: 16,
    //fontFamily: 'sans-serif-light',
    marginTop: 5,
    //flex:1, 
    flexWrap: 'wrap',
    color: '#000000'
    //flexShrink:1,
    // textAlign:'justify'


  }


});


