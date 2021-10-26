import React from 'react';
import { View, BackHandler, ActivityIndicator, Modal, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../api';
import { WebView } from 'react-native-webview';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { BlurView } from '@react-native-community/blur';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

var radio_props = [
    // { label: 'Netbanking', value: 0 },
    // { label: 'UPI', value: 1 },
    // { label: 'Credit/Debit Card', value: 2 },
    { label: 'Online', value: 'Online' },
    { label: 'Pay on Delivery', value: 'COD' }

]

export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showemptylist: false,
            fileUri: '',
            userid: '',
            productid: '',
            quantity: '',
            listofcartlist: [],
            webviewvisible: false,
            price: '',
            ordernumber: '',
            listofproductid: [],
            listofquantities: [],
            listofsizes: [],
            listofamount: [],
            listoftxnid: [],
            name: '',
            phonenumber: '',
            companyname: '',
            emailid: '',
            address: '',
            city: '',
            statename: '',
            pincode: '',
            gst: '',
            paymentmethod: '',
            showModal: false,
            value: '',
            value3Index: '',
            // userid: '',
            qty: 0,
            gstofproduct: 0,
            gstfinal: 0,
            deliverycharges: 0,
            addresslist: [],
            addressid: '',
            cartitem: 0,
            productqty: 0,
            increaseqtyclicked: false,
            decreaseqtyclicked: false,
            showmenu: false,
            totalquantity: 0,
            showloader: true,
            cartid:'',
            grandtotal:'',
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        await this.getcart();


        await this.getuserdetails();

        await AsyncStorage.getItem('addressid').then((addressid) => {
            if (addressid) {
                this.setState({ addressid: addressid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('addressid', this.state.addressid);

        this.generatetxnid();
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


    generatetxnid = () => {
        console.log('random num', Math.floor(100000 + Math.random() * 900000));

        //this.setState({listoftxnid:randomid})
        for (let i = 0; i < this.state.listofproductid.length; i++) {
            let randomid = Math.floor(100000 + Math.random() * 900000)
            this.state.listoftxnid.push(randomid)
        }
    }

    deleteImage(e) {
        e.preventDefault();
        return this.setState({ fileUri: '', });
    }


    addtocart = async (index) => {
        console.log('productidinside addtocart', this.state.productid)

        await this.increaseqty(index);
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({ "user_id": this.state.userid, "product": this.state.product, "quantity": this.state.quantity });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };



        var formdata = new FormData();
        formdata.append("user_id", this.state.userid);
        formdata.append("product", this.state.productid);
        formdata.append("quantity", this.state.productqty)
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };


        fetch(BASE_URL + "cartsave", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                    this.getcart();
                }
                else if (result.status == false) {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    getaddress = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json'
            },
        };

        fetch(BASE_URL + "myaddress/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                if (result.status == true) {
                    for (let i = 0; i < result.address_list.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.addresslist.push(result.address_list[i])
                    }

                    //  this.setState({ showloader: !this.state.showloader })
                    console.log('address list', this.state.addresslist)
                }
                else if (result.status == false) {
                    //this.setState({showemptylist:true})
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    getcart = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "cardlist/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('cart list:', result)
              // if(result.Cart_list == )
                this.state.listofcartlist.length = 0;
                // this.state.listofproductid.length=0;
                // this.state.listofquantities.length=0;
                // this.state.listofamount.length=0;
                // this.state.listofsizes.length=0;
                if (result.status == true) {
                    this.setState({ showemptylist: true })
                    for (let i = 0; i < result.Cart_list.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.listofcartlist.push(result.Cart_list[i])
                        // this.state.listofproductid.push(result.Cart_list[i].id)
                        // this.state.listofquantities.push(result.Cart_list[i].quantity)
                        // this.state.listofamount.push(result.Cart_list[i].price)
                        // this.state.listofsizes.push(result.Cart_list[i].sizes)
                        //this.state.listofquantities.push(result.Cart_list[i].quantity)
                    }
                    //for(let i=0;i<this.state.listofproductid.length;i++){
                    this.generatetxnid();
                    //this.caltotalprice();
                    this.subtotal();

                    // }
                    this.setState({ showloader: false })
                }
                else if (result.status == false) {
                    this.setState({ showemptylist: false,showloader:false })
                }
            })
            .catch(error => console.log('error', error));
    }


    deletecart = () => {

        console.log('productid', this.state.productid)
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({ "user_id": this.state.userid, "product": this.state.productid });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");

        var formdata = new FormData();
        //formdata.append("user_id", this.state.userid);
        //formdata.append("product", this.state.productid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
           // body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "deletecart/" + this.state.cartid, requestOptions)  //+ this.state.userid,
            .then(response => response.json())
            .then(result => {
                 console.log('delete item---',result)
                if (result.status == true) {
                    alert(result.message)
                    this.getcart();
                    //this.setState({ showemptylist: !this.state.showemptylist })
                }
                else if (result.status == false) {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    getuserdetails = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/myprofile/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.success == 1) {
                    this.setState({
                        name: result.data.name,
                        phonenumber: result.data.phone,
                        companyname: result.data.company_name,
                        emailid: result.data.email,
                        address: result.data.address,
                        city: result.data.city,
                        statename: result.data.state,
                        pincode: result.data.zip,
                        gst: result.data.gst
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    orderpost1 = () => {
        var formdata = new FormData();
        formdata.append("customerid", "58");
        formdata.append("products[0]", "168");
        formdata.append("quantities[0]", "1");
        formdata.append("sizes[0]", "l");
        formdata.append("method", "cod");
        formdata.append("pay_amount[0]", "345");
        formdata.append("txnid[0]", "1");
        formdata.append("payment_status", "pending");
        formdata.append("customer_email", "you@gmail.com");
        formdata.append("customer_name", "you");
        formdata.append("customer_phone", "7995351713");
        formdata.append("customer_address", "45");
        formdata.append("customer_city", "chittoor");
        formdata.append("customer_zip", "517129");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/orderpost", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    orderpost = async () => {
        console.log('inside orderpost')

        // let totalquantity = 0;
        // for (let num of this.state.listofquantities) {
        //     totalquantity = totalquantity + num
        // }

        // await this.setState({quantity:totalquantity})

        console.log('userid', this.state.userid);
        console.log('products', this.state.listofproductid);
        console.log('quantities', this.state.listofquantities);
        console.log('sizes', this.state.listofsizes);
        console.log('method', this.state.paymentmethod);
        console.log('pay_amount', this.state.listofamount);
        console.log('txnid', this.state.listoftxnid);
        console.log('customer_email', this.state.emailid);
        console.log('customer_name', this.state.name);
        console.log('customer_phone', this.state.phonenumber);
        console.log('customer_address', this.state.address);
        console.log('customer_city', this.state.city);
        console.log('customer_zip', this.state.pincode);

        // delay(5000);

        // this.state.listofproductid.forEach((item) =>{
        //     formdata.append("products", item);
        // })
        // this.state.listofquantities.forEach((item) =>{
        //     formdata.append("quantities", item);
        // })
        // this.state.listofsizes.forEach((item) =>{
        //     formdata.append("sizes", item);
        // })
        // this.state.listofamount.forEach((item) =>{
        //     formdata.append("pay_amount", item);
        // })
        // this.state.listoftxnid.forEach((item) =>{
        //     formdata.append("txnid", item);
        // })
        var formdata = new FormData();
        formdata.append("customerid", this.state.userid);
        formdata.append("products[]", JSON.stringify(this.state.listofproductid))
        formdata.append("quantities[]", JSON.stringify(this.state.listofquantities));
        formdata.append("sizes[]", JSON.stringify(this.state.listofsizes));
        formdata.append("method", this.state.paymentmethod);
        formdata.append("pay_amount[]", JSON.stringify(this.state.listofamount));
        formdata.append("txnid[]", JSON.stringify(this.state.listoftxnid));
        formdata.append("payment_status", 'Pending');
        formdata.append("customer_email", this.state.emailid);
        formdata.append("customer_name", this.state.name);
        formdata.append("customer_phone", this.state.phone);
        formdata.append("customer_address", this.state.address);
        formdata.append("customer_city", this.state.city);
        formdata.append("customer_zip", this.state.pincode);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        await fetch("https://romegamart.com/api/orderpost", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    this.setState({ ordernumber: result.order_number })
                    this.setState({ webviewvisible: !this.state.webviewvisible })
                }

                delay(5000);
                // this.paynow();

            })
            .catch(error => console.log('error', error));
    }


    selectpaymentmethod = async () => {
        console.log('inside paymentmethod')
        this.setState({ showModal: !this.state.showModal })
        // delay(5000);
        // await this.paynow();
        //   console.log('payment',this.state.paymentmethod)
        //     if(this.state.paymentmethod != ''){

        //        await this.orderpost();
        //     }
    }

    paynow1 = () => {
        console.log('inside paynow')
        console.log('payment', this.state.paymentmethod)
        if (this.state.paymentmethod != '') {

            this.orderpost();
        }
    }


    rendercart = () => {
        // return this.state.listofcartlist.map((item) => {
        return (
            <View style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 3, }}>
                <FlatList
                    numColumns={2}
                    keyExtractor={(item, index) => String(item.cart_id)}
                    data={this.state.listofcartlist}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginTop: 5, marginLeft: Dimensions.get('window').width / 6, marginRight: Dimensions.get('window').width / 6 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image key={item.cart_id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                                        <TouchableOpacity
                                            onPress={async () => { await this.setState({ productid: item.cart_id }, () => this.deletecart()) }}
                                        >
                                            <Entypo name='circle-with-minus' size={20}
                                                style={{
                                                    marginLeft: -2,
                                                    marginTop: 0,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'sans-serif-light' }}>

                                        {item.title}

                                    </Text>
                                    <Text style={{ color: '#ff0000' }}>

                                        {item.price}
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

    paynow = () => {

        if (this.state.webviewvisible) {
            return (
                <WebView

                    //source = {{uri: 'https://github.com/facebook/react-native'}}
                    // ref={(ref) => {
                    //     this.webview = ref;
                    // }}
                    //startInLoadingState={false}
                    //javaScriptEnabled={true}
                    source={{
                        // uri: 'https://logrocket.com/'
                        uri: 'https://romegamart.com/api/payment-gateways?total_amount=' + this.state.price + '&customer_id=' + this.state.userid + '&order_number=' + this.state.ordernumber,
                    }}
                //javaScriptEnabled={true}
                //domStorageEnabled={true}

                />
            )
        }
    }

    clearallcart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "user_id": this.state.userid });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BASE_URL + "deleteallcart/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                    this.setState({ showemptylist: false })
                }
                else if (result.status == false) {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    increaseqty = async (index) => {

        console.log('cartitem', this.state.cartitem)
        const { listofcartlist } = this.state;
        listofcartlist[index].quantity += 1;
        await this.setState({
            listofcartlist
        })

        console.log('itms in cart-----', this.state.listofcartlist)

        this.increasecartqty(this.state.listofcartlist[index].quantity);
        // if(this.state.cartitem == index){
        // await this.setState({qty:this.state.qty+1})
       // this.subtotal();
        // }

    }

    decreaseqty = async (index) => {
       
            const { listofcartlist } = this.state;
        listofcartlist[index].quantity -= 1;
        await this.setState({
            listofcartlist
        })

        this.increasecartqty(this.state.listofcartlist[index].quantity);

        if(this.state.listofcartlist[index].quantity == 0) {
            this.deletecart();
            
        }
       
        //this.subtotal();
        //    if(this.state.cartitem == index) {
        //   this.setState({qty:this.state.qty-1})
        //  }

    }

    calgst = async () => {
        console.log('price', this.state.listofcartlist.price)
        let gst = this.state.listofcartlist.price * 0.12
        await this.setState({ gstofproduct: gst })

    }

    // caltotalprice = async () => {
    //     let totalprice = 0;
    //     let totalgst = 0;
    //     for (let num of this.state.listofamount) {
    //         totalprice = totalprice + num
    //     }
    //     await this.setState({ price: totalprice })

    //     totalgst = Math.round(this.state.price * 0.12)
    //     await this.setState({ gstfinal: totalgst })
    //     console.log('totalgst', this.state.gstfinal)

    //     let totalquantity = 0;
    //     for (let num of this.state.listofquantities) {
    //         totalquantity = totalquantity + num
    //     }

    //     await this.setState({ quantity: totalquantity })

    //     AsyncStorage.setItem('totalprice', this.state.price + this.state.totalgst);
    //     //AsyncStorage.setItem('totalquantity', this.state.totalquantity)
    // }

    caltotalgst = async () => {
        let totalprice = 0;
        let totalgst = 0;
        for (let num of this.state.listofamount) {
            totalprice = totalprice + num
        }
        await this.setState({ price: totalprice })

        totalgst = this.state.price * 0.12
        await this.setState({ gstfinal: totalgst })
        //console.log('totalgst', this.state.gstfinal)

    }

    onChangeQty(quantity, index) {
        const { listofcartlist } = this.state;
        listofcartlist[index].quantity += 1;
        this.setState({
            listofcartlist
        })

    }

    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }

    increasecartqty =(value) => {
        console.log('value-------',value)
        var formdata = new FormData();
    formdata.append("qty", value);
    formdata.append("cart_id",this.state.cartid);
    formdata.append("user_id",this.state.userid);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://romegamart.com/api/add-cart-qty", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.status == true){
            alert(result.message)
            this.setState({price:result.subtotal, gstfinal:result.gst, deliverycharges:result.delivery_charge,grandtotal:result.grandtotal })
            AsyncStorage.setItem('totalprice', JSON.stringify(result.grandtotal));
            AsyncStorage.setItem('totalquantity', JSON.stringify(result.totalqty));
        }
      })
      .catch(error => console.log('error', error));
      }
    


    rendercartvalues = () => {
        //this.calgst()
        return this.state.listofcartlist.map((item, index) => {
            // let qty = parseInt(item.quantity)
            // this.setState({qty:qty})
            return (
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 4, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 5, }}>
                        <View style={{ width: Dimensions.get('window').width / 4 + 40, height: Dimensions.get('window').width / 4 + 40, borderWidth: 2, borderColor: '#rgba(128,131,190,1)', alignItems: 'center', justifyContent: 'center' }}>
                            <Image key={item.cart_id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').width / 4 + 20, width: Dimensions.get('window').width / 4 + 20 }} />
                        </View>
                        <View>
                            <View style={{ width: Dimensions.get('window').width - 120, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, }}>

                                <Text key={item.cart_id} style={{ fontSize: 16, flexWrap: 'wrap' }}>

                                    {item.title}
                                </Text>

                            </View>
                            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width / 2 + 30, justifyContent: 'space-between' }}>
                                <View
                                    style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(60,63,134,1)', borderRadius: 8, alignSelf: 'flex-start', marginLeft: 15, }}
                                >
                                    <Text key={item.cart_id} style={{ color: '#ffffff', fontSize: 16 }}>
                                        {item.brand_title}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ productid: item.product_id, productqty: (item.quantity + this.state.qty), cartitem: index,cartid:item.cart_id  }, () => this.decreaseqty(index))}
                                    >
                                        <View style={{ height: 20, width: 25, backgroundColor: 'rgba(60,63,134,1)', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', }}>
                                                -
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderColor: 'rgba(60,63,134,1)', borderWidth: 2, marginRight: -5, zIndex: 1, marginLeft: -5, backgroundColor: '#ffffff' }}>
                                        <Text key={index} style={{ color: 'rgba(60,63,134,1)', fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginRight: 5 }}>
                                            {item.quantity}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={async () => { await this.setState({ productid: item.product_id, productqty: (item.quantity + this.state.qty), cartitem: index, cartid:item.cart_id }, () => this.increaseqty(index)) }}   //this.increaseqty(index) this.increasecartqty()
                                    >
                                        <View style={{ height: 20, width: 25, backgroundColor: 'rgba(60,63,134,1)', borderTopRightRadius: 5, borderBottomRightRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                                                +
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',width: Dimensions.get('window').width / 2 + 30, justifyContent: 'space-between', alignItems:'center',marginRight:10}}>
                            <Text key={item.cart_id} style={{ color: 'rgba(60,63,134,1)', fontSize: 16, fontWeight: 'bold', marginLeft: 15, }}>
                                Rs {item.price * (item.quantity + this.state.qty)}
                            </Text>
                            <TouchableOpacity
                            onPress={() =>{this.setState({cartid: item.cart_id},()=>this.deletecart())}}
                            >
                            <AntDesign name="delete" size={15} color="rgba(128,131,190,1)" style={{ marginRight: 5 }} />
                            </TouchableOpacity>
                            </View>

                            <View style={{ height: 42, width: Dimensions.get('window').width / 2 + 60, backgroundColor: 'rgba(128,131,190,1)', position: 'absolute', top: 100 }}>
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                                    {/* <View>
                            <Text key={item.id} style={{fontFamily:'sans-serif-light',fontSize:16}}>
                                Qty
                            </Text>
                            </View>
                            <View style={{marginLeft:15,flexDirection:'row',}}>
                            <TouchableOpacity
                            // onPress={async () =>
                            //     await this.setState({
                            //         cartitem:index},
                                    
                            //         ()=> this.state.cartitem == index?this.decreaseqty():null)}
                           // onPress={() => { this.setState({ productid: item.id, cartitem:index },()=> this.state.cartitem == index?this.deletecart():null) }}
                            onPress={() =>this.setState({productid: item.id,cartitem:index},()=> this.decreaseqty(index))}
                            >
                                <Text style={{color:'#4169e1',fontSize:16,fontWeight:'bold',}}>
                                    -
                                </Text>
                            </TouchableOpacity>
                            <View >
                                
                                <Text key={index} style={{color:'#4169e1',fontSize:16,fontWeight:'bold',marginLeft:5,marginRight:5}}>
                                   
                                    {item.quantity}
                                   
                                </Text>
                                
                            </View>
                            <TouchableOpacity
                            // onPress={async () =>
                            //     await this.setState({
                            //         cartitem:index},
                            //         ()=> this.state.cartitem == index?this.increaseqty():null)}
                           // onPress={() => { this.setState({ productid: item.id, productqty:(item.quantity+this.state.qty),cartitem:index },()=> this.state.cartitem == index?this.addtocart():null) }}
                            onPress={async () => { await this.setState({ productid: item.id, productqty:(item.quantity+this.state.qty),cartitem:index },()=> this.increaseqty(index)) }}  
                           
                      
                            >
                                <Text style={{color:'#4169e1',fontSize:16,fontWeight:'bold'}}>
                                    +
                                </Text>
                            </TouchableOpacity>
                            </View> */}
                                    <View key={index} style={{}}>
                                        <View style={{ flexDirection: 'row', marginRight: 10, width: Dimensions.get('window').width / 2 }}>
                                            <Text key={item.cart_id} style={{ color: '#ffffff' }}>GST({item.gst}%)</Text>
                                            <View style={{ position: 'absolute', right: 0 }}>
                                                <Text key={item.cart_id} style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', }}>
                                                    Rs {Math.round(item.price * (item.quantity + this.state.qty) * 0.12)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginRight: 10, width: Dimensions.get('window').width / 2 }}>
                                            <Text key={item.cart_id} style={{ color: '#ffffff' }}>Delivery Charges</Text>
                                            <View style={{ position: 'absolute', right: 0 }}>
                                                <Text key={item.cart_id} style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Rs 0</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            )
        })
    }

    subtotal = async () => {
        let totalprice = 0
        let totalgst = 0
        for (let num of this.state.listofcartlist) {

            totalprice = totalprice + num.price * (num.quantity + this.state.qty)

        }
        await this.setState({ price: totalprice })
        // }) for (let num of this.state.listofamount) {
        //     totalprice = totalprice + num
        // }
        // await this.setState({ price: totalprice })

        totalgst = Math.round(this.state.price * 0.12)
        await this.setState({ gstfinal: totalgst })
        console.log('totalgst', this.state.gstfinal)

        let totalquantity = 0;
        for (let num of this.state.listofcartlist) {
            totalquantity = totalquantity + (num.quantity + this.state.qty)
        }

        await this.setState({ quantity: totalquantity })

        await this.setState({grandtotal:this.state.price+this.state.gstfinal})

        AsyncStorage.setItem('totalprice', JSON.stringify(this.state.price + this.state.totalgst));
        AsyncStorage.setItem('totalquantity', JSON.stringify(this.state.quantity));
    }

    rendeordervalues = () => {
        //return this.state.listofcartlist.map((item) =>{
        //console.log('subtotal',this.state.price)
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <View style={{ height: Dimensions.get('window').height / 4 + 10, width: Dimensions.get('window').width - 30, backgroundColor: '#ffffff', borderColor: '#rgba(128,131,190,1)', borderWidth: 2, borderRadius: 15 }}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light' }}>
                                Sub total                    :
                            </Text>
                            <Text style={{ fontSize: 20, }}>
                                Rs {this.state.price}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light' }}>
                                GST                             :
                            </Text>
                            <Text style={{ fontSize: 20, }}>
                                Rs {this.state.gstfinal}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light' }}>
                                Delivery Charges      :
                            </Text>
                            <Text style={{ fontSize: 20, }}>
                                Rs {this.state.deliverycharges}
                            </Text>
                        </View>
                        <View style={{ backgroundColor: 'rgba(128,131,190,1)', height: 40, width: Dimensions.get('window').width - 32, marginTop: 10, }}>
                            <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif-light', color: '#ffffff' }}>
                                    Order Total                 :
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
                                    {/* Rs {this.state.price + this.state.gstfinal + this.state.deliverycharges} */}
                                    Rs {this.state.grandtotal}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            //)}
        )
    }


    render() {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f0f8ff'   //f0f8ff
                }}
            >
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
                                    <View style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 2 + 50, backgroundColor: 'rgba(60,63,134,1)', borderRightColor: '#000000', borderRightWidth: 2 }}>
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
                                         source={{uri: 'https://romegamart.com/third-party/sidebar.jpeg'}}
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
                        // onPress ={() =>this.props.navigation.navigate('Productdetails',{id:})}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image 
                     source={{uri: 'https://romegamart.com/third-party/logo.jpeg'}}
                    // source={require('../../assets/logo.jpeg')} 
                    style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Search')}
                        //onPress={() => this.props.navigation.navigate('Verifiedhome')}
                        >
                            <Ionicons name="search-outline" size={30} color="#ffffff" style={{ transform: [{ rotateY: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notifications', { id: this.state.userid })}
                        >
                            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('Menu')}
                            onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        >
                            <Entypo name="menu" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView>

                        {this.state.showloader ?

                            <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                <ActivityIndicator size="large" color="#2e3191" />
                            </View>

                            :
                            this.state.showemptylist ?
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ height: 40, width: Dimensions.get('window').width / 3 + 50, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'rgba(60,63,134,1)' }}>
                                            <Text style={{ fontSize: 30, color: '#ffffff' }}>
                                                My Cart
                                            </Text>
                                        </View>
                                        <View style={{ height: 10, width: Dimensions.get('window').width / 2 + 50, backgroundColor: 'rgba(60,63,134,1)' }}>

                                        </View>
                                    </View>
                                    
                                    <View>
                                    {this.rendercartvalues()}
                                    </View>
                                    <View>
                                        {this.rendeordervalues()}
                                    </View>

                                    <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                                        <TouchableOpacity
                                            style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 15, }}
                                            onPress={() => this.props.navigation.navigate('Addaddress')}
                                        //onPress={() => this.selectpaymentmethod()}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 24 }}>
                                                Add address
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                :
                                    <View>
                                        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                            <Image 
                                             source={{uri: 'https://romegamart.com/third-party/cart.png'}}
                                            // source={require('../../assets/cart.png')} 
                                            style={{ height: Dimensions.get('window').height / 7 + 10, width: Dimensions.get('window').width / 3, marginBottom: 20 }} />
                                            <Text style={{ fontSize: 26, }}>
                                                Your cart is empty
                                            </Text>
                                            <Text style={{ fontSize: 20, margin: 20, }}>
                                                Ohh ! It seems you haven't added any products in you cart yet.
                                            </Text>
                                        </View>

                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 35, marginBottom: 40 }}>
                                            <TouchableOpacity
                                                style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width - 60, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 5 }}
                                                onPress={() => this.props.navigation.navigate('Verifiedhome')}
                                            >
                                                <Text style={{ fontSize: 26, color: '#ffffff' }}>
                                                    Continue Shopping
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                               
                                // :
                                // null
                        }
                    </ScrollView>


                </View>




                {/* <View style={{ flex: 0.1 }}>
                    <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: '#ffffff', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: '#DDDDDD', borderTopWidth: 3 }}>
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
                                //onPress={() => this.props.navigation.navigate('Categories')}
                                onPress={() => this.props.navigation.navigate('Categories',{id:50})}
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


