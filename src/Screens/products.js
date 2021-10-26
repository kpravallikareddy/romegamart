import React from 'react';
import { View, BackHandler, ActivityIndicator, AsyncStorage, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../api';
import { TouchableNativeFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { ListItem } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            productdetailslist: [],
            // sortvalue: 'popular',   //this.props.route.params.sortvalue,
            subcategoryid: this.props.route.params.id,
            rating: 0,
            userid: '',
            showloader: false,
            productlistbanner: '',
            showmenu: false,
            sortvalue: '',
            showsortdropdown: false,
            showfilterdropdown: false,
            filtervalue: '',
            brandtitles: [],
            showbrandnames: false,
            showprices: false,
            prices: ['0-1000', '1001-10000', '10001-100000'],
            showcategories: false,
            categorynames: [],
            brands: [],
            categories: [],
            listofprices: [],
            banner: [],
            brandid: '',
            pricevalue: '',
            listofproducts: [],
            categoryid: '',
            subhead: '',

        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        //  AsyncStorage.getItem('sortby').then((sortby) => {
        //     if(sortby){
        //         this.setState({sortvalue: sortby});
        //         console.log('sort',this.state.sortvalue);
        //     }
        // });

        let subcategoryid = this.props.route.params.id;
        console.log('subcat id in component did mount',subcategoryid)

        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        // this.getproductdetails();
        await this.getfilterlist();
        await this.getproducts();

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

    UNSAFE_componentWillMount() {
        // this.getproductdetails();
        // this.getcategories();
        // this.getfilterlist();
        // this.getproducts();

    }

    getfilterlist = () => {

        //  console.log('subcatid',this.state.subcategoryid)
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter/" + this.state.subcategoryid, requestOptions)
            .then(response => response.json())
            .then(result => {
               // console.log('product list---', result)
                if (result.status == 201) {
                    // this.setState({banner:result.banner})
                    this.setState({ subhead: result.banner[0].name })
                    for (let i = 0; i < result.banner.length; i++) {
                        this.state.banner.push(result.banner[i])
                    }
                    for (let i = 0; i < result.brands.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.brands.push(result.brands[i])
                    }
                    //   for (let i = 0; i < result.category.length; i++) {
                    //     // this.setState({documentslist:result.data[i].document})
                    //     this.state.categories.push(result.category[i])
                    //     }
                    for (let i = 0; i < result.price.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.listofprices.push(result.price[i])
                    }
                }
                
                console.log('bannerfromnew api', this.state.banner)
            })
            .catch(error => console.log('error', error));
    }

    getproducts = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter-list/" + this.state.subcategoryid, requestOptions)  //+'?brand_id='+this.state.brandid+'&price='+this.state.price+'&sortby='+this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('listofproducts',this.state.listofproducts)
                this.state.listofproducts.length = 0
                if (result.status == 201) {
                    for (let i = 0; i < result.products.length; i++) {
                        this.state.listofproducts.push(result.products[i])
                    }
                }
                // console.log('listo fproducts',this.state.listofproducts)
                delay(5000);
                this.setState({ showloader: true })
            })
            .catch(error => console.log('error', error));
    }

    getproductsfilterbybrand = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter-list/" + this.state.subcategoryid + '?brand_id=' + this.state.brandid, requestOptions)   //+'&price='+this.state.price+'&sortby='+this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('listofproducts',this.state.listofproducts)
                this.state.listofproducts.length = 0
                if (result.status == 201) {
                    for (let i = 0; i < result.products.length; i++) {
                        this.state.listofproducts.push(result.products[i])
                    }
                }
                // console.log('listo fproducts',this.state.listofproducts)
                delay(5000);
                this.setState({ showloader: true })
            })
            .catch(error => console.log('error', error));
    }

    getproductsfilterbyprice = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter-list/" + this.state.subcategoryid + '?price=' + this.state.pricevalue, requestOptions)  //+'?brand_id='+this.state.brandid+'&price='+this.state.price+'&sortby='+this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('listofproducts',this.state.listofproducts)
                this.state.listofproducts.length = 0
                if (result.status == 201) {
                    for (let i = 0; i < result.products.length; i++) {
                        this.state.listofproducts.push(result.products[i])
                    }
                }
                // console.log('listo fproducts',this.state.listofproducts)
                delay(5000);
                this.setState({ showloader: true })
            })
            .catch(error => console.log('error', error));
    }

    getproductsfilterbysort = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter-list/" + this.state.subcategoryid + '?sortby=' + this.state.sortvalue, requestOptions)  //+'?brand_id='+this.state.brandid+'&price='+this.state.price+'&sortby='+this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                //  console.log('listofproducts',this.state.listofproducts)
                this.state.listofproducts.length = 0
                if (result.status == 201) {
                    for (let i = 0; i < result.products.length; i++) {
                        this.state.listofproducts.push(result.products[i])
                    }
                }
                // console.log('listo fproducts',this.state.listofproducts)
                delay(5000);
                this.setState({ showloader: true })
            })
            .catch(error => console.log('error', error));
    }

    getproductsfilterbycategory = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-filter-list/" + this.state.categoryid, requestOptions)  //+'?brand_id='+this.state.brandid+'&price='+this.state.price+'&sortby='+this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('listofproducts',this.state.listofproducts)
                this.state.listofproducts.length = 0
                if (result.status == 201) {
                    for (let i = 0; i < result.products.length; i++) {
                        this.state.listofproducts.push(result.products[i])
                    }
                }
                // console.log('listo fproducts',this.state.listofproducts)
                delay(5000);
                this.setState({ showloader: true })
            })
            .catch(error => console.log('error', error));
    }

    getcategories = async () => {
        await delay(5000);
        // console.log('1')
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
                    this.state.categorynames.push(result.data[i].name)
                }
                //  console.log('categories', this.state.categorynames) 

            })
            .catch(error => console.log('error', error));
    }


    getproductdetails = () => {
        //  console.log('sorted', this.state.sortvalue)
        // console.log('subcategoryid inside products page', this.state.subcategoryid)
        //AsyncStorage.setItem('subcategoryid1', this.state.subcategoryid)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        // https://webapplicationindia.com/demo/watermall/api/subcategorywiseproduct/"+this.state.subcategoryid+'?sortby='+this.state.sortvalue, requestOptions
        fetch(BASE_URL + "subcategorywiseproduct/" + this.state.subcategoryid, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.state.productdetailslist.length = 0
                //  console.log(result)  //'?sortby='+this.state.sortvalue
                for (let i = 0; i < result.product_list.length; i++) {
                    this.state.productdetailslist.push(result.product_list[i])
                }
                for (let i = 0; i < result.product_list.length; i++) {
                    this.state.brandtitles.push(result.product_list[i].brand_title)
                }
                // for (let i = 0; i < result.product_list.length; i++) {
                //     this.state.prices.push(result.product_list[i].price)
                // }
                //  console.log('banner:', result.subcategory_details)
                this.setState({ productlistbanner: result.subcategory_details })
                this.setState({ showloader: !this.state.showloader })
                delay(5000);
                // console.log('productslist', this.state.productdetailslist)
                // console.log('banner', this.state.productlistbanner)
            })
            .catch(error => console.log('error', error));
    }

    renderproducts = () => {
        // console.log('productslist',this.state.listofproducts)
        return this.state.listofproducts.map((product) => {
            return (
                <View>

                    <View key={product.id} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#DDDDDD', borderBottomWidth: 1, height: 140, marginLeft: 0, marginRight: 10 }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: product.id })}
                            style={{ marginRight: 20 }}
                        >
                            <Image key={product.id} source={{ uri: product.feature_image }} style={{ margin: 15, height: 100, width: 100, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: product.id })}
                        >
                            {/* width: Dimensions.get('window').width / 2 */}
                            <View style={{ width: Dimensions.get('window').width / 2 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>
                                    {product.title}
                                </Text>
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(60,63,134,1)', borderRadius: 8, alignSelf: 'flex-start' }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light', color: '#ffffff', textAlign: 'center' }}>
                                        {product.brand.brand_title}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif-light', color: '#ff0000' }}>
                                    Rs {product.price}
                                </Text>
                                {product.rating === 1 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            {/* <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                    <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 2 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            {/*<MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 3 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 4 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 5 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.verifiedTrustSeal > 0 ?
                                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(198,227,198,1)', height: 25, width: Dimensions.get('window').width / 3 + 30, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="check-circle" size={20} color="#2A9134" style={{ marginRight: 0, marginLeft: 5 }} />
                                        <Text style={{ fontSize: 14, fontFamily: 'sans-serif-light', color: '#2A9134', flexWrap: 'wrap' }}>
                                            Verified by WaterMall
                                        </Text>
                                    </View>
                                    : null}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    renderproductdetails = () => {
        return this.state.productdetailslist.map((product) => {
            return (
                <View>

                    <View key={product.product_id} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#DDDDDD', borderBottomWidth: 1, height: 140, marginLeft: 0, marginRight: 10 }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: product.product_id })}
                            style={{ marginRight: 20 }}
                        >
                            <Image key={product.product_id} source={{ uri: product.feature_image }} style={{ margin: 15, height: 100, width: 100, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: product.product_id })}
                        >
                            {/* width: Dimensions.get('window').width / 2 */}
                            <View style={{ width: Dimensions.get('window').width / 2 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif-light', }}>
                                    {product.title}
                                </Text>
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(60,63,134,1)', borderRadius: 8, alignSelf: 'flex-start' }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light', color: '#ffffff', textAlign: 'center' }}>
                                        {product.brand_title}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif-light', color: '#ff0000' }}>
                                    Rs {product.price}
                                </Text>
                                {product.rating === 1 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            {/* <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                    <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 2 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            {/*<MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} /> */}
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 3 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 4 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.rating === 5 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                            <MaterialIcon name="star-rate" size={30} color="#ffd700" style={{ marginRight: 0, }} />
                                        </View>
                                    </View>
                                    : null}
                                {product.verifiedTrustSeal > 0 ?
                                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(198,227,198,1)', height: 25, width: Dimensions.get('window').width / 3 + 30, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="check-circle" size={20} color="#2A9134" style={{ marginRight: 0, marginLeft: 5 }} />
                                        <Text style={{ fontSize: 14, fontFamily: 'sans-serif-light', color: '#2A9134', flexWrap: 'wrap' }}>
                                            Verified by WaterMall
                                        </Text>
                                    </View>
                                    : null}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }


    getsort = () => {

        console.log('subcategoryid inside  sorting', this.state.subcategoryid)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "subcategorywiseproduct/" + this.state.subcategoryid + '?sortby=' + this.state.sortvalue, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('sort', result)
                this.state.productdetailslist.length = 0
                if (result.status == true) {
                    // AsyncStorage.setItem('sortby', this.state.sortvalue)
                    // this.props.navigation.navigate('products',{sortvalue:this.state.sortvalue})
                    for (let i = 0; i < result.product_list.length; i++) {
                        this.state.productdetailslist.push(result.product_list[i])
                    }
                    this.setState({ showloader: !this.state.showloader })
                }
                else {
                    alert('technical error, please try after sometime')
                }
            })
            .catch(error => console.log('error', error));
    }



    renderbanners = () => {
        // console.log('banner', this.state.productlistbanner)
        // return this.state.productdetailslist.map((product) =>{
        return this.state.banner.map((item) => {
            return (
                <View >

                    <View style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width, backgroundColor: 'rgba(60,63,134,1)', marginTop: 10, }}>
                        <View style={{ marginRight: 10, marginLeft: 0, marginTop: 0 }}>
                            <Image source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width }} />
                            {/* <Image source={{ uri: this.state.productlistbanner.cat_icon }} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width }} /> */}
                            {/* <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                {/* PS models */}
                            {/*{product.title}
                            </Text>
                        </View> */}
                        </View>
                    </View>

                    {/* <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderRightWidth: Dimensions.get('window').height / 3 + 3,
                    borderTopWidth: Dimensions.get('window').width / 3 + 10,
                    borderRightColor: "transparent",
                    borderTopColor: "#afeeee",
                    transform: [{ rotate: "270deg" }],
                    marginLeft: -42,
                }}
                >
                    <View style={{ marginTop: -Dimensions.get('window').height / 2 - 35, transform: [{ rotate: "90deg" }], }}>
                        <Image source={require('../../assets/35.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3, marginLeft: 67 }} />
                        <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center', marginLeft: 67 }}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                SS models
                                                </Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginRight: 10 }}>
                    <Image source={require('../../assets/36.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                    <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff', fontSize: 16 }}>
                            MS models
                                        </Text>
                    </View>
                </View> */}
                </View>
            )
        })
    }

    rendersubhead = () => {
        // return this.state.banner.map((item) =>{
        return (
            // borderBottomColor: '#d3d3d3', borderBottomWidth: 3
            <View style={{ backgroundColor: '#eeeeee', }}>
                <View style={{ height: Dimensions.get('window').height / 10, width: Dimensions.get('window').width, marginLeft: 10, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, color: '#2e3191' }}>
                        {/* Wallmount RO */}
                        {/* {this.state.banner[0].name} */}
                        {this.state.subhead}
                    </Text>
                    <Text style={{ fontSize: 18, color: '#2e3191' }}>
                        {/* Explore all {this.state.banner[0].name} models */}
                        Explore all {this.state.subhead} models
                    </Text>
                </View>
            </View>
        )
        //})
    }

    clearasyncdata = async () => {
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }


    filtering = () => {
        var formdata = new FormData();
        formdata.append("query", this.state.filtervalue);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL + "productwisesorting", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                this.state.productdetailslist.length = 0
                if (result.status == true) {
                    if (result.products.length > 0) {
                        for (let i = 0; i < result.products.length; i++) {
                            this.state.productdetailslist.push(result.products[i])
                        }
                        // this.setState({ showloader: !this.state.showloader })
                    }
                    else if (result.brands.length > 0) {
                        for (let i = 0; i < result.brands.length; i++) {
                            this.state.productdetailslist.push(result.brands[i])
                        }
                    }
                    else if (result.categories.length > 0) {
                        for (let i = 0; i < result.categories.length; i++) {
                            this.state.productdetailslist.push(result.categories[i])
                        }
                    }
                    this.setState({ showloader: !this.state.showloader })
                }
                else {
                    alert('technical error, please try after sometime')
                }


            })
            .catch(error => console.log('error', error));
    }

    renderbrandnames = () => {
        return this.state.brands.map((item) => {
            return (
                <View >
                    <TouchableOpacity
                        onPress={async () => await this.setState({ filtervalue: item, showbrandnames: !this.state.showbrandnames, showloader: !this.state.showloader, brandid: item.id }, () => this.getproductsfilterbybrand())}   //()=>this.filtering()
                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {item.brand_title}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    rendercategorynames = () => {
        return this.state.categories.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={async () => await this.setState({ filtervalue: item, showcategories: !this.state.showcategories, showloader: !this.state.showloader, categoryid: item.id }, () => this.getproductsfilterbycategory())}
                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    renderprices = () => {
        return this.state.listofprices.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={async () => await this.setState({ filtervalue: item, showprices: !this.state.showprices, showloader: !this.state.showloader, pricevalue: item.name }, () => this.getproductsfilterbyprice())}
                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
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
                        // onPress={() => this.props.navigation.navigate('Categories')}
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
                            // onPress={() => this.props.navigation.navigate('Menu')}
                            onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        >
                            <Entypo name="menu" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView>
                        <View>
                            <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3+50, marginTop: 10, marginBottom: 5 }}>
                                {/* <View>
                                    <ScrollView horizontal={true}>
                                        <View style={{ flexDirection: 'row', }}> */}
                                {/* {this.state.banner ? */}
                                <Swiper
                                    style={{ height: Dimensions.get('window').height / 3+30 }}
                                    horizontal={true}
                                    autoplay={true}
                                    key={this.state.banner.length}
                                    autoplayTimeout={3}
                                    showsPagination={true}
                                    loop={true}
                                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 8, height: 8, borderRadius: 4, margin: 3 }} />}
                                    activeDot={<View style={{ backgroundColor: '#000000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                                >
                                    {this.renderbanners()}
                                </Swiper>
                                 {/* :
                                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                    <ActivityIndicator size="large" color="#ffffff" />
                                                </View>
                                            }  */}
                                {/* <View style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width / 3 + 20, backgroundColor: '#afeeee', marginTop: -40 }}>
                                                <View style={{ marginRight: 10, marginLeft: 10, marginTop: 40 }}>

                                                    <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                                                    <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                            PS models
                                                </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{
                                                width: 0,
                                                height: 0,
                                                backgroundColor: "transparent",
                                                borderStyle: "solid",
                                                borderRightWidth: Dimensions.get('window').height / 3 + 3,
                                                borderTopWidth: Dimensions.get('window').width / 3 + 10,
                                                borderRightColor: "transparent",
                                                borderTopColor: "#afeeee",
                                                transform: [{ rotate: "270deg" }],
                                                marginLeft: -42,


                                            }}
                                            >
                                                <View style={{ marginTop: -Dimensions.get('window').height / 2 - 35, transform: [{ rotate: "90deg" }], }}>
                                                    <Image source={require('../../assets/35.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3, marginLeft: 67 }} />
                                                    <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center', marginLeft: 67 }}>
                                                        <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                            SS models
                                                </Text>
                                                    </View>
                                                </View> 
                                            </View>

                                            <View style={{ marginRight: 10 }}>
                                                <Image source={require('../../assets/36.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                                                <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                        MS models
                                        </Text>
                                                </View>
                                            </View>*/}
                                {/* </View>
                                    </ScrollView>

                                </View> */}
                            </View>

                            {/* <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 5 }}>
                                <View style={{ height: Dimensions.get('window').height / 10, width: Dimensions.get('window').width, marginLeft: 10, justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 26, }}>
                                        Wallmount RO
                        </Text>
                                    <Text style={{ fontSize: 18 }}>
                                        Explore all Wallmount RO models
                        </Text>
                                </View>
                            </View> */}

                            {/* <View style={{ width:Dimensions.get('window').width,marginBottom:105}}>
                    {this.renderproductdetails()}
                    </View> */}
                            <View>
                                {this.rendersubhead()}
                            </View>
                            <View style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'rgba(128,131,190,1)', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ showsortdropdown: true, showfilterdropdown: false })}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialCommunityIcons name="sort-variant" size={30} color="#ffffff" style={{ marginRight: 5 }} />
                                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>SORT</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ showfilterdropdown: true, showsortdropdown: false, showprices: false, showbrandnames: false })}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons name="filter" size={30} color="#ffffff" style={{ marginRight: 5 }} />
                                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>FILTERS</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.showsortdropdown ?
                                <View style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').height / 3, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'popular', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}   //() => this.getsort()
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Most Popular
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'new', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            New Itmes
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'pricehighlow', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Price : High--Low
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'pricelowhigh', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Price : Low--High
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'atoz', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Ascending : A--Z
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ sortvalue: 'ztoa', showsortdropdown: !this.state.showsortdropdown, showloader: !this.state.showloader }, () => this.getproductsfilterbysort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16, }}>
                                            Decending : Z--A
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                : null
                            }
                            {this.state.showfilterdropdown ?
                                <View style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').height / 3, marginLeft: Dimensions.get('window').width / 2 - 20, marginRight: 10 }}>
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ showfilterdropdown: false, showbrandnames: !this.state.showbrandnames, showcategories: false, showprices: false })}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            By brand
                                        </Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity
                                        onPress={async () => await this.setState({ filtervalue: 'popular', showfilterdropdown: !this.state.showfilterdropdown }, () => this.filtering())}
                                        // onPress={async () => await this.setState({ sortvalue: 'new', showsortdropdown: !this.state.showsortdropdown }, () => this.getsort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            By capacity
                                        </Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        onPress={async () => await this.setState({ showfilterdropdown: false, showprices: !this.state.showprices, showcategories: false, showbrandnames: false })}
                                        // onPress={async () => await this.setState({ filtervalue: 'popular', showfilterdropdown: !this.state.showfilterdropdown }, () => this.filtering())}
                                        // onPress={async () => await this.setState({ sortvalue: 'pricehighlow', showsortdropdown: !this.state.showsortdropdown }, () => this.getsort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            By price
                                        </Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                      onPress={async () => await this.setState({ showfilterdropdown: !this.state.showfilterdropdown,showcategories:!this.state.showcategories,showbrandnames:false,showprices:false })}
                                       // onPress={async () => await this.setState({ filtervalue: 'popular', showfilterdropdown: !this.state.showfilterdropdown }, () => this.filtering())}
                                        // onPress={async () => await this.setState({ sortvalue: 'pricelowhigh', showsortdropdown: !this.state.showsortdropdown }, () => this.getsort())}
                                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderColor: 'rgba(128,131,190,1)', alignItems: 'center', borderWidth: 1, marginTop: 5 }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            By category
                                        </Text>
                                    </TouchableOpacity> */}
                                </View>
                                : null}
                            {this.state.showbrandnames ?
                                <View style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').height / 3, marginLeft: Dimensions.get('window').width / 2 - 20, marginRight: 10 }}>
                                    <ScrollView>
                                        {this.renderbrandnames()}
                                    </ScrollView>
                                </View>
                                :
                                //     <View style={{ width: Dimensions.get('window').width, marginBottom: 105 }}>
                                // <ActivityIndicator size="large" color="#2e3191" />
                                //     </View>
                                null
                            }
                            {this.state.showprices ?
                                <View style={{ width: Dimensions.get('window').width / 2, marginLeft: Dimensions.get('window').width / 2 - 20, marginRight: 10 }}>
                                    <ScrollView>
                                        {this.renderprices()}
                                    </ScrollView>
                                </View>
                                :
                                //     <View style={{ width: Dimensions.get('window').width, marginBottom: 105 }}>
                                // <ActivityIndicator size="large" color="#2e3191" />
                                //     </View>
                                null
                            }
                            {this.state.showcategories ?
                                <View style={{ width: Dimensions.get('window').width / 2, marginLeft: Dimensions.get('window').width / 2 - 20, marginRight: 10 }}>
                                    <ScrollView>
                                        {this.rendercategorynames()}
                                    </ScrollView>
                                </View>
                                :
                                null
                            }
                            {this.state.showloader ?
                                // {/* // this.renderproductdetails() */}
                                this.renderproducts()
                                :
                                <View style={{ width: Dimensions.get('window').width, marginBottom: 105 }}>
                                    <ActivityIndicator size="large" color="#2e3191" />
                                </View>
                            }

                        </View>

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
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 100,
        borderTopWidth: 100,
        borderRightColor: "transparent",
        borderTopColor: "red",
        zIndex: 1,
        transform: [{ rotate: "270deg" }],
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


