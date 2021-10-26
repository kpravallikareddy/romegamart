import React from 'react';
import { View, ImageBackground, BackHandler, ActivityIndicator, FlatList, AsyncStorage, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, Linking, Modal, Alert } from 'react-native';
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
import { SearchBar } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ModalDropdown from 'react-native-modal-dropdown';
import Menu from './menu';
import MenuOverlay from './menuOverlay';
// import { useNavigation } from '@react-navigation/native';
// import { withNavigation } from 'react-navigation';




const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Verifiedhome extends React.Component {
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
            listofvideos: [],
            videourl: '',
            imageclicked: false,
            listoffeatureproducts: [],
            listofdeals: [],
            showloader: false,
            showloader1: false,
            launchoftheday: [],
            listofcategories: [],
            listofbanners: [],
            listofpopularproducts: [],
            search: '',
            listofmainbanner: [],
            searchlist: [],
            listoftopsellingproducts: [],
            showloader2: false,
            listoffeaturedmiddle: [],
            listoflaunchtopselling: [],
            showmenu: false,
            position: 1,
            interval: null,
            filteredData: [],
            noresultfound: false,
            noresultdata: ['No results found'],
            showloader3: false,
            searchablelist: [],
            fblink: '',
            twitterlink: '',
            youtubelink: '',
            instalink: '',
            backPressed: 0,
            showexitappmodal: false,
            firstbanner: [],
            categorybanner: [],
            popularproductsbanner: [],
            featureproductbanner: [],
            topsellingbanner: [],
            featured_launch_middle: [],
            launch_topselling_middle: [],
            homegroup: [],
            launch_of_the_day: '',
            topdeals: [],
            showsearchresults:false,
        }
    }

    componentDidMount() {
        // this.getvideo();
        //  this.getfeatureproducts();
        // this.getdeals();
        this.getallbanners();
        //this.getfeatureproducts();
        // this.getdeals();
        // this.getbanners();
        // this.getlaunch();
        // this.getpopularproducts();
        this.gettopsellingproducts();
        // this.getfeaturemiddle();
        // this.gettopsellingmiddle();
        this.getsociallinks();
        //this.getmainbanner();
        // this.getcategories();

        BackHandler.addEventListener("hardwareBackPress", this.backActionHandler);

        // return () =>
        //   // clear/remove event listener
        //   BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);
    }

    UNSAFE_componentWillMount() {
        // this.getfeatureproducts();
        // this.getdeals();
        // this.getcategories();
        // this.getmainbanner();
    }

    // componentWillMount() {
    //     this.setState({
    //       interval: setInterval(() => {
    //         this.setState({
    //           position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
    //         });
    //       }, 2000)
    //     });
    //   }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backActionHandler);
        // clearInterval(this.state.interval);
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    backActionHandler = () => {
        if (this.state.backPressed == 2) {
            console.log('backpressed in if', this.state.backPressed)
            // alert('Do you want to exit the app?')
            // BackHandler.exitApp();

            // alert("Are you sure you want to go back?", [
            //       {
            //         text: "Cancel",
            //         onPress: () => null,
            //         style: "cancel"
            //       },
            //       { text: "ok", onPress: () => BackHandler.exitApp()
            //       () }
            //     ]);
            //     return true;
            Alert.alert(
                'Exit Application',
                'Do you want to quit application?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }], {
                cancelable: false
            }
            );
            return true;
            // BackHandler.exitApp();

            // this.setState({showexitappmodal:!this.state.showexitappmodal})
        }
        else {
            console.log('backpressed in else', this.state.backPressed)

            this.setState({ backPressed: this.state.backPressed + 1, search:'' })
            // this.props.navigation.goBack(null);

            return true;
        }
        // alert("Are you sure you want to go back?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel"
        //   },
        //   { text: "YES", onPress: () => BackHandler.exitApp()
        //   () }
        // ]);
        // return true;
    };


    changecolor = (value) => {
        if (value === 'Domestic') {
            this.setState({
                bordercolor: '', textcolor: '#ffffff',
                bordercolor1: '#4b0082', textcolor1: '#000000',
                bordercolor2: '#4b0082', textcolor2: '#000000',
                bordercolor3: '#4b0082', textcolor3: '#000000',
            })
        }
        else if (value === 'Industrial') {
            this.setState({
                bordercolor: '#4b0082', textcolor: '#000000',
                bordercolor1: '', textcolor1: '#ffffff',
                bordercolor2: '#4b0082', textcolor2: '#000000',
                bordercolor3: '#4b0082', textcolor3: '#000000',
            })
        }
        else if (value === 'Domestic Models') {
            this.setState({
                bordercolor: '#4b0082', textcolor: '#000000',
                bordercolor1: '#4b0082', textcolor1: '#000000',
                bordercolor2: '', textcolor2: '#ffffff',
                bordercolor3: '#4b0082', textcolor3: '#000000',
            })
        }
        else if (value === 'Water Softeners') {
            this.setState({
                bordercolor: '#4b0082', textcolor: '#000000',
                bordercolor1: '#4b0082', textcolor1: '#000000',
                bordercolor2: '#4b0082', textcolor2: '#000000',
                bordercolor3: '', textcolor3: '#ffffff',
            })
        }
    }

    getallbanners = () => {
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            // body: formdata,
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/home-banner", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                this.state.firstbanner.length == 0;
                this.state.categorybanner.length == 0;
                this.state.popularproductsbanner.length == 0;
                this.state.featureproductbanner.length == 0;
                this.state.topsellingbanner.length == 0;
                this.state.featured_launch_middle.length == 0;
                this.state.launch_topselling_middle.length == 0;
                this.state.homegroup.length == 0;
                //this.state.launch_of_the_day.length ==0;
                this.state.topdeals.length == 0;

                if (result.status == 200) {

                    for (let i = 0; i < result.data.firstbanner.length; i++) {

                        this.state.firstbanner.push(result.data.firstbanner[i])
                    }

                    for (let i = 0; i < result.data.category.length; i++) {

                        this.state.categorybanner.push(result.data.category[i])
                    }

                    for (let i = 0; i < result.data.products.length; i++) {

                        this.state.popularproductsbanner.push(result.data.products[i])
                    }
                    for (let i = 0; i < result.data.featureproducts.length; i++) {

                        this.state.featureproductbanner.push(result.data.featureproducts[i])
                    }

                    for (let i = 0; i < result.data.topsellings.length; i++) {

                        this.state.topsellingbanner.push(result.data.topsellings[i])
                    }
                    for (let i = 0; i < result.data.featured_launch_middle.length; i++) {

                        this.state.featured_launch_middle.push(result.data.featured_launch_middle[i])
                    }

                    for (let i = 0; i < result.data.launch_topselling_middle.length; i++) {

                        this.state.launch_topselling_middle.push(result.data.launch_topselling_middle[i])
                    }

                    for (let i = 0; i < result.data.homegroup.length; i++) {

                        this.state.homegroup.push(result.data.homegroup[i])
                    }

                    //   for (let i = 0; i < result.data.launch_of_the_day.length; i++) {

                    //     this.state.launch_of_the_day.push(result.data.launch_of_the_day[i])
                    //   }
                    this.setState({ launch_of_the_day: result.data.launch_of_the_day })

                    for (let i = 0; i < result.data.topdeals.length; i++) {

                        this.state.topdeals.push(result.data.topdeals[i])
                    }

                    this.setState({ showloader: !this.state.showloader })
                    // console.log('firstbanner',this.state.firstbanner)
                    // console.log('launchoftheday',this.state.launch_of_the_day)
                    // console.log('topdeals',this.state.topdeals)
                }
            })
            .catch(error => console.log('error', error));
    }


    getsociallinks = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/social-links", requestOptions)
            .then(response => response.json())
            .then(result => {
                //  console.log(result)
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

    createsearch = () => {
        return this.state.searchlist.map((item) => {
            return (
                <TouchableOpacity
                    style={{ height: 80, width: Dimensions.get('window').width }}
                    onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                >
                    <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', marginRight: 10, }}>
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

    //     rendersearch =() => {
    //         return (
    //             <SearchableDropdown   
    //             onTextChange={async text => await this.setState({search:text},() =>this.getsearch())} 
    //               onItemSelect={item =>alert(JSON.stringify(item))}
    //               containerStyle={{ padding: 5 }}
    //               textInputStyle={{
    //                 //inserted text style
    //                 padding: 12,
    //                 borderWidth: 1,
    //                 borderColor: '#ccc',
    //                 backgroundColor: '#ffffff',
    //                 borderRadius:10,
    //               }}
    //               itemStyle={{
    //                 //single dropdown item style
    //                 padding: 10,
    //                 marginTop: 2,
    //                 backgroundColor: '#ffffff',
    //                 borderColor: '#bbb',
    //                 borderWidth: 1,
    //               }}
    //               itemTextStyle={{
    //                 //text style of a single dropdown item
    //                 color: '#222',
    //               }}
    //               itemsContainerStyle={{
    //                 //items container style you can pass maxHeight
    //                 //to restrict the items dropdown hieght
    //                 maxHeight: Dimensions.get('window').height/2,
    //               }}
    //               items={this.state.searchlist}
    //               placeholder="Search here"
    //   //place holder for the search input
    //   resetValue={false}
    //             />
    //         )
    //     }


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


    getsearch = () => {
        //  console.log('search text',this.state.search)
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
                // console.log('search result',result)
                this.state.searchlist.length = 0;
                if (result.status == true) {
                    if (result.brands.length == 0 && result.categories.length == 0 && result.products.length == 0) {
                        this.setState({ noresultfound: !this.state.noresultfound })
                        alert('No results found')
                        this.setState({ search: '' })
                    } else {

                        for (let i = 0; i < result.products.length; i++) {

                            this.state.searchlist.push(result.products[i])
                        }
                        // } else if(result.categories.length >0){
                        for (let i = 0; i < result.categories.length; i++) {

                            this.state.searchlist.push(result.categories[i])
                        }
                        // } else if(result.brands.length >0){
                        for (let i = 0; i < result.brands.length; i++) {

                            this.state.searchlist.push(result.brands[i])
                        }



                        for (let i = 0; i < result.products.length; i++) {

                            this.state.searchablelist.push(result.products[i])
                        }
                        // } else if(result.categories.length >0){
                        for (let i = 0; i < result.categories.length; i++) {

                            this.state.searchablelist.push(result.categories[i])
                        }
                        // } else if(result.brands.length >0){
                        for (let i = 0; i < result.brands.length; i++) {

                            this.state.searchablelist.push(result.brands[i])
                        }

                    }


                    //   if(result.products.length >0){
                    //   for (let i = 0; i < result.products.length; i++) {

                    //     this.state.listofsearchproducts.push(result.products[i])
                    //   }
                    //   //this.props.navigation.navigate('Products')
                    //   }
                    //   if(result.categories.length >0){
                    //     for (let i = 0; i < result.categories.length; i++) {

                    //       this.state.listofsearchcategories.push(result.categories[i])
                    //     }
                    //    // this.props.navigation.navigate('Categories')
                    //     }
                    // if(result.brands.length >0){
                    //     for (let i = 0; i < result.brands.length; i++) {

                    //       this.state.listofsearchbrands.push(result.brands[i])
                    //     }
                    //    // this.props.navigation.navigate('Products')
                    // }
                    //}
                    // console.log('searchlist',this.state.searchlist)
                    // this.filtersearch();
                }
                // console.log('searchlist',this.state.searchlist)
            })
            .catch(error => console.log('error', error));
    }

    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
        // setTimeout(() => {
        //     this.props.navigation.navigate('Login')
        // }, 1000);
    }

    filtersearch = () => {
        // console.log('inside filter function')
        //let fullList = this.state.searchlist;
        //let filteredtext = fullList.filter((item) => {
        // if(item.title.match(this.state.search) || item.brand_title.match(this.state.search)){
        //     return item;

        //   }
        // })
        let filteredData = this.state.searchlist.filter(function (item) {
            return item.title.includes(this.state.search);
        });

        this.setState({ filteredData: filteredData });

        //  console.log('filtereddata',this.state.filteredData)
    }


    getmainbanner = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "banners/verified", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                for (let i = 0; i < result.data.length; i++) {
                    // this.setState({documentslist:result.data[i].document})
                    this.state.listofmainbanner.push(result.data[i])
                }
                // console.log('listof', this.state.listofmainbanner)

            })
            .catch(error => console.log('error', error));
    }

    rendermainbanner1() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.listofmainbanner.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 3 + 50, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10 }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }

    rendermainbanner() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.firstbanner.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.slider_image }} style={{ height: Dimensions.get('window').height / 3 + 50, width: Dimensions.get('window').width - 20, marginLeft: 10, marginRight: 10 }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }


    getfeaturemiddle = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "banners/featured_launch_middle", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                for (let i = 0; i < result.data.length; i++) {
                    // this.setState({documentslist:result.data[i].document})
                    this.state.listoffeaturedmiddle.push(result.data[i])
                }
                //console.log('listoflaunch', this.state.listoffeaturedmiddle)

            })
            .catch(error => console.log('error', error));
    }

    renderfeaturemiddle() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.featured_launch_middle.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.slider_image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }

    renderfeaturemiddle1() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.listoffeaturedmiddle.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }

    gettopsellingmiddle = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "banners/launch_topselling_middle", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                for (let i = 0; i < result.data.length; i++) {
                    // this.setState({documentslist:result.data[i].document})
                    this.state.listoflaunchtopselling.push(result.data[i])
                }
                this.setState({ showloader3: !this.state.showloader3 })
                //console.log('listoftopselling middle', this.state.listoflaunchtopselling)

            })
            .catch(error => console.log('error', error));
    }

    renderlaunchtopselling() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.launch_topselling_middle.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.slider_image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }

    renderlaunchtopselling1() {
        // console.log('banner inside map', this.state.listofmainbanner)
        return this.state.listoflaunchtopselling.map((item) => {
            return (
                <View>
                    <Image key={item.id} source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                    {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}
                </View>
            )
        })
    }


    getfeatureproducts = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        //https://webapplicationindia.com/demo/watermall/api/
        fetch(BASE_URL + "featuredproducr", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)

                for (let i = 0; i < result.data.length; i++) {

                    this.state.listoffeatureproducts.push(result.data[i])
                }
                this.setState({ showloader1: !this.state.showloader1 })
                // console.log('feature products', this.state.listoffeatureproducts)
            })
            .catch(error => console.log('error', error));
    }


    renderfeatureproducts = () => {
        return this.state.featureproductbanner.map((item) => {
            return (
                <View>
                    <View style={{ margin: 15 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                        >
                            <View style={{ height: Dimensions.get('window').width / 4, width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: '#ffffff' }}>
                                {/* height:Dimensions.get('window').height / 6,width: Dimensions.get('window').width / 4 */}
                                {/* source={{uri:item.feature_image}} source={require('../../assets/27.png')} borderLeftColor: 'rgba(135,206,235,1)', borderRightColor: 'rgba(135,206,235,1)', borderRightWidth: 1, borderLeftWidth: 1, borderBottomLeftRadius: 15, borderBottomRightRadius: 15,*/}
                                <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').width / 5, width: Dimensions.get('window').width / 5, }} />
                            </View>
                            <View style={{ height: Dimensions.get('window').height / 10, width: Dimensions.get('window').width / 4, backgroundColor: 'rgba(135,206,235,0.5)', alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>
                                <Text key={item.id} style={{ fontSize: 18, textAlign: 'center' }}>
                                    {/* 200lph plant borderBottomLeftRadius: 15, borderBottomRightRadius: 15,*/}
                                    {item.title}
                                </Text>
                                {/* <Text style={{fontSize:24,}}>
                                    plant
                                </Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    renderfeatureproducts1 = () => {
        return this.state.listoffeatureproducts.map((item) => {
            return (
                <View>
                    <View style={{ margin: 15 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                        >
                            <View style={{ height: Dimensions.get('window').width / 4, width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: '#ffffff' }}>
                                {/* height:Dimensions.get('window').height / 6,width: Dimensions.get('window').width / 4 */}
                                {/* source={{uri:item.feature_image}} source={require('../../assets/27.png')} borderLeftColor: 'rgba(135,206,235,1)', borderRightColor: 'rgba(135,206,235,1)', borderRightWidth: 1, borderLeftWidth: 1, borderBottomLeftRadius: 15, borderBottomRightRadius: 15,*/}
                                <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').width / 5, width: Dimensions.get('window').width / 5, }} />
                            </View>
                            <View style={{ height: Dimensions.get('window').height / 10, width: Dimensions.get('window').width / 4, backgroundColor: 'rgba(135,206,235,0.5)', alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>
                                <Text key={item.id} style={{ fontSize: 18, textAlign: 'center' }}>
                                    {/* 200lph plant borderBottomLeftRadius: 15, borderBottomRightRadius: 15,*/}
                                    {item.title}
                                </Text>
                                {/* <Text style={{fontSize:24,}}>
                                    plant
                                </Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }






    getlaunch = () => {
        // console.log('1')
        // await delay(5000);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        //https://webapplicationindia.com/demo/watermall/api/launch-of-the-day
        fetch(BASE_URL + "launch-of-the-day", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)

                for (let i = 0; i < result.data.length; i++) {

                    this.state.launchoftheday.push(result.data[i])
                }

                this.setState({ showloader: !this.state.showloader })
                // this.setState({showloader:!this.state.showloader})
                //  console.log('launch', this.state.launchoftheday)

            })
            .catch(error => console.log('error', error));
    }

    renderlaunch = () => {
        // return this.state.launch_of_the_day.map((item) => {
        return (
            // source={require('../../assets/28.png')}

            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Productdetails', { id: this.state.launch_of_the_day.id })}
                >
                    <Image source={{ uri: this.state.launch_of_the_day.feature_image }} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width / 2, }} />
                </TouchableOpacity>
            </View>
        )
        //  })
    }

    renderlaunch1 = () => {
        return this.state.launchoftheday.map((item) => {
            return (
                // source={require('../../assets/28.png')}

                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                    >
                        <Image source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width / 2, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }


    getdeals = () => {
        // console.log('1')
        // await delay(5000);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "todaydeals", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)

                for (let i = 0; i < result.today_deals.length; i++) {

                    this.state.listofdeals.push(result.today_deals[i])
                }

                this.setState({ showloader: !this.state.showloader })
                // this.setState({showloader:!this.state.showloader})
                // console.log('deals1', this.state.listofdeals)

            })
            .catch(error => console.log('error', error));
    }

    rendertopsellingproducts = () => {
        return this.state.topsellingbanner.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                    >
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            {/* source={require('../../assets/29.png')} */}
                            <View style={{ height: 30, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
                                    {/* UV BRIEL */}
                                    {item.title}
                                </Text>
                            </View>
                            <View style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center' }}>
                                <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 4 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    rendertopsellingproducts1 = () => {
        return this.state.listoftopsellingproducts.map((item) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                    >
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                            {/* source={require('../../assets/29.png')} */}
                            <View style={{ height: 30, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
                                    {/* UV BRIEL */}
                                    {item.title}
                                </Text>
                            </View>
                            <View style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3 - 20, alignItems: 'center' }}>
                                <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 4 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }



    renderdeal() {
        return (
            <View >
                {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Deals')}
                > */}
                <View >
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item, index) => String(item.product_id)}
                        data={this.state.topdeals}
                        renderItem={({ item, index }) => {
                            //console.log('deals inside flatlist', item) borderRightColor: '#DDDDDD', borderRightWidth: 5,
                            return (
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: 0 }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Deals')}
                                    // onPress={() =>this.props.navigation.navigate('Productdetails',{id:item.product_id})}
                                    >
                                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image key={item.product_id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, }} />
                                        </View>
                                        <View
                                            style={{ backgroundColor: 'rgba(88,126,190,1)', width: Dimensions.get('window').width / 2 - 40, marginTop: 0, alignItems: 'center', justifyContent: 'center', height: 46 }}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'center', flexWrap: 'wrap' }}>
                                                {item.description}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            )
                        }}

                    />
                </View>
                {/* </TouchableOpacity> */}
            </View>
        )
    }

    renderdeal1() {
        return (
            <View >
                {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Deals')}
                > */}
                <View >
                    <FlatList
                        numColumns={2}
                        keyExtractor={(item, index) => String(item.id)}
                        data={this.state.listofdeals}
                        renderItem={({ item, index }) => {
                            //console.log('deals inside flatlist', item) borderRightColor: '#DDDDDD', borderRightWidth: 5,
                            return (
                                <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: 0 }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Deals')}
                                    >
                                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, }} />
                                        </View>
                                        <View
                                            style={{ backgroundColor: 'rgba(88,126,190,1)', width: Dimensions.get('window').width / 2 - 40, marginTop: 0, alignItems: 'center', justifyContent: 'center', height: 46 }}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'center', flexWrap: 'wrap' }}>
                                                {item.description}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            )
                        }}

                    />
                </View>
                {/* </TouchableOpacity> */}
            </View>
        )
    }


    renderdeals = () => {
        // console.log('2')
        // console.log('deals', this.state.listofdeals)
        return this.state.listofdeals.map((deals, index) => {
            return (
                <View >
                    {/* <View style={{ width: Dimensions.get('window').width, backgroundColor: '#87ceeb',alignItems:'center',justifyContent:'center',marginBottom:70 }}> */}
                    <View key={index} style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: -15 }}>
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5, alignItems: 'center', justifyContent: 'center' }}>
                            {/* source={require('../../assets/24.png')} */}
                            <Image key={index} source={{ uri: deals.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3, }} />
                            <Text style={{ color: '#ff0000' }}>
                                {deals.title}
                                {/* at (({deals.previous_price}-{deals.price})/{deals.previous_price})*100% off   */}
                                {/* Faucets at 20% off for weekend */}
                            </Text>
                        </View>
                        <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', }}>
                            <Image key={index} source={{ uri: deals.feature_image }} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 3 }} />
                            <Text style={{ color: '#ff0000' }}>
                                {/* Pumps at 20% off for weekend */}
                                {deals.title}
                                {/* at (({deals.previous_price}-{deals.price})/{deals.previous_price})*100% off   */}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={{flexDirection:'row'}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/26.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                     Tanks at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff',borderTopColor:'#DDDDDD',borderTopWidth:5,alignItems:'center',justifyContent:'center'  }}>
                                <Image source={require('../../assets/27.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Housings at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,marginBottom:30}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 5,alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5, }}>
                                <Image source={require('../../assets/24.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center',borderTopColor:'#DDDDDD',borderTopWidth:5,}}>
                                <Image source={require('../../assets/25.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/3 }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>
                            
                        </View> */}
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
                // console.log('categories', this.state.listofcategories)
            })
            .catch(error => console.log('error', error));
    }


    rendercategoriesbanner = () => {
        // await delay(5000)
        // console.log('banner',this.state.listofcategories)
        return this.state.categorybanner.map((item) => {
            return (
                <View>
                    <View style={{ marginLeft: 10, }}>
                        <TouchableOpacity
                            // this.changecolor('Domestic')
                            onPress={() => this.props.navigation.navigate('Categories', { id: item.id })}
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
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor }}>
                                Components
                                    </Text> */}
                        </View>
                    </View>

                    {/* <View>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Industrial')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor1, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/72.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
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
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor2, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/64.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor2, marginLeft:10 }}>
                                        Domestic
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor2,marginLeft:10 }}>
                                        Models
                                    </Text>
                                </View>
                            </View>

                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Water Softeners')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor3, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/76.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, marginRight: 10, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor3,marginLeft:10 }}>
                                        Water
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor3,marginLeft:10 }}>
                                        Softeners
                                    </Text>
                                </View>
                            </View> */}
                </View>
            )
        })
    }

    rendercategoriesbanner1 = () => {
        // await delay(5000)
        // console.log('banner',this.state.listofcategories)
        return this.state.listofcategories.map((item) => {
            return (
                <View>
                    <View style={{ marginLeft: 10, }}>
                        <TouchableOpacity
                            // this.changecolor('Domestic')
                            onPress={() => this.props.navigation.navigate('Categories', { id: item.id })}
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
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor }}>
                                Components
                                    </Text> */}
                        </View>
                    </View>

                    {/* <View>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Industrial')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor1, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/72.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
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
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor2, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/64.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor2, marginLeft:10 }}>
                                        Domestic
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor2,marginLeft:10 }}>
                                        Models
                                    </Text>
                                </View>
                            </View>

                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Water Softeners')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor3, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/76.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, marginRight: 10, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor3,marginLeft:10 }}>
                                        Water
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor3,marginLeft:10 }}>
                                        Softeners
                                    </Text>
                                </View>
                            </View> */}
                </View>
            )
        })
    }


    getbanners = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "banners/homegroup", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                if (result.status == 1) {
                    for (let i = 0; i < result.data.length; i++) {
                        // this.setState({documentslist:result.data[i].document})
                        this.state.listofbanners.push(result.data[i])
                    }
                    // console.log('banners',this.state.listofbanners)
                }
                else {
                    alert(result)
                }
            })
            .catch(error => console.log('error', error));
    }

    renderbanners = () => {
        return this.state.homegroup.map((item) => {
            return (
                <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,0.5)', marginTop: 20 }}>
                    <Image key={item.id} source={{ uri: item.slider_image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                </View>
            )
        })
    }

    renderbanners1 = () => {
        return this.state.listofbanners.map((item) => {
            return (
                <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,0.5)', marginTop: 20 }}>
                    <Image key={item.id} source={{ uri: item.image }} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} />
                </View>
            )
        })
    }


    getpopularproducts = () => {
        // await delay(5000);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "popular-products", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                for (let i = 0; i < result.data.length; i++) {

                    this.state.listofpopularproducts.push(result.data[i])
                }
                this.setState({ showloader: !this.state.showloader })
                // console.log('popprods',this.state.listofpopularproducts)
            })
            .catch(error => console.log('error', error));
    }



    renderpopularproducts = () => {
        // delay(5000);
        // console.log('popprodu1',this.state.listofpopularproducts)
        return this.state.popularproductsbanner.map((item) => {
            return (
                <View>
                    <View style={{ height: Dimensions.get('window').height / 5, }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                            style={{ height: 90, width: 90, borderRadius: 45, borderWidth: 5, borderColor: '#0f5396', marginRight: 25, marginLeft: 25, marginTop: 10 }}
                        >
                            {/* source={require('../../assets/pop1.png')} */}
                            <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: 80, width: 80, borderRadius: 40 }} />
                        </TouchableOpacity>
                        <View style={{ paddingBottom: 2, paddingTop: 2, paddingRight: 5, paddingLeft: 5, backgroundColor: 'rgba(0,175,239,1)', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 105, left: 20, borderRadius: 10 }}>
                            <Text style={{ color: '#ffffff', flexWrap: 'wrap', textAlign: 'center' }}>
                                {item.title}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        })
    }

    renderpopularproducts1 = () => {
        // delay(5000);
        // console.log('popprodu1',this.state.listofpopularproducts)
        return this.state.listofpopularproducts.map((item) => {
            return (
                <View>
                    <View style={{ height: Dimensions.get('window').height / 5, }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Productdetails', { id: item.id })}
                            style={{ height: 90, width: 90, borderRadius: 45, borderWidth: 5, borderColor: '#0f5396', marginRight: 25, marginLeft: 25, marginTop: 10 }}
                        >
                            {/* source={require('../../assets/pop1.png')} */}
                            <Image key={item.id} source={{ uri: item.feature_image }} style={{ height: 80, width: 80, borderRadius: 40 }} />
                        </TouchableOpacity>
                        <View style={{ paddingBottom: 2, paddingTop: 2, paddingRight: 5, paddingLeft: 5, backgroundColor: 'rgba(0,175,239,1)', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 105, left: 20, borderRadius: 10 }}>
                            <Text style={{ color: '#ffffff', flexWrap: 'wrap', textAlign: 'center' }}>
                                {item.title}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        })
    }


    gettopsellingproducts = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://romegamart.com/api/topselling-products", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                for (let i = 0; i < result.data.length; i++) {

                    this.state.listoftopsellingproducts.push(result.data[i])
                }
                this.setState({ showloader2: !this.state.showloader2 })
            })
            .catch(error => console.log('error', error));
    }

    renderProductRow(rowData) {

        const { product_id, title, feature_image } = rowData;
        //  if(this.state.searchlist.length>0){
        return (
            <View style={{ height: 80, width: Dimensions.get('window').width }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', }}>
                    <Image key={product_id} source={{ uri: feature_image }} style={{ height: 70, width: 70, marginRight: 20, marginLeft: 20 }} />
                    <Text >{`${title}`} </Text>
                </View>
                {/* <Text > {`${state_id}`}</Text> */}
            </View>
        );
        // } else {
        //     // let title = 'No results found';
        //     // let product_id =1;
        //     return (
        //     <View style={{height:80,width:Dimensions.get('window').width, alignItems:'center',justifyContent:'center'}}>
        //     <View style={{flexDirection:'row',marginLeft:20, alignItems:'center', }}>
        // <Image key={product_id} source={require('../../assets/43.png')} style={{ height: 20, width: 20,marginRight:20, marginLeft:20 }} />
        //     <Text style={{color:'#000000'}}>{`${title}`}</Text>
        // </View>
        // </View>
        // alert('No results found')
        //)
        //}
    }

    renderButtonText(rowData) {
        const { product_id, title } = rowData;
        console.log(`${product_id} - ${title}`);
        return ` ${title}`;
    }

    defaultvalue = () => {
        return (
            <Feather name="search" size={20} color="#ffffff" />
        )
    }


    clearsearch =() => {
        this.setState({search:''})
        this.props.navigation.navigate('Verifiedhome')
    }

    render() {
        const { navigation } = this.props;
        const menu = <Menu navigator={navigator} />;
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
                        onPress={() => this.setState({ showmenu: !this.state.showmenu })}
                        //onPress={() => this.props.navigation.navigate('Menu')}
                        style={{ marginLeft: 10 }}>
                        <Entypo name="menu" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: 'https://romegamart.com/third-party/logo.jpeg' }}
                        // source={require('../../assets/logo.jpeg')} 
                        style={{ height: 50, width: 50, borderRadius: 25, marginLeft: Dimensions.get('window').width / 8 }} />
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notifications', { id: this.state.userid })}
                        >
                            <MaterialCommunityIcons name="bell" size={30} color="#ffffff" style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Myaccount')}
                        >
                            <Ionicons name="person" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showexitappmodal}
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

                                        Are you sure you want to exit the app?

                                    </Text>


                                    <View style={{ flexDirection: 'row', marginTop: 0, }}>
                                        <TouchableOpacity
                                            // onPress={() => this.setState({ showModal: !this.state.showModal })}
                                            onPress={() => { this.setState({ showexitappmodal: !this.state.showexitappmodal }, () => this.props.navigation.navigate('Login')) }}
                                            style={{ height: 40, width: 100, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginRight: 15 }}
                                        >
                                            <Text style={{ fontSize: 14, color: '#ffffff' }}>Cancel</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity
                      onPress={() =>{this.setState({showModal:!this.state.showModal},() =>this.props.navigation.navigate('Kyc'))}}
                       // onPress={() => this.setState({ showModal: !this.state.showModal })}
                        style={{ height: 40, width: 100, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center',  marginTop: 15,marginRight:15 }}
                      >
                        <Text style={{ fontSize: 14, color: '#ffffff' }}>Complete KYC</Text>
                      </TouchableOpacity> */}

                                        <TouchableOpacity
                                            onPress={() => this.setState({ showexitappmodal: !this.state.showexitappmodal }, () => BackHandler.exitApp())}
                                            style={{ height: 40, width: 40, backgroundColor: '#ff0000', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}
                                        >
                                            <Text style={{ fontSize: 16, color: '#ffffff' }}>OK</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </View>

                        </Modal>
                    </View>

                    {/* <SearchBar
                        lightTheme   
                        placeholder="Type here .. "
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        /> */}

                    {/* <View style={{ flexDirection: 'row', margin: 10 }}>
                            <TextInput
                                placeholder=''
                                style={{ width: Dimensions.get('window').width - 85, height: 40, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center', fontSize: 18, borderColor: '#1e90ff', borderWidth: 2 }}
                                placeholderTextColor={'#000000'}
                                onChangeText={async (text) => await this.setState({ search: text }, () =>this.getsearch())}
                                value={this.state.search}
                            />  */}
                    {/* <TouchableOpacity
                                style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Feather name="search" size={30} color="#ffffff" />
                            </TouchableOpacity> */}
                    {/* <View>
                                
                            <ModalDropdown
                            //style={{ width: Dimensions.get('window').width / 3-10, height: 40,  borderRadius: 8,backgroundColor:'rgba(221,221,221,0.5)',justifyContent:'center',marginRight:Dimensions.get('window').width/6 }}
                            style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                            options={this.state.searchlist}
                            dropdownStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2+100,marginTop:30,marginLeft:10 }}
                            dropdownTextStyle={{ fontSize: 16, color: '#000000' }}
                            dropdownTextHighlightStyle={{backgroundColor:'#2e3191'}}
                            textStyle = {{fontSize:18,marginLeft:10 }}
                            renderRow={this.renderProductRow.bind(this)}
                            renderButtonText={(rowData)=>this.renderButtonText(rowData)}
                            onSelect={(idx, value)=> this.props.navigation.navigate('Productdetails',{id:value.product_id})}
                            defaultValue={this.defaultvalue()}
                            > 
                            </ModalDropdown>
                            
                            </View>
                        </View>   */}

                    <View
                        style={{ flexDirection: 'row', margin: 10 }}
                    >
                        <TextInput
                            placeholder=''
                            style={{ width: Dimensions.get('window').width - 85, height: 40, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center', fontSize: 18, borderColor: '#1e90ff', borderWidth: 2 }}
                            placeholderTextColor={'#000000'}
                            onChangeText={ (text) =>  this.setState({search: text,showsearchresults:false  }, () => this.productsearch())}   //() =>this.getsearch()
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
                            <ScrollView>
                                {this.createsearch()}
                            </ScrollView>
                        </View>
                        :
                        null
                        // this.setState({searchlist:[]})
                    }


                    {/* <View>
                            {this.rendersearch()}
                        </View> */}

                    {/* <View>
                        <SearchBar
  ref="searchBar"
  placeholder="Search"
  onChangeText={}
  //onSearchButtonPress={...}
 // onCancelButtonPress={...}
/>
                        </View> */}

                    <ScrollView>

                        <View style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                            <Swiper
                                style={{ height: Dimensions.get('window').height / 2 }}
                                horizontal={true}
                                autoplay={true}
                                key={this.state.firstbanner.length}
                                autoplayTimeout={3}
                                showsPagination={true}
                                loop={true}
                                dot={<View style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 8, height: 8, borderRadius: 4, margin: 3 }} />}
                                activeDot={<View style={{ backgroundColor: '#000000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                            >
                                {/* <Slideshow */}

                                {this.rendermainbanner()}
                                {/* /> */}
                                {/* style={{ height: Dimensions.get('window').height / 3 - 30, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(169,169,169,0.2)' }} */}
                                {/* <Image source={require('../../assets/22.png')} style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, }} /> */}

                            </Swiper>
                        </View>

                        {/* <View style={{ borderColor: '#DDDDDD', borderWidth: 2, marginTop: 20 }}>

                        </View> */}

                        <View style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'rgba(31,92,177,1)', marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ fontSize: 24, color: '#ffffff', marginLeft: 10, }}>
                                Categories
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
                            >
                                <Text style={{ fontSize: 24, color: '#ffffff', marginRight: 10 }}>Explore all</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ height: 150, backgroundColor: 'rgba(30,144,255,0.8)', }}> */}
                        <ImageBackground
                            source={{ uri: 'https://romegamart.com/third-party/catbg.jpg' }}
                            // source={require('../../assets/catbg.jpg')} 
                            style={{ height: 150, width: Dimensions.get('window').width }}
                        >
                            <ScrollView horizontal={true}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>

                                    {this.rendercategoriesbanner()}
                                    {/* <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Domestic')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/73.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
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
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor1, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/72.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
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
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor2, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/64.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor2, marginLeft:10 }}>
                                        Domestic
              </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor2,marginLeft:10 }}>
                                        Models
              </Text>
                                </View>
                            </View>

                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.changecolor('Water Softeners')}
                                    style={{ height: 82, width: 82, borderRadius: 41, borderColor: this.state.bordercolor3, borderWidth: 1 }}
                                >
                                    <Image source={require('../../assets/76.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 80, marginRight: 10, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: this.state.textcolor3,marginLeft:10 }}>
                                        Water
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, color: this.state.textcolor3,marginLeft:10 }}>
                                        Softeners
                                    </Text>
                                </View>
                            </View> */}

                                </View>
                            </ScrollView>
                        </ImageBackground>
                        {/* </View> */}


                        <View
                            style={{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'rgba(0,175,239,1)', marginTop: 20 }}
                        >
                            <View >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 24, color: '#ffffff', marginLeft: 10 }}>
                                        Popular Products
                                    </Text>
                                    <TouchableOpacity
                                        style={{ marginRight: 10 }}
                                        onPress={() => this.props.navigation.navigate('Products', { id: this.state.listofpopularproducts[0].subcat_id })}
                                    >
                                        <Text style={{ fontSize: 24, color: '#ffffff' }}>
                                            See all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        {/* {this.state.showloader ? */}
                        <ImageBackground
                            source={{ uri: 'https://romegamart.com/third-party/popbg.jpg' }}
                            // source={require('../../assets/popbg.jpg')} 
                            style={{ height: 150, width: Dimensions.get('window').width, alignItems: 'center' }}
                        >
                            <ScrollView horizontal={true}>
                                {this.renderpopularproducts()}
                            </ScrollView>
                        </ImageBackground>
                        {/* :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <ActivityIndicator size="large" color="#2e3191" />
                                    </View>
                                    
                                } */}
                        {/* <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Products')}

                            >
                                <Image source={require('../../assets/pop1.png')} style={{ height: Dimensions.get('window').height / 6 + 18, width: Dimensions.get('window').width, }} />
                            </TouchableOpacity> */}



                        <View style={{ marginTop: Dimensions.get('window').height / 15 }}>
                            {/* width: Dimensions.get('window').width - 50, height: 35, */}
                            <View style={{ backgroundColor: 'rgba(17,161,245,0.8)', alignItems: 'center', justifyContent: 'center', top: -25, marginLeft: 20, position: 'absolute', zIndex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>
                                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                                    Deals and offers of the day
                                </Text>
                            </View>
                            <View style={{ height: Dimensions.get('window').height / 2 + 100, width: Dimensions.get('window').width, backgroundColor: 'rgba(100,215,255,.1)', alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.showloader ?
                                    <ScrollView>
                                        {this.renderdeal()}
                                    </ScrollView>
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                        <ActivityIndicator size="large" color="#2e3191" />
                                    </View>
                                }
                                {/* <View style={{ flexDirection: 'row',marginLeft:15,marginRight:15,marginTop:30 }}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 1,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/24.png')} style={{ height: 100, width: 120, }} />
                                <Text style={{color:'#ff0000'}}>
                                    Faucets at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../assets/25.png')} style={{ height: 100, width: 120, }} />
                                <Text style={{color:'#ff0000'}}>
                                Pumps at 20% off for weekend
                                </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff', borderRightColor: '#DDDDDD', borderRightWidth: 1,borderTopColor:'#DDDDDD',borderTopWidth:1,alignItems:'center',justifyContent:'center' }}>
                                <Image source={require('../../assets/26.png')} style={{ height: 100, width: 120, }} />
                                <Text style={{color:'#ff0000'}}>
                                     Tanks at 20% off for weekend
                                </Text>
                                </View>
                                <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 2 - 40, backgroundColor: '#ffffff',borderTopColor:'#DDDDDD',borderTopWidth:1,alignItems:'center',justifyContent:'center'  }}>
                                <Image source={require('../../assets/27.png')} style={{ height: 100, width: 120, }} />
                                <Text style={{color:'#ff0000'}}>
                                    Housings at 20% off for weekend
                                </Text>
                                </View>
                            </View> */}

                            </View>
                            {/* </TouchableOpacity> */}

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                                <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,0.5)' }}>
                                    {this.renderfeaturemiddle()}
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                {/* <ScrollView horizontal={true}> */}
                                {/* <View style={{margin:15}}>
                            <View style={{height:Dimensions.get('window').height/5,width:Dimensions.get('window').width/3, borderLeftColor:'rgba(135,206,235,1)',borderRightColor:'rgba(135,206,235,1)',borderRightWidth:1,borderLeftWidth:1, borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:'center',justifyContent:'center',zIndex:1,backgroundColor:'#ffffff'}}>
                            <Image source={require('../../assets/27.png')} style={{ height: Dimensions.get('window').height/7, width: Dimensions.get('window').width/5, }} />
                             </View>
                            <View style={{height:Dimensions.get('window').height/10,width:Dimensions.get('window').width/3, backgroundColor:'rgba(135,206,235,0.5)', borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:'center',justifyContent:'center',marginTop:-10}}>
                                <Text style={{fontSize:24,}}>
                                    200lph
                                </Text>
                                <Text style={{fontSize:24,}}>
                                    plant
                                </Text>
                            </View>
                        </View>  */}
                                {this.state.showloader1 ?
                                    <ScrollView horizontal={true}>
                                        {this.renderfeatureproducts()}
                                    </ScrollView>
                                    : null}

                                {/* </ScrollView> */}
                            </View>

                        </View>


                        <View style={{ marginTop: Dimensions.get('window').height / 15 }}>
                            <View style={{ width: Dimensions.get('window').width - 110, height: 35, backgroundColor: '#87cefa', alignItems: 'center', justifyContent: 'center', top: -25, marginLeft: 20, position: 'absolute', zIndex: 1, borderRadius: 10 }}>
                                <Text style={{ fontSize: 24, color: '#ffffff' }}>
                                    Launch of the Week/Day
                                </Text>
                            </View>
                            {/* <View style={{ height: Dimensions.get('window').height / 2 - 50, width: Dimensions.get('window').width, backgroundColor: '#c8db69', alignItems: 'center', justifyContent: 'center' }}> */}
                            <ImageBackground
                                source={{ uri: 'https://romegamart.com/third-party/launchbg.jpg' }}
                                // source={require('../../assets/launchbg.jpg')}
                                style={{ height: Dimensions.get('window').height / 2 - 50, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }}
                            >
                                {/* <Image source={require('../../assets/28.png')} style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width / 2, }} /> */}
                                {this.renderlaunch()}
                            </ImageBackground>
                            {/* </View> */}
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            {/* {this.state.showloader3? */}
                            <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,0.5)' }}>
                                {this.renderlaunchtopselling()}
                            </View>
                            {/* :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }}>
                                            <ActivityIndicator size="large" color="#2e3191" />
                                        </View>
                                } */}
                        </View>
                        {/* rgba(0,0,205,0.8) */}
                        <View style={{ height: Dimensions.get('window').height / 3 - 20, width: Dimensions.get('window').width, backgroundColor: 'rgba(132,166,197,1)', marginTop: 20 }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                                    Top Selling Products
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <ScrollView horizontal={true}>
                                    {this.state.showloader2 ?
                                        this.rendertopsellingproducts()
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <ActivityIndicator size="large" color="#ffffff" />
                                        </View>
                                    }

                                    {/* <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/29.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 4 }} />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                UV BRIEL
                                </Text>
                                        </View>
                                    </View>

                                    <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/30.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 4 }} />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                                SAND MEDIA
                                </Text>
                                        </View>
                                    </View>

                                    <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/31.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 4, }} />
                                        <View>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', }}>
                                                WALL MOUNTED
                                </Text>
                                        </View>
                                    </View>

                                    <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 - 20, backgroundColor: 'rgba(135,206,235,1)', marginRight: 10, marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/32.png')} style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 4 }} />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                                PUMPS
                                </Text>
                                        </View> 
                                    </View>*/}
                                </ScrollView>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                            {this.renderbanners()}

                            {/* <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,0.5)' }}>

                            </View>

                            <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(175,238,238,1)', marginTop: 20 }}>

                            </View>

                            <View style={{ height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width - 30, backgroundColor: 'rgba(211,211,211,0.3)', marginTop: 20 }}>

                            </View> */}
                        </View>

                        <View style={{ marginTop: Dimensions.get('window').height / 15 }}>
                            {/* Dimensions.get('window').height / 2 + 40, */}
                            <Image
                                source={{ uri: 'https://romegamart.com/third-party/why.jpeg' }}
                                // source={require('../../assets/why.jpeg')} 
                                style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }} />
                            {/* <View style={{ width: Dimensions.get('window').width/2, height: 35, backgroundColor: '#00bfff', alignItems: 'center', justifyContent: 'center', top: -25, marginLeft: 20, position: 'absolute', zIndex: 1 }}>
                            <Text style={{  fontSize: 24 }}>
                               WHY CHOOSE US
                        </Text>
                        </View>
                        <View style={{ height: Dimensions.get('window').height / 2-30, width: Dimensions.get('window').width, backgroundColor: '#d3d3d3',alignItems:'center',justifyContent:'center' }}>
                            <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                                <View style={{marginRight:Dimensions.get('window').width/9}}>
                            <Image source={require('../../assets/33.png')} style={{ height: Dimensions.get('window').height/6, width: Dimensions.get('window').width/4 }} />
                            <Text style={{fontSize:17,color:'#6a5acd'}}>
                                FAST SERVICE
                            </Text>
                            </View>

                            <View>
                            <Image source={require('../../assets/40.png')} style={{ height: Dimensions.get('window').height/6, width: Dimensions.get('window').width/4 }} />
                            <Text style={{fontSize:17,color:'#6a5acd'}}>
                                BEST PRICING
                            </Text>
                            </View>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'center',}}>
                                <View style={{marginLeft:Dimensions.get('window').width/12}}>
                            <Image source={require('../../assets/41.png')} style={{ height: Dimensions.get('window').height/6, width: Dimensions.get('window').width/4,  }} />
                            <Text style={{fontSize:17,color:'#6a5acd'}}>
                            100% SECURE
                            </Text>
                            </View>

                            <View>
                            <Image source={require('../../assets/42.png')} style={{ height: Dimensions.get('window').height/6, width: Dimensions.get('window').width/4,marginLeft:Dimensions.get('window').width/10 }} />
                            <Text style={{fontSize:17,marginLeft:Dimensions.get('window').width/14,color:'#6a5acd'}}>
                                EXPRESS DELIVERY
                            </Text>
                            </View>
                            </View>
                        </View> */}
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
          </View>

          <View style={{ height: 40, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
              RO MEGA MART
            </Text>
          </View> */}
                        <View style={{ height: Dimensions.get('window').height / 7, marginTop: Dimensions.get('window').height / 16, width: Dimensions.get('window').width }}>
                            <Image
                                source={{ uri: 'https://romegamart.com/third-party/ro1.jpg' }}
                                // source={require('../../assets/ro1.jpg')} 
                                style={{ height: Dimensions.get('window').height / 10, width: Dimensions.get('window').width, }} />
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: Dimensions.get('window').height / 14, marginTop: Dimensions.get('window').height / 30, marginBottom: 0 }}>
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
                                    source={{ uri: 'https://romegamart.com/third-party/insta.jpeg' }}
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
                {/* borderTopColor: '#DDDDDD', borderTopWidth: 3 */}
                <View style={{ flex: 0.1 }}>
                    <View style={{ position: 'absolute', height: 60, left: 0, width: Dimensions.get('window').width, backgroundColor: 'rgba(189,191,193,1)', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.clearsearch()}  //this.props.navigation.navigate('Verifiedhome')
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
                                // onPress={() => this.props.navigation.navigate('Categories')}
                                onPress={() => this.props.navigation.navigate('Categories', { id: 50 })}
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
    // text: {
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     color: '#0000ff',
    //     marginLeft: 10
    // },
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


