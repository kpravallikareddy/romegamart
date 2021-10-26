import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage, Text, TextInput, CheckBox, Button, Image, ScrollView, Dimensions, Alert, StyleSheet, StatusBar, SafeAreaView, FlatList, BackHandler, Linking,TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { BASE_URL } from '../api';
import Share from 'react-native-share';
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   IGNORED_TAGS,
//   alterNode,
//   makeTableRenderer
// } from '@native-html/table-plugin';
//import HTML from 'react-native-render-html';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import WebView from 'react-native-webview';
import { ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
//import AppLink from 'react-native-app-link';
//import { Deeplinks } from '@ionic-native/deeplinks';
import DeepLinking from 'react-native-deep-linking';
import { throttle } from 'lodash';
import Modal from "react-native-modal";


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const config = {
  WebViewComponent: WebView
};

const renderers = {
  table: makeTableRenderer(config)
};

// const htmlConfig = {
// alterNode,
// renderers,
// ignoredTags: IGNORED_TAGS
// };

// const renderers = {
//   table: makeTableRenderer({ WebView })
// };

const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS
};

const URL_SCHEMES = ['exp://', 'myapp://',];

const playStoreId = 'com.romegamart';
export default class Productdetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      productid: this.props.route.params.id,  //1
      rating: 0,
      productdetailslist: '',
      standardbordercolor: true,
      technicalbordercolor: false,
      morebordercolor: false,
      userid: '',
      //quantity:'',
      subcategoryid: '',
      recommendedproductslist: [],
      showloader: false,
      sizelist: '',
      colorlist: '',
      showsize: false,
      showcolor: false,
      showqty: false,
      listsize: [],
      listcolor: [],
      listqty: [],
      showloader1: false,
      productgallery: [],
      qtyandprice: [],
      product_id1: '1',
      product_id2: '2',
      product1details: '',
      product2details: '',
      url: '',
      result: '',
      size: '',
      color: '',
      quantity: 0,
      showmenu: false,
      qty2: 'Q',
      productgalleryclicked: false,
      productgalleryimage: '',
      readmoreclicked: false,
      showqtymodal:false,
      showcolormodal:false,
      showsizemodal:false,
      qtyselected:false,
      colorselected:false,
      sizeselected:false,
    }
    this.onPress = throttle(this.onPress, 500, {trailing: false})
    this.backActionHandler = this.backActionHandler.bind(this);
  }

  async componentDidMount() {

   // const route = useRoute();
  // console.log('routename',route.name);
  //  let previouseroute =this.props.navigation.dangerouslyGetParent().state.routes

  //  console.log('routename',previouseroute);

    

    await this.setState({ url: BASE_URL + "product-details/" + this.state.productid })
    //this.modalvisible();
    await AsyncStorage.getItem('userid').then((userid) => {
      if (userid) {
        this.setState({ userid: userid });
        //  console.log('userid',this.state.userid);
      }
    });

   // console.log('userid', this.state.userid);

    console.log('url', this.state.url)



    //   AsyncStorage.getItem('subcategoryid').then((subcategoryid) => {
    //     if (subcategoryid) {
    //         this.setState({ subcategoryid: subcategoryid });
    //         console.log(this.state.subcategoryid);
    //     }
    // });

    // AsyncStorage.getItem('subcategoryid1').then((subcategoryid) => {
    //   if (subcategoryid) {
    //       this.setState({ subcategoryid: subcategoryid });
    //       console.log('subcateid from async',this.state.subcategoryid);
    //   }
    // });
    this.getproductdetails();
    this.getproductgallery();
    this.getqtyandprice();

    this.getsizeandcolor();

    // this.getrecommendedproducts();
    BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);
    // Linking.addEventListener('url',handleOpenURL);

    //       return () =>
    //         // clear/remove event listener
    //         BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);

  }

  // backActionHandler = () => {
  //     BackHandler.exitApp();
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backActionHandler);

    // Linking.removeEventListener('url',handleOpenURL);

  }

  backActionHandler() {
    this.props.navigation.goBack(null);
    return true;
  }

  onPress = () => {
     console.log("going back",this.props.navigation)
     console.log("going back",this.props.navigation.canGoBack())
     
    // this.props.navigation.pop();
    this.props.navigation.goBack();
//     if(navigation.canGoBack())
// {
//   this.props.navigation.dispatch(StackActions.pop(1));
// // this.refs.navigation.dispatch(StackActions.popToTop());
// }
//this.props.navigation.dispatch(NavigationActions.back())
}

  range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  showborder() {
    this.setState({
      standardbordercolor: true,
      technicalbordercolor: false,
      morebordercolor: false
    })
  }
  showborder1() {
    this.setState({
      standardbordercolor: false,
      technicalbordercolor: true,
      morebordercolor: false
    })
  }
  showborder2() {
    this.setState({
      standardbordercolor: false,
      technicalbordercolor: false,
      morebordercolor: true
    })
  }

  schemesadd = () => {
    for (let scheme of URL_SCHEMES) {
      DeepLinking.addRoute('/productdetails', (response) => {
        this.props.navigation.navigate('Productdetails');
      });
    }
  }

  handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
    return (
      <Text>App</Text>
    )

  }


  addtocart = () => {

    console.log('productid ---',this.state.productid)
    if (this.state.productdetailslist.stock == 0) {
      alert('Product is out of stock')
    }
    //console.log('userid',this.state.userid)
    // console.log('quantity',this.state.quantity)
    else if (this.state.quantity == 0) {
      alert('Please select quantity')
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");

      // var raw = JSON.stringify({
      //   "user_id":this.state.userid,
      //   "product":this.state.productid,
      //   "quantity":this.state.quantity,
      //   "size":this.state.size,
      //   "color":this.state.color
      // });



      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      var formdata = new FormData();
      formdata.append("user_id", this.state.userid);
      formdata.append("product", this.state.productid);
      formdata.append("quantity", this.state.quantity);
      formdata.append("size", this.state.size);
      formdata.append("color", this.state.color);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(BASE_URL + "cartsave", requestOptions)
        .then(response => response.json())
        .then(result => {
          //  console.log(result)
          if (result.status == true) {
            alert(result.message)
          }
          else if (result.status == false) {
            alert(result.message)
          }
          else {
            alert(result)
          }
        })
        .catch(error => console.log('error', error));
    }
  }


  addtowishlist = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "user_id": this.state.userid, "product": this.state.productid, "quantity": this.state.quantity });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL + "wishlistsave", requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result)
        if (result.status == true) {
          alert(result.message)
        }
        else if (result.status == false) {
          alert(result.message)
        }
        else {
          alert(result)
        }
      })
      .catch(error => console.log('error', error));
  }

  getcompare = () => {
    var formdata = new FormData();
    formdata.append("product_id1", this.state.product_id1);
    formdata.append("product_id2", this.state.product_id2);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://romegamart.com/api/compareproducts", requestOptions)
      .then(response => response.json())
      .then(result => {
       // console.log(result)

      })
      .catch(error => console.log('error', error));
  }


  getrecommendedproducts = () => {
    //await delay(5000);
    //  console.log('sorted', this.state.sortvalue)
    // console.log('subcategoryid',this.state.subcategoryid)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    // https://webapplicationindia.com/demo/watermall/api/subcategorywiseproduct/"+this.state.subcategoryid+'?sortby='+this.state.sortvalue, requestOptions
    fetch(BASE_URL + "subcategorywiseproduct/" + this.state.subcategoryid, requestOptions)   //+this.state.subcategoryid
      .then(response => response.json())
      .then(result => {
        this.state.recommendedproductslist.length = 0;
        //  console.log(result)  //'?sortby='+this.state.sortvalue
        for (let i = 0; i < result.product_list.length; i++) {
          this.state.recommendedproductslist.push(result.product_list[i])
        }
        this.setState({ showloader1: !this.state.showloader1 })
       // console.log('recommendedproducts', this.state.recommendedproductslist)
      })
      .catch(error => console.log('error', error));
  }


  getproductdetails = () => {
   // console.log('productid', this.state.productid)

    //await delay(5000);
    // console.log('sorted', this.state.sortvalue)
    // console.log('productid', this.state.productid)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };


    fetch(BASE_URL + "product-details/" + this.state.productid, requestOptions)
      .then(response => response.json())
      .then(result => {
         console.log(result)  
        // for(let i =0;i<result.product_details.length;i++){
        //   this.state.productdetailslist.push(result.product_details[i])
        // }
        this.setState({ showloader: !this.state.showloader })
        this.setState({ productdetailslist: result.product_details })

        this.setState({ subcategoryid: result.product_details.subcategory_id })
        // delay(5000);
       // console.log('subid inside proddetails', this.state.subcategoryid)
        this.getrecommendedproducts()
       // console.log('productslist', this.state.productdetailslist)

      })
      .catch(error => console.log('error', error));
  }


  getproductgallery = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //var raw = JSON.stringify({"productid":this.state.productid});
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      //body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL + "product_gallery/" + this.state.productid, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log('gallery', result)
        this.state.productgallery.length = 0;
        for (let i = 0; i < result.data.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.productgallery.push(result.data[i])
        }
        //this.setState({showloader:!this.state.showloader})
       // console.log('productgallery',this.state.productgallery)

      })
      .catch(error => console.log('error', error));
  }

  getqtyandprice = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch("https://romegamart.com/api/product_packages/" + this.state.productid, requestOptions)
      .then(response => response.json())
      .then(result => {
       // console.log(result)
        for (let i = 0; i < result.packages.length; i++) {
          // this.setState({documentslist:result.data[i].document})
          this.state.qtyandprice.push(result.packages[i])
        }

      })
      .catch(error => console.log('error', error));
  }

  renderqtyandprice = () => {
    return this.state.qtyandprice.map((item) => {
      return (
        <View>
          <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
            <View style={{ width: 100, height: 30, backgroundColor: 'rgba(60,63,134,1)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', color: '#ffffff' }}>
                {/* Rs 350 */}
                Rs {item.price}
              </Text>
            </View>
            <View style={{ width: 100, height: 30, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', color: '#ffffff' }}>
                {/* Qty 5-9 */}
                Qty {item.quantity}-{item.quantity_to}
              </Text>
            </View>
          </View>
        </View>
      )
    })
  }

  renderproductgallery = () => {
    return this.state.productgallery.map((item) => {
      return (
        <View>
          <TouchableOpacity
            onPress={async () => await this.setState({ productgalleryimage: item.image, productgalleryclicked: true })}
          //onPress={ () => this.setState({productid:item.productid,showloader:!this.state.showloader},() =>this.getproductdetails()) }
          // this.setState({productid:item.productid},() =>this.getproductdetails()
          // console.log('productid from productgallery',item.productid)
          >
            <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, marginLeft: 10, margin: 15 }}>
              <Image key={item.id} source={{ uri: item.image }} style={{ height: 95, width: 95 }} />
            </View>
          </TouchableOpacity>
        </View>
      )
    })
  }

  renderqty =() => {
    return this.state.listqty.map((item) =>{
      return(
        <View >
          <TouchableOpacity
          onPress={() =>this.setState({quantity:item,showqtymodal:false,showqty:!this.state.showqty})}
          style={{height:40,width:Dimensions.get('window').width / 2 - 30,borderBottomColor:'#DDDDDD',borderBottomWidth:1,}}
          >
            <Text
            style={{fontSize: 18, color: '#000000'}}
            >{item}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  shareMultipleImages = async () => {
    const initialurl = await Linking.getInitialURL();
    console.log('initial url ---',initialurl)
    if (initialurl != null) {
      this.setState({url:initialurl})
      console.log('initial url ---',initialurl)
      return url;
    }

   // console.log("Share file")
    const shareOptions = {
      title: 'Share file',
      // message:'Check it out:',
      failOnCancel: false,
      urls: [this.state.url], //[this.state.url],'https://play.google.com/store/apps/details?id=com.romegamart'  this.state.productdetailslist.feature_image
    };
    Share.open(shareOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });

    
    // 'romegamart://categories/products/productdetails'+
    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      this.setState(JSON.stringify({ result: ShareResponse }));
    } catch (error) {
      console.log('Error =>', error);
      this.setState({ result: 'error: '.concat(getErrorString(error)) });
    }
  };
  // shareOptions = {
  //   title: 'Title',
  //   message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  //   url:this.state.url,
  //  // subject: 'Subject'
  // };

  //shareproduct =() => Share.share(this.shareOptions);

  maybeOpenURL = async (
    url
    // {  playStoreId }
  ) => {
    Linking.openURL(this.state.url).catch(err => {
      if (err.code === 'EUNSPECIFIED') {
        // if (Platform.OS === 'ios') {
        //   // check if appStoreLocale is set
        //   const locale = typeof appStoreLocale === 'undefined'
        //     ? 'us'
        //     : appStoreLocale;

        //   Linking.openURL(`https://apps.apple.com/${locale}/app/${appName}/id${appStoreId}`);
        // } else {
        Linking.openURL(
          this.state.url
          //`https://play.google.com/store/apps/details?id=${playStoreId}`
        );
        //}
      } else {
        throw new Error(`Could not open ${appName}. ${err.toString()}`);
      }
    });
  };


  shareMultipleImages1 =() =>{
    Linking.getInitialURL()
    .then(url =>{
      console.log("DeepLink", this.state.url)
      if(this.state.url != null){
        console.log("Share file")
        const shareOptions = {
          title: 'Share file',
          // message:'Check it out:',
          failOnCancel: false,
          urls: [this.state.url], //[this.state.url],'https://play.google.com/store/apps/details?id=com.romegamart'  this.state.productdetailslist.feature_image
        };
        Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
      }
    })
  }




  renderproductdetails = () => {
    // return this.state.productdetailslist.map((product) =>  {
    return (
      <View>
        <View>
          {/* borderBottomColor: '#DDDDDD', borderBottomWidth: 3 */}
          <View style={{}}>

            {/* <View style={{flexDirection:'row',justifyContent:this.state.productdetailslist.verifiedTrustSeal == 1?'space-between':'flex-end' }}>
          {this.state.productdetailslist.verifiedTrustSeal == 1 ?
          <View style={{flexDirection: 'row', margin: 10, height: 30, alignItems: 'center'}}>
            <Feather name="check-circle" size={25} color="#2A9134" />
            
              <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', color: '#2A9134', marginLeft: 5 }}>
                Verified by WaterMall
                </Text>
                </View>
              : null}
             <TouchableOpacity
             onPress={() =>this.shareMultipleImages()}
             >
            <View style={{}}>
          <Image source={require('../../assets/share.png')} style={{ height:40, width:40,}} />
          </View>
          </TouchableOpacity>
          </View> */}



            <View style={{}}>
              <View style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').width / 2 + 80, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                {this.state.productgalleryclicked ?
                  <ImageBackground source={{ uri: this.state.productgalleryimage }} style={{ height: Dimensions.get('window').width / 2 + 70, width: Dimensions.get('window').width / 2 + 70, }} />
                  :
                  <ImageBackground source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: Dimensions.get('window').width / 2 + 70, width: Dimensions.get('window').width / 2 + 70, }} />
                }
              </View>
              <View style={{ position: 'absolute', top: 30, left: 20 }}>
                {this.state.productdetailslist.verifiedTrustSeal == 1 ?
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(198,227,198,1)', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                    <Feather name="check-circle" size={25} color="#2A9134" style={{ marginRight: 5 }} />

                    <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', color: '#2A9134', marginLeft: 5 }}>
                      Verified by WaterMall
                    </Text>
                  </View>
                  : null}
              </View>
              <View style={{ position: 'absolute', top: 30, left: Dimensions.get('window').width - 80 }}>
                <TouchableOpacity
                //onPress={() =>alert('Coming soon...')}
                  onPress={() => this.shareMultipleImages()}
                // onPress={() =>this.maybeOpenURL()}
                // onPress={()=>this.handleOpenURL()}
                >
                  <View style={{}}>
                    <Image 
                    source={{uri: 'https://romegamart.com/third-party/share.png'}}
                    // source={require('../../assets/share.png')} 
                    style={{ height: 40, width: 40, }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal={true}>
              <View style={{ flexDirection: 'row', marginTop: -10 }}>
                {this.renderproductgallery()}
                {/* <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, marginLeft: 10, margin: 15 }}>
                <Image source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image source={{ uri: this.state.productdetailslist.feature_image }} style={{ height: 95, width: 95 }} />
              </View> */}
              </View>
            </ScrollView>

            <View style={{ marginLeft: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>
                {/* Type1 Membrane by Sarah Aqua */}
                {this.state.productdetailslist.title} by {this.state.productdetailslist.brand_title}
              </Text>
              {this.state.productdetailslist.rating === 1 ?
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  {/* <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
              <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                </View>
                : null}
              {this.state.productdetailslist.rating === 2 ?
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  {/*<MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                </View>
                : null}
              {this.state.productdetailslist.rating === 3 ?
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                </View>
                : null}
              {this.state.productdetailslist.rating === 4 ?
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                </View>
                : null}
              {this.state.productdetailslist.rating === 5 ?
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                </View>
                : null}

            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <ScrollView horizontal={true}>
            {this.renderqtyandprice()}
            {/* borderBottomColor: '#DDDDDD', borderBottomWidth: 3 */}
            {/* <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(135,206,250,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 350</Text>
              </View>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(128,128,128,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 5-9</Text>
              </View>
            </View> 

            <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(135,206,250,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 320</Text>
              </View>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(128,128,128,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 10-19</Text>
              </View>
            </View>

            <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(135,206,250,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 300</Text>
              </View>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(128,128,128,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 20-50</Text>
              </View>
            </View>*/}

            {/* <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
              <View style={{ width: 100, height: 70, backgroundColor: '#fffacd', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 250</Text>
              </View>
              <View style={{ width: 100, height: 30, backgroundColor: 'rgba(173,216,230,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 50-100</Text>
              </View>
            </View> */}
          </ScrollView>
        </View>

        <View style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'rgba(128,131,190,1)' }}>
          <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5, }}>
            <Text style={{ fontSize: 20, color: '#ffffff' }}>
              Description
            </Text>

            <TouchableOpacity
              onPress={() => this.setState({ readmoreclicked: !this.state.readmoreclicked })}
            >
              <Text style={{ fontSize: 20, marginRight: 5, color: '#ffffff', textDecorationLine: 'underline' }}>
                Readmore
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 10, marginLeft: 5,  width: Dimensions.get('window').width, marginRight: 10,}}>
          {/* <HTMLView
            value={this.state.productdetailslist.description}  paddingBottom: this.state.readmoreclicked ? 20:-50,
          /> */}
          <Text style={{fontSize:16}}
          numberOfLines={this.state.readmoreclicked?undefined:2}
          >
              {this.state.productdetailslist.description}
              </Text>
        </View>
      </View>
    )
    //  })
  }

  renderqtyspecs = () => {
    return (
      <View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginLeft: 20, marginRight: 20 }}>
            {/* <TouchableOpacity style={{width:100,height:40, backgroundColor:'#ddeba4',}}> borderBottomColor:'#DDDDDD',borderBottomWidth:10
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light',marginLeft:10 }}>
                                QTY
                            </Text>
                            <MaterialIcon name="arrow-drop-down" size={40} color="#4682b4" style={{ marginRight:10,}}/>
                            </View>
                        </TouchableOpacity> */}

            {/* <TouchableOpacity style={{width:100,height:40, backgroundColor:'#ddeba4',}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light',marginLeft:10 }}>
                                Colour
                            </Text>
                            <MaterialIcon name="arrow-drop-down" size={40} color="#4682b4" style={{ marginRight:10,}}/>
                            </View>
                        </TouchableOpacity> */}

            {/* <TouchableOpacity 
                        style={{width:100,height:40, backgroundColor:'#ddeba4',}}
                        onPress={() =>this.setState({showsize:!this.state.showsize})}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light',marginLeft:10}}>
                                Size
                            </Text>
                            <MaterialIcon name="arrow-drop-down" size={40} color="#4682b4" style={{ marginRight:10}}/>
                            </View>
                        </TouchableOpacity>
                        {this.state.showsize? 
                        // this.state.listsize.map((item,index) =>{
                        //   return (
                        <View>*/}
            {/* <FlatList
                      data={this.state.listsize}
                      renderItem={({item,index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              //width: Dimensions.get('window').width / 2 + 50,
                              justifyContent: 'center',
                              height: 30,
                             // paddingLeft: 30,
                             // borderWidth: 1,
                             // borderColor: '#DDDDDD',
                             // borderRadius: 5,
                              marginTop: 30,
                              
                            }}
                            onPress={async () => {
                              await this.setState({
                                size: item,
                                showsize: false,
                              });
                              
                            }}
                            >
                           
                            <Text style={{fontSize: 14, }}>
                              {item}
                            </Text>
                            
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item,index) => index}
                      
                    /> */}
            <View style={{ height: 40, alignItems: 'center',  }}>
              <TouchableOpacity
              style={{ width: 100, height: 40, backgroundColor:this.state.showqtymodal?'#2e3191': 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
              
              onPress={()=>this.setState({showqty:!this.state.showqty,showqtymodal:true, })}>
              <View>
                {this.state.qtyselected?
                <Text
                style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                >
                  {this.state.quantity}
                </Text>
:
                    <Text
                    style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                    >
                      Qty
                    </Text>
  }
              </View>
                {/* <ModalDropdown
                  style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
                  options={this.state.listqty}
                  dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                  dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                  textStyle={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                  onSelect={async (idx, value) => await this.setState({ quantity: value })}
                  defaultValue={'Qty'}
                //    console.log('qty',value)
                /> */}
                <View style={{ position: "absolute", right: 0, top: 0 }}>
                  <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight: 0 }} />
                </View>
              </TouchableOpacity>
            </View>
            {this.state.showqty?
            <View >
              <Modal
              animationType="slide"
              transparent={true}
              onBackdropPress={() =>this.setState({showqtymodal:false})}
              //onRequestClose={() =>this.setState({showqtymodal:false})}
              isVisible={this.state.showqtymodal}
              >
                
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    //marginTop: 5,

                  }}
                >
                  <View 
                  elevation ={15}
                  style={{ width: Dimensions.get('window').width/2 - 30, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                 >
                   <ScrollView>
              {/* {this.renderqty()} */}
               {this.state.listqty.map((item) =>{
                  return(
        <View >
          <TouchableOpacity
          onPress={async () => await this.setState({quantity:item,showqtymodal:!this.state.showqtymodal,showqty:!this.state.showqty,qtyselected:true})}
          style={{height:40,width:Dimensions.get('window').width / 2 - 30,borderBottomColor:'#DDDDDD',borderBottomWidth:1,}}
          >
            <Text
            style={{fontSize: 18, color: '#000000'}}
            >{item}</Text>
          </TouchableOpacity>
        </View>
                  )
    })}
              </ScrollView>
              </View>
              </View>
             
              </Modal>
              </View>
             
              :null
          }

<View style={{ height: 40, alignItems: 'center',  }}>
              <TouchableOpacity
              style={{ width: 100, height: 40, backgroundColor:this.state.showcolormodal?'#2e3191': 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
              
              onPress={()=>this.setState({showcolor:!this.state.showcolor,showcolormodal:true,})}>
              <View>
                {this.state.colorselected?
                <Text
                style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                >
                  {this.state.color}
                </Text>
:
                    <Text
                    style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                    >
                      Colour
                    </Text>
  }
              </View>
                {/* <ModalDropdown
                  style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
                  options={this.state.listqty}
                  dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                  dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                  textStyle={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                  onSelect={async (idx, value) => await this.setState({ quantity: value })}
                  defaultValue={'Qty'}
                //    console.log('qty',value)
                /> */}
                <View style={{ position: "absolute", right: 0, top: 0 }}>
                  <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight: 0 }} />
                </View>
              </TouchableOpacity>
            </View>
            {this.state.showcolor?
            <View >
              <Modal
              animationType="slide"
              transparent={true}
              // onRequestClose={() =>this.setState({showcolormodal:false})}
              // visible={this.state.showcolormodal}
              onBackdropPress={() =>this.setState({showcolormodal:false})}
              isVisible={this.state.showcolormodal}
              >
                
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    //marginTop: 5,

                  }}
                >
                  <View 
                  elevation ={15}
                  style={{ width: Dimensions.get('window').width/2 - 30, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                 >
                   <ScrollView>
              {/* {this.renderqty()} */}
               {this.state.listcolor.map((item) =>{
                  return(
        <View >
          <TouchableOpacity
          onPress={async () => await this.setState({color:item,showcolormodal:false,showcolor:!this.state.showcolor,colorselected:true})}
          style={{height:40,width:Dimensions.get('window').width / 2 - 30,borderBottomColor:'#DDDDDD',borderBottomWidth:1,}}
          >
            <Text
            style={{fontSize: 18, color: '#000000'}}
            >{item}</Text>
          </TouchableOpacity>
        </View>
                  )
    })}
              </ScrollView>
              </View>
              </View>
             
              </Modal>
              </View>
             
              :null
          }

<View style={{ height: 40, alignItems: 'center',  }}>
              <TouchableOpacity
              style={{ width: 100, height: 40, backgroundColor:this.state.showsizemodal?'#2e3191':'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
              
              onPress={()=>this.setState({showsize:!this.state.showsize,showsizemodal:true})}>
              <View>
                {this.state.sizeselected?
                <Text
                style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                >
                  {this.state.size}
                </Text>
:
                    <Text
                    style={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                    >
                      Size
                    </Text>
  }
              </View>
                
                <View style={{ position: "absolute", right: 0, top: 0 }}>
                  <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight: 0 }} />
                </View>
              </TouchableOpacity>
            </View>
            {this.state.showsize?
            <View >
              <Modal
              animationType="slide"
              transparent={true}
              // onRequestClose={() =>this.setState({showsizemodal:false})}
              // visible={this.state.showsizemodal}
              onBackdropPress={() =>this.setState({showsizemodal:false})}
              isVisible={this.state.showsizemodal}
              >
                
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    //marginTop: 5,

                  }}
                >
                  <View 
                  elevation ={15}
                  style={{ width: Dimensions.get('window').width/2 - 30, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                 >
                   <ScrollView>
              {/* {this.renderqty()} */}
               {this.state.listsize.map((item) =>{
                  return(
        <View >
          <TouchableOpacity
          onPress={async () => await this.setState({size:item,showsizemodal:false,showsize:!this.state.showsize,sizeselected:true})}
          style={{height:40,width:Dimensions.get('window').width / 2 - 30,borderBottomColor:'#DDDDDD',borderBottomWidth:1,}}
          >
            <Text
            style={{fontSize: 18, color: '#000000'}}
            >{item}</Text>
          </TouchableOpacity>
        </View>
                  )
    })}
              </ScrollView>
              </View>
              </View>
             
              </Modal>
              </View>
             
              :null
          }


            {/* <View style={{ height: 40, alignItems: 'center', marginTop: 0 }}>
              <ModalDropdown
                style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
                options={this.state.listcolor}
                dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                textStyle={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                onSelect={async (idx, value) => await this.setState({ color: value })}
                defaultValue={"Colour"}
              />
              <View style={{ position: "absolute", right: 0, top: 0 }}> */}
                {/* <ModalDropdown
                           //style={{width:100,height:40, backgroundColor:'rgba(128,131,190,1)',alignItems:'flex-start',justifyContent:'center'}}
                            options={this.state.listcolor}
                            dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                            dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                            textStyle = {{fontSize: 18, fontFamily: 'sans-serif-light',marginLeft:10,textAlign:'center',color:'#ffffff' }}
                            onSelect={async (value)=>await this.setState({color:value})}
                            defaultValue={<MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight:0}}/>}
                        /> */}
                {/* <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight: 0 }} />
              </View>
            </View> */}

            {/* <View style={{ height: 40, alignItems: 'center', marginTop: 0 }}>
              <ModalDropdown
                style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'flex-start', justifyContent: 'center' }}
                options={this.state.listsize}
                dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                textStyle={{ fontSize: 18, fontFamily: 'sans-serif-light', marginLeft: 10, textAlign: 'center', color: '#ffffff' }}
                onSelect={async (idx, value) => await this.setState({ size: value })}
                defaultValue={"Size"}
              />
              <View style={{ position: "absolute", right: 0, top: 0 }}> */}
                {/* <ModalDropdown
                           //style={{width:120,height:40, backgroundColor:'rgba(128,131,190,1)',alignItems:'flex-start',justifyContent:'center'}}
                            options={this.state.listsize}
                            dropdownStyle={{ width: Dimensions.get('window').width / 2 - 30, height: Dimensions.get('window').height / 2 }}
                            dropdownTextStyle={{ fontSize: 18, color: '#000000' }}
                            textStyle = {{fontSize: 18, fontFamily: 'sans-serif-light',marginLeft:10,textAlign:'center',color:'#ffffff' }}
                            onSelect={async (value)=>await this.setState({size:value})}
                            defaultValue={ <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight:0}}/>}
                        /> */}
                {/* <MaterialIcon name="arrow-drop-down" size={40} color="#ffffff" style={{ marginRight: 0 }} />
              </View>
            </View> */}

            {/* </View>
                      //   )
                      // })
                        :null} */}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 25, marginLeft: 20, marginRight: 20 }}>
            <TouchableOpacity
              onPress={() => this.addtowishlist()}
              style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'center', justifyContent: 'center' }}
            >
              <Image 
              source={{uri: 'https://romegamart.com/third-party/wish3.png'}}
              // source={require('../../assets/wish3.png')} 
              style={{ height: 30, width: 30 }} />
              {/* <Ionicons name="heart-sharp" size={45} /> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'center', justifyContent: 'center' }}
              onPress={() => this.addtocart()}
            >
              <Text style={{ fontSize: 16, color: '#ffffff' }}>
                Add to Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={{ width: 100, height: 40, backgroundColor: 'rgba(128,131,190,1)', alignItems: 'center', justifyContent: 'center' }}
            onPress={() =>alert('Coming soon...')}
            >
              <Text style={{ fontSize: 16, color: '#ffffff' }}>
                Compare
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }


  

  renderspecs = () => {
    return (
      <View style={{}}>
        <View style={{ justifyContent: 'center', marginBottom: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 50, width: Dimensions.get('window').width, backgroundColor: 'rgba(128,131,190,1)' }}>
            {/* borderBottomColor:this.state.standardbordercolor?'#1E90FF':'transparent', borderBottomWidth:5 #1E90FF  borderBottomColor:'#DDDDDD',borderBottomWidth:5*/}
            <TouchableOpacity
              style={{ height: 50, alignItems: 'center', justifyContent: 'center',width:Dimensions.get('window').width/3 }}
              onPress={() => this.showborder()}
            >
              <Text style={{ fontSize: 20, color: '#ffffff' }}>

                Standard info
              </Text>
            </TouchableOpacity>
            {/* borderBottomColor:this.state.technicalbordercolor?'#1E90FF':'transparent', borderBottomWidth:5 #1E90FF */}
            <TouchableOpacity
              style={{ height: 50, alignItems: 'center', justifyContent: 'center',width:Dimensions.get('window').width/3+20,flexWrap:'wrap'  }}
              onPress={() => this.showborder1()}
            >
              <Text style={{ fontSize: 20, color: '#ffffff' }}>
                Technical specs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ height: 50, alignItems: 'center', justifyContent: 'center',width:Dimensions.get('window').width/3-20  }}
              onPress={() => this.showborder2()}
            >
              <Text style={{ fontSize: 20, color: '#ffffff' }}>
                more info
              </Text>
            </TouchableOpacity>

            {/* <View>
                                <View style={{flexDirection:'row'}}>
                                <Entypo name="dot-single" size={20} color="#000000"/>
                                    <Text>
                                        
                                        {this.state.productdetailslist.technical_specs}
                                    </Text>
                                </View>
                            </View> */}


            {/* <View>
                                <View style={{flexDirection:'row'}}>
                                <Entypo name="dot-single" size={20} color="#000000"/>
                                    <Text>
                                        
                                        {this.state.productdetailslist.more_info}
                                    </Text>
                                </View>
                            </View>*/}

          </View>
          {this.state.standardbordercolor ?
            <View style={{ backgroundColor: '#ffffff' }}>
              <View style={{ marginBottom: this.state.productdetailslist.technical_specs ? 20 : 10, marginLeft: 10, marginTop: 10 }}>
                {/* <HTMLView
                             value={this.state.productdetailslist.technical_specs}
                             /> */}
                <HTML html={this.state.productdetailslist.technical_specs}
                  {...htmlConfig}
                />

                {/* <View style={{flexDirection:'row'}}>
                                <Entypo name="dot-single" size={20} color="#000000"/>
                                    <Text>
                                        {this.state.productdetailslist.technical_specs}
                                    </Text>
                                </View> */}
              </View>
            </View>
            : null}
          {this.state.technicalbordercolor ?
            <View style={{ backgroundColor: '#ffffff' }}>
              <View style={{ marginBottom: this.state.productdetailslist.technical_specs ? 20 : 10, marginLeft: 10, marginTop: 10 }}>
                {/* <HTMLView
                           value={this.state.productdetailslist.technical_specs}
                           /> */}
                <HTML html={this.state.productdetailslist.technical_specs}
                  {...htmlConfig}
                />
                {/* <View style={{flexDirection:'row'}}>
                          <Entypo name="dot-single" size={20} color="#000000"/>
                              <Text>
                                  {this.state.productdetailslist.technical_specs}
                              </Text>
                          </View> */}
              </View>
            </View>
            : null}
          {this.state.morebordercolor ?
            <View style={{ backgroundColor: '#ffffff' }}>
              <View style={{ marginLeft: 5, marginBottom: 20 }}>
                <HTMLView
                  value={this.state.productdetailslist.more_info}
                />
                {/* <View style={{flexDirection:'row'}}>
                          <Entypo name="dot-single" size={20} color="#000000"/>
                              <Text>
                                  {this.state.productdetailslist.more_info}
                              </Text>
                          </View> */}
              </View>
            </View>
            : null}

        </View>
      </View>
    )
  }

  renderrecommendedproducts = () => {
    // console.log('recom',this.state.recommendedproductslist)
    return this.state.recommendedproductslist.map((product) => {
      return (
        // <View style={{marginBottom:80,}}>
        //   <View style={{marginLeft:10}}>
        //     <Text style={{fontSize:24, fontWeight:'bold'}}>
        //       Recommended products
        //     </Text>
        //   </View>
        <View>
          {/* <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row' }}> */}
          <TouchableOpacity
            //onPress={() =>this.props.navigation.navigate('Productdetails',{id:product.product_id})}
            onPress={async () => await this.setState({ productid: product.product_id, showloader: !this.state.showloader, productgalleryclicked: false, showloader1: !this.state.showloader1 }, () => this.getproductdetails())}
          >
            <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, marginLeft: 10, margin: 15 }}>
              <Image key={product.product_id} source={{ uri: product.feature_image }} style={{ height: 95, width: 95 }} />
            </View>
          </TouchableOpacity>
          {/* <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image key={product.product_id} source={{uri:product.feature_image}} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image key={product.product_id} source={{uri:product.feature_image}} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image key={product.product_id} source={{uri:product.feature_image}} style={{ height: 95, width: 95 }} />
              </View>
              <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                <Image key={product.product_id} source={{uri:product.feature_image}} style={{ height: 95, width: 95 }} />
              </View> */}
          {/* </View> 
           </ScrollView>*/}
        </View>
      )
    })
  }

  getsizeandcolor = () => {

    this.state.listqty = this.range(1, 51)
   // console.log('qty', this.state.listqty)
    //await delay(5000);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(BASE_URL + "productAttributes/" + this.state.productid, requestOptions)
      .then(response => response.json())
      .then(result => {
       // console.log(result)
        // if(result.status == true) {
        // for(let i =0;i<result.size_list.length;i++){
        //   this.state.sizelist.push(result.size_list[i])
        // }

        // for(let i =0;i<result.color_list.length;i++){
        //   this.state.colorlist.push(result.color_list[i])
        // }
        // }
        this.setState({ sizelist: result.size_list })
        this.setState({ colorlist: result.color_list })
        //Object.keys(result.size_list).forEach(key => this.state.listsize.push({label: key, value: result.size_list[value]}))
        // this.state.listsize = Object.entries(result.size_list).map(([key, val]) => ({
        //   [key]: val
        // }));

        this.state.listsize = Object.values(result.size_list);
        this.state.listcolor = Object.values(result.color_list)
       // delay(5000);
       // console.log('listsize', this.state.listsize)
        //console.log('size',this.state.sizelist)
       // console.log('color', this.state.listcolor)

      })
      .catch(error => console.log('error', error));
  }

  clearasyncdata = async () => {
    // await AsyncStorage.clear();
    await AsyncStorage.removeItem('verifieduserloggedin')
    await AsyncStorage.removeItem('unverifieduserloggedin')
    this.setState({ showmenu: !this.state.showmenu })
    this.props.navigation.navigate('Login')
  }


  render() {
    const { showModal } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff'
        }}
      >
        {/* f0f8ff */}
        {this.state.showmenu ?
          <View style={{
            position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width,
            height: Dimensions.get('window').height, zIndex: 1,
          }}>
            <TouchableOpacity
              onPress={() => this.setState({ showmenu: !this.state.showmenu })}
            >

              <View >
                <View style={{ width: Dimensions.get('window').width / 2 + 50, zIndex: 2, marginTop: 0, marginBottom: 0 }}>
                  <View style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 2 + 50, backgroundColor: '#2e3191', borderRightColor: '#000000', borderRightWidth: 2 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                      <Ionicons name="person" size={30} color="#ffffff" />
                      <Text style={{ color: '#ffffff', fontSize: 24 }}>
                        Hello, {this.state.username}
                      </Text>
                    </View>
                    <Text style={{ color: '#ffffff', fontSize: 20, marginLeft: 15, marginTop: 5 }}>
                      How are you doing!!
                    </Text>
                  </View>
                  {/* rgba(65,105,225,0.3) */}
                  <View style={{ width: Dimensions.get('window').width / 2 + 50, backgroundColor: '#ffffff', borderRightColor: '#000000', borderRightWidth: 2, height: Dimensions.get('window').height - 160 }}>
                    <ImageBackground
                    source={{uri: 'https://romegamart.com/third-party/sidebar.png'}}
                      // source={require('../../assets/sidebar.jpeg')}
                      style={{ width: Dimensions.get('window').width / 2 + 50, height: Dimensions.get('window').height - 160 }}
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
          : null}
        <View style={{ height: 50, backgroundColor: '#2e3191', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <TouchableOpacity
             //onPress={() => this.props.navigation.navigate('Verifiedhome')}
             // onPress={() => {this.props.navigation.goBack()}}
            // onPress={() => { this.props.navigation.goBack()
              // check to see if it is possible to go back
             // let canGoBack = this.props.navigation.canGoBack();
              // handle what we do it we can/cannot go back
             // if (canGoBack) {
             //   this.props.navigation.goBack();
        //  } else {
                // this.doSomething();
            //    alert('no previous screen exists')
            //  }
            // onPress={()=>{
            //   if(this.props.navigation.canGoBack()){
            //     this.props.navigation.goBack()
            //   }else{
            //     alert('not possible')
            //   }
            // }}
            onPress={()=>
             // console.log('navigation',this.props)}
              this.props.navigation.goBack()}
            //onPress={()=>this.onPress()}
          >
            <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
          <Image 
          source={{uri: 'https://romegamart.com/third-party/logo.jpeg'}}
          // source={require('../../assets/logo.jpeg')} 
          style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TouchableOpacity
              // onPress={() =>this.props.navigation.navigate('Verifiedhome')}
              onPress={() => this.props.navigation.navigate('Search')}
            >
              <Ionicons name="search-outline" size={30} color="#ffffff" style={{ transform: [{ rotateY: '180deg' }] }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notifications', { id: this.state.userid })}
            >
              <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity
              //onPress={() => this.props.navigation.navigate('Menu')}
              onPress={() => this.setState({ showmenu: !this.state.showmenu })}
            >
              <Entypo name="menu" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 0.9 }}>
          <ScrollView>

            {/* <View style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 3 }}> */}
            <View>
              {/* {this.state.showloader ? */}
                {this.renderproductdetails()}
                {/* :
                <View style={{ width: Dimensions.get('window').width, marginBottom: 105 }}>
                  <ActivityIndicator size="large" color="#2e3191" />
                </View>
              } */}
              {/* <View>
              <View style={{ flexDirection: 'row', margin: 10, height: 30, alignItems: 'center' }}>
                <Feather name="check-circle" size={25} color="#2A9134" />
                <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', color: '#2A9134', marginLeft: 5 }}>
                  Verified by WaterMall
                          </Text>
              </View>

              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('screen').height / 4, width: Dimensions.get('screen').width-50, }} />
              </View>
              <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, marginLeft: 10, margin: 15 }}>
                    <Image source={require('../../assets/34.png')} style={{ height: 95, width: 95 }} />
                  </View>
                  <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                    <Image source={require('../../assets/34.png')} style={{ height: 95, width: 95 }} />
                  </View>
                  <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                    <Image source={require('../../assets/34.png')} style={{ height: 95, width: 95 }} />
                  </View>
                  <View style={{ borderColor: '#4682b4', borderWidth: 3, height: 100, width: 100, margin: 15, marginLeft: 0 }}>
                    <Image source={require('../../assets/34.png')} style={{ height: 95, width: 95 }} />
                  </View>
                </View>
              </ScrollView>

              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>
                  Type1 Membrane by Sarah Aqua
                          </Text>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                  <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                </View>
              </View>
            </View> 
           </View> 

          <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderBottomWidth: 3 }}>
            <ScrollView horizontal={true}>
              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
                <View style={{ width: 100, height: 70, backgroundColor: '#fffacd', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 350</Text>
                </View>
                <View style={{ width: 100, height: 30, backgroundColor: 'rgba(173,216,230,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 1-5</Text>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
                <View style={{ width: 100, height: 70, backgroundColor: '#fffacd', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 320</Text>
                </View>
                <View style={{ width: 100, height: 30, backgroundColor: 'rgba(173,216,230,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 5-20</Text>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
                <View style={{ width: 100, height: 70, backgroundColor: '#fffacd', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 300</Text>
                </View>
                <View style={{ width: 100, height: 30, backgroundColor: 'rgba(173,216,230,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 20-50</Text>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 10 }}>
                <View style={{ width: 100, height: 70, backgroundColor: '#fffacd', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>Rs 250</Text>
                </View>
                <View style={{ width: 100, height: 30, backgroundColor: 'rgba(173,216,230,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'sans-serif-light', }}>Qty 50-100</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View>
            <View style={{ marginTop: 5, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 24, fontFamily: 'sans-serif-light', fontWeight: '500', marginLeft: 10 }}>Description</Text>

              <TouchableOpacity style={{}}>
                <Text style={{ fontSize: 24, fontFamily: 'sans-serif-light', fontWeight: '500', marginRight: 5, color: '#ff0000', textDecorationLine: 'underline' }}>Readmore</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>

          </View>*/}

              {this.renderqtyspecs()}
              {this.renderspecs()}
              <View style={{ marginBottom: 30, }}>
                <View style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'rgba(128,131,190,1)', justifyContent: 'center' }}>
                  <Text style={{ marginLeft: 10, fontSize: 20, color: '#ffffff' }}>
                    Recommended products
                  </Text>
                </View>
                <ScrollView horizontal={true}>
                  <View style={{ flexDirection: 'row' }}>
                    {this.state.showloader1 ?
                      this.renderrecommendedproducts()
                      :
                      null}
                  </View>
                </ScrollView>
              </View>
            </View>

          </ScrollView>

        </View>

        {/* <View style={{flex:0.1}}>
                    <View style={{ position:'absolute',height:60,left:0, width:Dimensions.get('window').width,backgroundColor:'#ffffff',bottom:0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',borderTopColor:'#DDDDDD',borderTopWidth:3 }}>
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
                            <Image source={require('../../assets/menu.png')} style={{ height:30, width: 30 }} />

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
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ffffff', height: 50, position: 'absolute', width: Dimensions.get('window').width, alignItems: 'center', top: Dimensions.get('window').height - 50, borderTopColor: '#DDDDDD', borderTopWidth: 3 }}>
          <View >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('home')}
            >
              <Entypo name="home" size={35} />

            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity
            //  onPress={() => this.props.navigation.navigate('home')}
            >
              <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} />

            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('Cart')}
            >
              <Ionicons name="cart" size={35} />

            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ alignItems: 'center' }}
            // onPress={() => this.props.navigation.navigate('cart')}
            >
              <Ionicons name="help-circle" size={35} />

            </TouchableOpacity>
          </View>
        </View> */}

        <View style={{ flex: 0.1 }}>
          <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
            <View >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Verifiedhome')}
              >
                <Image 
                source={{uri: 'https://romegamart.com/third-party/home1.png'}}
                // source={require('../../assets/home1.png')} 
                style={{ height: 30, width: 30, }} />
                {/* <Entypo name="home" size={35} /> */}
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>

            <View >
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Categories',{id:50})}
               // onPress={() => this.props.navigation.navigate('Categories')}
              >
                {/* <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} /> */}
                <Image 
                source={{uri: 'https://romegamart.com/third-party/cat1.png'}}
                // source={require('../../assets/cat1.png')} 
                style={{ height: 30, width: 30, marginLeft: 20 }} />
                {/* <Entypo name="home" size={35} /> */}
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
    fontSize: 18,
    fontFamily: 'sans-serif-light',
    marginTop: 5

  },
  text1: {
    fontSize: 16,
    color: '#ffffff'
    //fontFamily:'sans-serif-light',
  },
  butt: {
    margin: 5,

  }

});

