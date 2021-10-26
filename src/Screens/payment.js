import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground,Linking } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { BASE_URL } from '../api';
//import AllInOneSDKManager from 'paytm_allinone_react-native';
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

var radio_props = [
    // { label: 'Netbanking', value: 0 },
    // { label: 'UPI', value: 1 },
    // { label: 'Credit/Debit Card', value: 2 },
    { label: 'Online', value: 'Online' },
    { label: 'Pay on Delivery', value: 'COD' }

]

//injectedJavaScript={INJECTED_JAVASCRIPT}
const INJECTED_JAVASCRIPT = `(function() {
    if (window.addEventListener) {
        window.addEventListener("message", handlePostMessage, false);
    } else {
        window.attachEvent("onmessage", handlePostMessage);
    }
 
    function handlePostMessage(obj) {
        if (obj.data && obj.data != null && obj.data != "") {
            console.log(obj.data);
            window.ReactNativeWebView.postMessage(JSON.stringify(obj.data));
        }
    }
})();`;

export default class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            value3Index: '',
            userid: '',
            productid: '',
            quantity: '',
            listofcartlist: [],
            //webviewvisible: false,
            price: 0,
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
            qty: '',
            gstofproduct: '',
            gstfinal: 0,
            deliverycharges: 0,
            addresslist: [],
            addressid: '',
            emailid: '',
            phonenumber: '',
            webviewvisible: false,
            showmenu: false,
            totalpay: 0,
            txnid:'',
            totalamount:'',
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

        await AsyncStorage.getItem('totalprice').then((totalprice) => {
            if (totalprice) {
                this.setState({ totalpay: totalprice });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('totalprice', this.state.totalpay);

        await AsyncStorage.getItem('totalquantity').then((totalquantity) => {
            if (totalquantity) {
                this.setState({ quantity: totalquantity });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('totalquantity', this.state.quantity);

        await AsyncStorage.getItem('addressid').then((addressid) => {
            if (addressid) {
                this.setState({ addressid: addressid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('addressid', this.state.addressid);

        await AsyncStorage.getItem('name').then((name) => {
            if (name) {
                this.setState({ name: name });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('name', this.state.name);

        await AsyncStorage.getItem('addressline1').then((addressline1) => {
            if (addressline1) {
                this.setState({ address: addressline1 });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('addressline', this.state.address);

        await AsyncStorage.getItem('city').then((city) => {
            if (city) {
                this.setState({ city: city });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('city', this.state.city);

        await AsyncStorage.getItem('state').then((state) => {
            if (state) {
                this.setState({ statename: state });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('statename', this.state.state);

        await AsyncStorage.getItem('zipcode').then((zipcode) => {
            if (zipcode) {
                this.setState({ pincode: zipcode });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('pincode', this.state.pincode);

        await this.getuserdetails();

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


    getuserdetails = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/myprofile/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                if (result.success == 1) {
                    this.setState({
                        // name: result.data.name,
                        phonenumber: result.data.phone,
                        // companyname: result.data.company_name,
                        emailid: result.data.email,
                        // address: result.data.address,
                        //  city: result.data.city,
                        // statename: result.data.state,
                        // pincode: result.data.zip,
                        // gst: result.data.gst
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    payment = () => {
        AllInOneSDKManager.startTransaction(
            orderId,
            mid,
            tranxToken,
            amount,
            callbackUrl,
            isStaging,
            appInvokeRestricted,
        )
            .then((result) => {
                updateUI(result);
            })
            .catch((err) => {
                handleError(err);
            });
    }

    selectpaymentmethod = () => {
        if (this.state.value) {
            AsyncStorage.setItem('paymentmethod', this.state.value)
            this.props.navigation.navigate('Cart')
        }
    }

    caltotalprice = async () => {
        let totalprice = 0;
        let totalgst = 0;
        for (let num of this.state.listofamount) {
            totalprice = totalprice + num
        }
        await this.setState({ price: totalprice })

        console.log('totalprice', this.state.price)

        totalgst = Math.round(this.state.price * 0.12)
        await this.setState({ gstfinal: totalgst })
        console.log('totalgst', this.state.gstfinal)

        let totalpay = this.state.price + this.state.gstfinal

        await this.setState({ totalpay: totalpay })

        console.log('totalpay', totalpay)

        let totalquantity = 0;
        for (let num of this.state.listofquantities) {
            totalquantity = totalquantity + num
        }

        await this.setState({ quantity: totalquantity })

        // console.log('totalquantity',)
        // AsyncStorage.setItem('totalprice', this.state.totalpay);
        // AsyncStorage.setItem('totalquantity',this.state.quantity)
    }


    getcart = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "cardlist/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    for (let i = 0; i < result.Cart_list.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.listofcartlist.push(result.Cart_list[i])
                        this.state.listofproductid.push(result.Cart_list[i].product_id)
                        this.state.listofquantities.push(result.Cart_list[i].quantity)
                        this.state.listofamount.push(result.Cart_list[i].price)
                        // this.state.listofsizes.push(result.Cart_list[i].sizes[0])
                        //this.state.listofquantities.push(result.Cart_list[i].quantity)

                    }
                    //for(let i=0;i<this.state.listofproductid.length;i++){
                    this.generatetxnid();
                   // this.caltotalprice();


                    // }
                    this.setState({ showemptylist: false })
                }
                else if (result.status == false) {
                    this.setState({ showemptylist: true })
                }
            })
            .catch(error => console.log('error', error));
    }

    generatetxnid = () => {
        console.log('random num', Math.floor(100000 + Math.random() * 900000));

        //this.setState({listoftxnid:randomid})
        for (let i = 0; i < this.state.listofproductid.length; i++) {
            let randomid = Math.floor(100000 + Math.random() * 900000)
            this.state.listoftxnid.push(randomid)
         }

         let txnid = Math.floor(100000 + Math.random() * 900000)
         this.setState({txnid:txnid})
    }

    onNavigationStateChange = () => {
        this.props.navigation.navigate('Confirmation')
    }

    paynow = () => {

        if (this.state.webviewvisible) {
            return (
                <WebView

                    //source = {{uri: 'https://github.com/facebook/react-native'}}
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    source={{
                        // uri: 'https://logrocket.com/'
                        uri: 'https://romegamart.com/api/payment-gateways?total_amount=' + this.state.totalamount + '&customer_id=' + this.state.userid + '&order_number=' + this.state.ordernumber,
                    }}
                    //onMessage={this.onMessage}
                    onMessage = {(event) => console.log('data----',event.nativeEvent.data)}
                    // injectedJavaScript="window.postMessage(document.title)"
                    //injectedJavaScript={INJECTED_JAVASCRIPT}
                    onNavigationStateChange={this.handleWebViewNavigationStateChange}
                    // onNavigationStateChange={this.onNavigationStateChange()}
                    javaScriptEnabled={true}
                

                />
            )
        }
    }

    orderpost1 = async () => {
        console.log('inside orderpost')

        // let totalquantity = 0;
        // for (let num of this.state.listofquantities) {
        //     totalquantity = totalquantity + num
        // }

        // await this.setState({quantity:totalquantity})

        console.log('userid', this.state.userid);
        console.log('product ids', this.state.listofproductid);
        console.log('quantities', this.state.listofquantities);
        // console.log('sizes', this.state.listofsizes);
        console.log('method', this.state.paymentmethod);
        console.log('pay_amount', this.state.totalpay);
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
        this.state.listofproductid.forEach((item) => {
            formdata.append("products[]", item)
        })
        this.state.listofquantities.forEach((item) => {
            formdata.append("quantities[]", item)
        })
        // this.state.listofsizes.forEach((item) => {
        //     formdata.append("sizes[]",item)
        // })
        // this.state.listofamount.forEach((item) => {
        //     formdata.append("pay_amount[]",item)
        // })
        this.state.listoftxnid.forEach((item) => {
            formdata.append("txnid[]", item)
        })
        // formdata.append("products[]", JSON.stringify(this.state.listofproductid))
        // formdata.append("quantities[]", JSON.stringify(this.state.listofquantities));
        //formdata.append("sizes[]", 'S');   //JSON.stringify(this.state.listofsizes)
        formdata.append("method", this.state.paymentmethod);
        formdata.append("pay_amount", this.state.price);
        // formdata.append("txnid[]", JSON.stringify(this.state.listoftxnid));
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
                    // this.setState({ webviewvisible: !this.state.webviewvisible })
                }

                // delay(5000);
                //this.paynow();

            })
            .catch(error => alert(error));
        // console.log('error', error)
    }

    onMessage = (event) => {
        const { data } = event.nativeEvent;
        console.log('data:', data);
        this.setState({ data });
        
        // console.log(JSON.parse(data));
        const details = JSON.parse(data);

        this.setState({
            webviewvisible: false,
        });
        if(data.status == true){
        this.props.navigation.navigate('Confirmation')
        }
    };

    paymentstatus =() =>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://romegamart.com/api/payment-check/"+this.state.userid+"/"+this.state.ordernumber, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status == "failed"){
                    this.setState({webviewvisible:false})
                   // this.props.navigation.goBack();
                }
                else{
                    this.props.navigation.navigate('Confirmation') 
                }
            })
            .catch(error => console.log('error', error));
    }


    handleWebViewNavigationStateChange = (newNavState) => {
       // console.log('newnavstate')
        console.log('new state -----',newNavState)
        if (newNavState.url === 'https://romegamart.com/api/payment-response') {
            // this.webview.stopLoading();
            // this.setState({ webviewvisible: false });
           // this.props.navigation.navigate('Confirmation')
           delay(5000);
           this.paymentstatus();
        }
    };

    paymethodselection =() =>{
        if(this.state.paymentmethod =="Online"){
            this.orderpost()
        }
        else{
           // this.setState{}
           this.props.navigation.navigate('Confirmation')
        }
    }



    orderpost = async () => {
        console.log('inside orderpost')

        var formdata = new FormData();
formdata.append("customerid", this.state.userid);
formdata.append("txnid", this.state.txnid);
formdata.append("payment_method", this.state.paymentmethod);
formdata.append("address_id", this.state.addressid);


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
                    this.setState({ ordernumber: result.order_number, totalamount:result.totalpay})
                    // this.setState({ webviewvisible: !this.state.webviewvisible })
                }

                // delay(5000);
                //this.paynow();

            })
            .catch(error => alert(error));
        // console.log('error', error)
    }

    // onMessage = (event) => {
    //     const { data } = event.nativeEvent;
    //     this.setState({ data });
    //     console.log('data:', data);
    //     // console.log(JSON.parse(data));
    //     const details = JSON.parse(data);

    //     this.setState({
    //         webviewvisible: false,
    //     });
    //     this.props.navigation.navigate('Confirmation')
    // };

    // handleWebViewNavigationStateChange = (newNavState) => {
    //     if ('https://romegamart.com/api/'.includes('payment-response')) {
    //         // this.webview.stopLoading();
    //         this.setState({ webviewvisible: false });

    //      //   this.props.navigation.navigate('Confirmation')
    //     }
    // };



    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
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
                                            source={{ uri: 'https://romegamart.com/third-party/sidebar.jpeg' }}
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
                        //onPress ={() =>this.props.navigation.navigate('Verifiedhome')}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Verifiedhome')}
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
                    {this.state.ordernumber && this.state.webviewvisible ?
                        this.paynow()

                        :
                        <ScrollView>
                            <View>
                                <View>
                                    <View style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 10 }}>
                                        <Text style={{ fontSize: 20, margin: 15 }}>
                                            Select a payment method
                                        </Text>
                                    </View>

                                    <View>
                                        <RadioForm
                                            formHorizontal={false}
                                            animation={true}

                                        >

                                            {
                                                radio_props.map((obj, i) => {
                                                    var onPress = async (value, index) => {
                                                        await this.setState({
                                                            value: value,
                                                            value3Index: index,
                                                            // showModal: !this.state.showModal,
                                                            paymentmethod: value,
                                                        },()=>this.paymethodselection() )  //() => this.orderpost()
                                                    }
                                                    return (
                                                        <RadioButton labelHorizontal={true}
                                                            key={i}

                                                            style={{ borderBottomColor: '#DDDDDD', borderBottomWidth: 2 }}
                                                        >
                                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                            <RadioButtonInput
                                                                obj={obj}
                                                                index={i}
                                                                isSelected={this.state.value3Index === i}
                                                                onPress={onPress}
                                                                borderWidth={2}
                                                                buttonColor={'#000000'}
                                                                // buttonInnerColor={'#e74c3c'}
                                                                // buttonOuterColor={'#000000'}
                                                                buttonSize={15}
                                                                buttonOuterSize={25}
                                                                buttonStyle={{}}
                                                                buttonWrapStyle={{ margin: 10, }}
                                                            />
                                                            <RadioButtonLabel
                                                                obj={obj}
                                                                index={i}
                                                                labelHorizontal={true}
                                                                onPress={onPress}
                                                                labelStyle={{ fontSize: 20, color: '#000000' }}
                                                                labelWrapStyle={{}}
                                                            />
                                                        </RadioButton>
                                                    )

                                                })
                                            }
                                        </RadioForm>
                                    </View>

                                </View>

                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 4 }}>
                                    <TouchableOpacity
                                        style={{ height: Dimensions.get('window').height / 15, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height / 5 }}
                                        onPress={() => this.setState({ webviewvisible: !this.state.webviewvisible })}
                                    >
                                        <Text style={{ fontSize: 26, color: '#ffffff' }}>
                                            Pay Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>



                        </ScrollView>
                    }
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
                    <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Verifiedhome')}
                            >
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/home1.png' }}
                                    //  source={require('../../assets/home1.png')} 
                                    style={{ height: 30, width: 30, }} />
                                {/* <Entypo name="home" size={35} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Home
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                            // onPress={() => this.props.navigation.navigate('Categories')}
                            >
                                {/* <Image source={require('../../assets/menu.png')} style={{ height: 30, width: 30 }} /> */}
                                <Image
                                    source={{ uri: 'https://romegamart.com/third-party/cat1.png' }}
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
                                    source={{ uri: 'https://romegamart.com/third-party/wish1.png' }}
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
                                    source={{ uri: 'https://romegamart.com/third-party/cart2.png' }}
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


