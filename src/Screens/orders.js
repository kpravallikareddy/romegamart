import React from 'react';
import { View, BackHandler, ActivityIndicator, Modal, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../api';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as moment from 'moment';
import Moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));



export default class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showemptylist: false,
            fileUri: '',
            userid: '',
            productid: '',
            quantity: '',
            listoforders: [],
            price: '',
            ordernumber: '',
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
            gstofproduct: '',
            gstfinal: '',
            deliverycharges: 0,
            addresslist: [],
            addressid: '',
            cartitem: 0,
            productqty: 0,
            increaseqtyclicked: false,
            decreaseqtyclicked: false,
            showmenu: false,
            fromdate: new Date(),
            fromdate1: Moment(new Date()).format('YYYY-MM-DD'),
            todate: new Date(),
            todate1: Moment(new Date()).format('YYYY-MM-DD'),
            showfromdate: true,
            showtodate: true,
            showloader: false,
            giverating: false,
            rating: '',
            showreviewmodal: false,
            review: '',
            rateindex: '',
            isRatingproduct: 0,
            iscategoryItem:0,
            showfromcalendar:false,
            showtocalendar:false,
           
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

        await this.getorders();

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

    getorders = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/orderlist/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('orders', result)
                this.state.listoforders.length=0;
                if (result.status == true) {
                    for (let i = 0; i < result.order_list.length; i++) {

                        this.state.listoforders.push(result.order_list[i])
                    }
                    this.setState({ showloader: !this.state.showloader })

                    console.log('orders', this.state.listoforders)
                }
            })
            .catch(error => console.log('error', error));
    }

    getorders1 = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/myorder/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    for (let i = 0; i < result.order_list.length; i++) {

                        this.state.listoforders.push(result.order_list[i])
                    }
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

    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }

    sendrating = (rating) => {
        var formdata = new FormData();
        formdata.append("order_id", this.state.ordernumber);
        formdata.append("rating", rating);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/order-rating", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    ratingCompleted =(rating) =>{
        console.log('Rating is: ' + rating);

        this.sendrating(rating);
    }

    sendreview = () => {
        var formdata = new FormData();
        formdata.append("order_id", this.state.ordernumber);
        formdata.append("review", this.state.req);


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/order-review", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    alert(result.message)
                    this.setState({ showreviewmodal: false })
                }
                else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }




    renderorders = () => {
        return this.state.listoforders.map((item, index) => {
            return (
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 5, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, }}>
                        <View style={{ marginRight: 20, marginTop: 15 }}>
                            <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').width / 5, width: Dimensions.get('window').width / 5 }} />
                        </View>
                        <View>
                            <View style={{ width: Dimensions.get('window').width - 120, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text key={item.id} style={{ fontSize: 16, flexWrap: 'wrap', fontWeight: 'bold' }}>
                                    {item.title}
                                </Text>
                                {/* <Text key={item.id} style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold', }}>
                                    Rs {item.price * (item.quantity + this.state.qty)}
                                </Text> */}
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text key={item.id} style={{ color: '#000000', fontSize: 16 }}>
                                    Order {item.status}
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                {/* <AirbnbRating
                                    size={20}
                                /> */}
                                {/* {item.star_rating > 0? */}
                                <TouchableOpacity
                                onPress={() =>this.setState({ordernumber:item.orderid})}
                                >
                                <Rating
                                    type='custom'
                                    startingValue= {item.star_rating}
                                    
                                    // showRating
                                    onFinishRating={this.ratingCompleted}
                                    style={{alignItems:'flex-start' }}
                                    imageSize={20}
                                />
                                </TouchableOpacity>
                                {/* // :
                                // <Rating
                                //     ratingColor='#DDDDDD'
                                //    // showRating
                                //    // onFinishRating={this.ratingCompleted}
                                //     style={{alignItems:'flex-start' }}
                                //     imageSize={20}
                                // />
                                // } */}
                            </View>
                            {/*<View>
                                {this.state.giverating && this.state.isRatingproduct == index?
                                    <View style={{ marginTop:10 }}>
                                       {this.state.rateindex =='1' && item.rating ==1?
                                       <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,giverating:true,rating:"1"}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true}, () =>this.sendrating())}
                                       >
                                           <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true}, () =>this.sendrating())}
                                       >
                                           <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true}, () =>this.sendrating())}
                                       >
                                           <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true}, () =>this.sendrating())}
                                       >
                                           <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                       </TouchableOpacity>
                                       </View>
                                        :
                                        this.state.rateindex =='2' && item.rating ==2?
                                        <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"1",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        </View>
                                        :
                                        this.state.rateindex == '3' && item.rating ==3?
                                        <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"1",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        
                                        </View>
                                        :
                                        this.state.rateindex == '4' && item.rating ==4?
                                        <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"1",giverating:true, }, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        </View>
                                        :
                                        this.state.rateindex == '5' && item.rating ==5?
                                        <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"1",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true}, () =>this.sendrating())}
                                       >
                                           <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                       </TouchableOpacity>
                                       </View>
                                        :
                                        null
                                        }
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"1",giverating:true,rateindex:'1', isRatingproduct:index}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"2",giverating:true,rateindex:'2',isRatingproduct:index}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"3",giverating:true,rateindex:'3',isRatingproduct:index}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                         onPress={() =>this.setState({ ordernumber:item.orderid,rating:"4",giverating:true,rateindex:'4',isRatingproduct:index}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={() =>this.setState({ ordernumber:item.orderid,rating:"5",giverating:true,rateindex:'5',isRatingproduct:index}, () =>this.sendrating())}
                                        >
                                            <MaterialIcon name="star-rate" size={30} color="#DDDDDD" style={{ marginRight: 0, }} />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>*/}

                            <View key={index}>
                                <TouchableOpacity
                                    style={{ marginTop: 5 }}
                                    onPress={() => this.setState({ showreviewmodal: true, iscategoryItem: index,ordernumber:item.orderid })}
                                >
                                    <Text style={{ fontSize: 16, color: 'rgba(60,63,134,1)', fontWeight: 'bold' }}>
                                        Write a review
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.showreviewmodal && this.state.iscategoryItem == index ?
                                <View>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        onRequestClose={() => this.setState({ showreviewmodal: false })}
                                        visible={this.state.showreviewmodal}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 5,

                                            }}
                                        >
                                            <View style={{ width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height / 3, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18, }}>Please submit your review</Text>
                                                <TextInput
                                                    placeholder={'Please type here'}
                                                    onChangeText={(text) => this.setState({ review: text })}
                                                    value={this.state.review}
                                                    style={{ height: 40, width: Dimensions.get('window').width - 80, fontSize: 14, borderColor: '#DDDDDD', borderWidth: 1, marginTop: 10 }}
                                                />

                                                {/* <TextInput
                                        placeholder={'Please enter the size'}
                                        onChangeText={(text) => this.setState({ req_size: text })}
                                        value={this.state.req_size}
                                        style={{ height: 40, width: Dimensions.get('window').width - 80, fontSize: 14, borderColor: '#DDDDDD', borderWidth: 1, marginTop:10 }}
                                    /> */}

                                                <TouchableOpacity
                                                    style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}
                                                    onPress={() => this.sendreview()}
                                                >
                                                    <Text style={{ color: '#ffffff', fontSize: 20 }}>
                                                        Submit
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                : null
                            }
                        </View>
                    </View>


                    {/* <View>
                        <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                            <View>
                                <Text key={item.id} style={{ fontFamily: 'sans-serif-light', fontSize: 16 }}>
                                    Qty
                                </Text>
                            </View>
                            <View style={{ marginLeft: 15, flexDirection: 'row', }}>
                                <TouchableOpacity
                                    // onPress={async () =>
                                    //     await this.setState({
                                    //         cartitem:index},

                                    //         ()=> this.state.cartitem == index?this.decreaseqty():null)}
                                    // onPress={() => { this.setState({ productid: item.id, cartitem:index },()=> this.state.cartitem == index?this.deletecart():null) }}
                                    onPress={() => this.setState({ productid: item.id, cartitem: index }, () => this.decreaseqty(index))}
                                >
                                    <Text style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold', }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <View >
                                    
                                    <Text key={index} style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginRight: 5 }}>

                                        {item.quantity}

                                    </Text>
                                   
                                </View>
                                <TouchableOpacity
                                    
                                    onPress={async () => { await this.setState({ productid: item.id, productqty: (item.quantity + this.state.qty), cartitem: index }, () => this.increaseqty(index)) }}

           
                                    <Text style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold' }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View key={index} style={{ marginLeft: 50 }}>
                                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 165, justifyContent: 'space-between' }}>
                                    <Text>GST({item.gst}%)</Text>
                                    <Text style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold', marginLeft: 55 }}>
                                        Rs {Math.round(item.price * (item.quantity + this.state.qty) * 0.12)}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 165, justifyContent: 'space-between' }}>
                                    <Text>Delivery Charges</Text>
                                    <Text style={{ color: '#4169e1', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Rs 0</Text>
                                </View>
                            </View> 
                        </View>
                    </View>*/}
                </View >
            )
        })
    }


    orderfilter =() =>{

        console.log('userid', this.state.userid)
        console.log('fromdate', this.state.fromdate1)
        console.log('todate', this.state.todate1)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://romegamart.com/api/orderlist/"+this.state.userid+"?from_date="+this.state.fromdate1+"&to_date="+this.state.todate1, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result from filter api',result)
                this.state.listoforders.length=0;
                if (result.status == true) {
                    for (let i = 0; i < result.order_list.length; i++) {

                        this.state.listoforders.push(result.order_list[i])
                    }
                    this.setState({ showloader: !this.state.showloader })

                    console.log('orders--from filter', this.state.listoforders)
                }
            })
            .catch(error => console.log('error', error));
    }


    datewisesorting = () => {
        var formdata = new FormData();
        formdata.append("customerid", this.state.userid);
        formdata.append("from", this.state.fromdate);
        formdata.append("to", this.state.todate);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "orderwisesorting/" + this.state.userid, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == true) {
                    for (let i = 0; i < result.order_list.length; i++) {

                        this.state.listoforders.push(result.order_list[i])
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'   //f0f8ff
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
                                            source={{ uri: 'https://romegamart.com/third-party/sidebar.jpeg' }}
                                            //source={require('../../assets/sidebar.jpeg')}
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
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
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

                        {this.state.showemptylist ?
                            <View>
                                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                    <Image
                                        source={{ uri: 'https://romegamart.com/third-party/cart.png' }}
                                        //source={require('../../assets/cart.png')} 
                                        style={{ height: Dimensions.get('window').height / 7 + 10, width: Dimensions.get('window').width / 3, marginBottom: 20 }} />
                                    <Text style={{ fontSize: 26, }}>
                                        No orders
                                    </Text>
                                    <Text style={{ fontSize: 20, margin: 20, }}>
                                        Ohh ! It seems you haven't bought any products yet.
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
                            :
                            <View>
                                <View style={{}}>
                                    <Text style={{ fontSize: 30, margin: 10 }}>
                                        My Orders
                                    </Text>
                                </View>

                                <View style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: '#f5f5f5', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                                        <View>
                                            <Text style={{ fontSize: 18 }}>
                                                Filter
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 18, marginRight: 5 }}>
                                                Date From
                                            </Text>
                                            <View>

                                                <TouchableOpacity
                                                    onPress={() => this.setState({ showfromdate: !this.state.showfromdate,showfromcalendar:!this.state.showfromcalendar })}
                                                >
                                                    {this.state.showfromdate ?
                                                        <Image
                                                            source={{ uri: 'https://romegamart.com/third-party/date.png' }}
                                                            // source={require('../../assets/date.png')} 
                                                            style={{ height: 30, width: 30 }} />
                                                        :
                                                        <View>
                                                            <Text style={{ fontSize: 18, }}>
                                                                {this.state.fromdate1}
                                                            </Text>
                                                        </View>
                                                    }
                                                </TouchableOpacity>
                                                {this.state.showfromcalendar?
                                                    <DateTimePicker
                                                        //testID="dateTimePicker"
                                                        value={this.state.fromdate}
                                                        mode={'date'}
                                                        is24Hour={true}
                                                        display="calendar"
                                                        onChange={async (event, value) => {
                                                            await this.setState({ fromdate: value, showfromdate: false,showfromcalendar:false, fromdate1: Moment(value).format('YYYY-MM-DD') })
                                                        }}
                                                    />
                                                    :
                                                    null
                                                }
                                            </View>
                                            <Text style={{ fontSize: 18, marginRight: 5 }}> To</Text>
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ showtodate: !this.state.showtodate,showtocalendar:!this.state.showtocalendar })}
                                                >
                                                    {this.state.showtodate ?
                                                        <Image
                                                            source={{ uri: 'https://romegamart.com/third-party/date.png' }}
                                                            // source={require('../../assets/date.png')} 
                                                            style={{ height: 30, width: 30 }} />
                                                        :
                                                        <View>
                                                            <Text style={{ fontSize: 18, }}>
                                                                {this.state.todate1}
                                                            </Text>
                                                        </View>
                                                    }
                                                </TouchableOpacity>
                                                {this.state.showtocalendar?
                                                    <DateTimePicker
                                                        //testID="dateTimePicker"
                                                        value={this.state.todate}
                                                        mode={'date'}
                                                        is24Hour={true}
                                                        display="calendar"
                                                        onChange={async (event, value) => {
                                                            await this.setState({ todate: value, showtodate: false,showtocalendar:false, todate1: Moment(value).format('YYYY-MM-DD') }, () => this.orderfilter())
                                                        }}
                                                    />
                                                    :
                                                    null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    {/* {this.state.showloader? */}
                                    {this.renderorders()}
                                    {/* :
                                     <View style={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height/2, alignItems:'center',justifyContent:'center'}}>
                                  <ActivityIndicator size="large" color="#2e3191" />
                                      </View>
                                     } */}

                                </View>
                            </View>
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
                                    source={{ uri: 'https://romegamart.com/third-party/home1.png' }}
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


