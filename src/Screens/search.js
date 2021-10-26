import React from 'react';
import { View, BackHandler, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Thumbnail } from 'react-native-thumbnail-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: '',
            searchlist: [],
            listofsearchproducts: [],
            listofsearchbrands: [],
            listofsearchcategories: [],
            search: '',
            showmenu: false,
            showsearchresults:false,

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

    renderProductRow1(rowData) {

        const { product_id, title, feature_image } = rowData;
        return (
            <View style={{ height: 80, width: Dimensions.get('window').width }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', }}>
                    <Image key={product_id} source={{ uri: feature_image }} style={{ height: 70, width: 70, marginRight: 20, marginLeft: 20 }} />
                    <Text >{`${title}`} </Text>
                </View>
                {/* <Text > {`${state_id}`}</Text> */}
            </View>
        );
    }

    renderButtonText1(rowData) {
        const { product_id, title } = rowData;
        console.log(`${product_id} - ${title}`);
        return ` ${title}`;
    }

    getsearch1 = () => {
        console.log('search text', this.state.search)
        var formdata = new FormData();
        formdata.append("query", this.state.search);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/search", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.state.searchlist.length = 0;
                if (result.status == true) {
                    for (let i = 0; i < result.products.length; i++) {

                        this.state.searchlist.push(result.products[i])
                    }
                    for (let i = 0; i < result.categories.length; i++) {

                        this.state.searchlist.push(result.categories[i])
                    }
                    for (let i = 0; i < result.brands.length; i++) {

                        this.state.searchlist.push(result.brands[i])
                    }
                    if (result.products.length > 0) {
                        for (let i = 0; i < result.products.length; i++) {

                            this.state.listofsearchproducts.push(result.products[i])
                        }
                        //this.props.navigation.navigate('Products')
                    }
                    if (result.categories.length > 0) {
                        for (let i = 0; i < result.categories.length; i++) {

                            this.state.listofsearchcategories.push(result.categories[i])
                        }
                        // this.props.navigation.navigate('Categories')
                    }
                    if (result.brands.length > 0) {
                        for (let i = 0; i < result.brands.length; i++) {

                            this.state.listofsearchbrands.push(result.brands[i])
                        }
                        // this.props.navigation.navigate('Products')
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    getsearch = () => {
        // console.log('search text',this.state.search)
        var formdata = new FormData();
        formdata.append("query", this.state.search);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/search", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.state.searchlist.length = 0;
                if (result.status == true) {
                    if (result.brands.length == 0 && result.categories.length == 0 && result.products.length == 0) {
                        this.setState({ noresultfound: !this.state.noresultfound })
                        alert('No results found')
                        this.setState({ search: '' })
                    }
                    else {
                        for (let i = 0; i < result.products.length; i++) {

                            this.state.searchlist.push(result.products[i])
                        }
                        for (let i = 0; i < result.categories.length; i++) {

                            this.state.searchlist.push(result.categories[i])
                        }
                        for (let i = 0; i < result.brands.length; i++) {

                            this.state.searchlist.push(result.brands[i])
                        }
                    }
                    if (result.products.length > 0) {
                        for (let i = 0; i < result.products.length; i++) {

                            this.state.listofsearchproducts.push(result.products[i])
                        }
                        //this.props.navigation.navigate('Products')
                    }
                    if (result.categories.length > 0) {
                        for (let i = 0; i < result.categories.length; i++) {

                            this.state.listofsearchcategories.push(result.categories[i])
                        }
                        // this.props.navigation.navigate('Categories')
                    }
                    if (result.brands.length > 0) {
                        for (let i = 0; i < result.brands.length; i++) {

                            this.state.listofsearchbrands.push(result.brands[i])
                        }
                        // this.props.navigation.navigate('Products')
                    }
                    // console.log('searchlist',this.state.searchlist)
                    // this.filtersearch();
                }
            })
            .catch(error => console.log('error', error));
    }

    productsearch = () => {
        // console.log('search',this.state.search)
         //console.log('search',text)
         // var formdata = new FormData();
         //this.state.searchlist.length =0;
         if (this.state.search == '') {
             // this.state.searchlist=[];
             this.setState({ searchlist: [], showsearchresults:false });
         } else {
             this.setState({searchlist:[]});
             console.log('search results empty ---',this.state.searchlist)
             // this.setState({searchlist:[]});
             // this.state.searchlist.length =0;
             var requestOptions = {
                 method: 'GET',
                 // body: formdata,
                 redirect: 'follow'
             };
 
             fetch("https://romegamart.com/api/product-search?search=" + this.state.search, requestOptions)
                 .then(response => response.json())
                 .then(result => {
                     // console.log(result)
                     this.state.searchlist.length = 0;
                     //this.setState({searchlist:[]})
                    // this.state.searchlist=[];
                     if (result.status == 201) {
                         // this.setState({searchlist:[]});
                         if (result.products.length == 0) {
                             this.setState({ noresultfound: !this.state.noresultfound })
                             alert('No results found')
                             this.setState({ search: '', })
                         } else {
                             for (let i = 0; i < result.products.length; i++) {
 
                                 this.state.searchlist.push(result.products[i])
                             }
                              this.setState({showsearchresults:true})
                         }
 
                         console.log('searchlist', this.state.searchlist)
                     }
                     else {
                         alert(result.message)
                     }
                 })
                 .catch(error => console.log('error', error));
        }
     }
 
 
   

    productsearch1 = () => {
        // var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/product-search?search=" + this.state.search, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                // this.state.searchlist.length =0;
                this.setState({ searchlist: [] });
                if (result.status == 201) {
                    if (result.products.length == 0) {
                        this.setState({ noresultfound: !this.state.noresultfound })
                        alert('No results found')
                        this.setState({ search: '' })
                    } else {
                        for (let i = 0; i < result.products.length; i++) {

                            this.state.searchlist.push(result.products[i])
                        }
                        // this.setState({search:''})
                    }

                    console.log('searchlist', this.state.searchlist)
                }
                else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }



    renderProductRow(rowData) {

        const { product_id, title, feature_image } = rowData;
        return (
            // this.state.noresultfound?
            // <View style={{height:80,width:Dimensions.get('window').width, alignItems:'center',justifyContent:'center'}}>
            //     <Text>No results found</Text>
            // </View>
            // :
            <View style={{ height: 80, width: Dimensions.get('window').width }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', }}>
                    <Image key={product_id} source={{ uri: feature_image }} style={{ height: 70, width: 70, marginRight: 20, marginLeft: 20 }} />
                    <Text >{`${title}`} </Text>
                </View>
                {/* <Text > {`${state_id}`}</Text> */}
            </View>
        );
    }

    renderButtonText(rowData) {
        const { product_id, title } = rowData;
        console.log(`${product_id} - ${title}`);
        return ` ${title}`;
    }

    createsearch = () => {
        return this.state.searchlist.map((item) => {
            return (
                <TouchableOpacity
                    style={{ height: 80, width: Dimensions.get('window').width }}
                    onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                >
                    <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', }}>
                        <Image source={{ uri: item.feature_image }} style={{ height: 70, width: 70, marginRight: 20, marginLeft: 20 }} />
                        <View style={{ width: Dimensions.get('window').width - 100, flexWrap: 'wrap' }}>
                            <Text>{item.title}  </Text>
                            <Text style={{color:'#2e3191'}}>({item.category_name}) </Text>
                            {/* {item.brand_title} */}
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
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
                        onPress={() => this.props.navigation.navigate('Verifiedhome')}
                    >
                        <Ionicons name="arrow-back-circle" size={30} color="#ffffff" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        {/* <TouchableOpacity
                        onPress={() =>this.props.navigation.navigate('Verifiedhome')}
                        >
                            <Ionicons name="search-outline" size={30} color="#ffffff" style={{ transform: [{ rotateY: '180deg' }] }} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notifications', { id: this.state.userid })}
                        >
                            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" />
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
                        {/* <View style={{ flexDirection: 'row', margin: 10 }}>
                            <TextInput
                                placeholder='Search here ...'
                                style={{ width: Dimensions.get('window').width - 85, height: 40, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center', fontSize: 16, borderColor: '#1e90ff', borderWidth: 2 }}
                                placeholderTextColor={'#000000'}
                                onChangeText={async (text) => await this.setState({ search: text }, () =>this.getsearch())}
                                value={this.state.search}
                            /> */}
                        {/* <TouchableOpacity
                                style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Feather name="search" size={30} color="#ffffff" />
                            </TouchableOpacity> */}
                        {/* <View>
                            <ModalDropdown
                            //style={{ width: Dimensions.get('window').width / 3-10, height: 40,  borderRadius: 8,backgroundColor:'rgba(221,221,221,0.5)',justifyContent:'center',marginRight:Dimensions.get('window').width/6 }}
                            style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8,alignItems:'center',justifyContent:'center'  }}
                            options={this.state.searchlist}
                            dropdownStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2+100,marginTop:30,marginLeft:10 }}
                            dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                            textStyle = {{fontSize:18,marginLeft:10 }}
                            renderRow={this.renderProductRow.bind(this)}
                            renderButtonText={(rowData)=>this.renderButtonText(rowData)}
                            onSelect={(idx, value)=> this.props.navigation.navigate('Productdetails',{id:value.product_id})}
                            defaultValue={<Feather name="search" size={20} color="#ffffff"  />}
                            >
                                
                            </ModalDropdown>
                            </View>
                        </View> */}

                        <View
                            style={{ flexDirection: 'row', margin: 10 }}
                        >
                            <TextInput
                                placeholder=''
                                style={{ width: Dimensions.get('window').width - 85, height: 40, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center', fontSize: 18, borderColor: '#1e90ff', borderWidth: 2 }}
                                placeholderTextColor={'#000000'}
                                onChangeText={async (text) => await this.setState({ search: text }, () => this.productsearch())}  //() =>this.getsearch()
                                value={this.state.search}
                            />
                            <TouchableOpacity
                                style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.productsearch()}   //() =>this.getsearch()
                            >
                                <Feather name="search" size={20} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                        {this.state.showsearchresults && this.state.search? 
                            <View>

                                {this.createsearch()}
                            </View>
                            :
                            null
                        }

                    </ScrollView>
                </View>

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


