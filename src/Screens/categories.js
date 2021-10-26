import React from 'react';
import { View, Modal, BackHandler, ActivityIndicator, AsyncStorage, FlatList, TextInput, StyleSheet, Image, Text, Platform, Dimensions, ScrollView, ImageBackground, SectionList, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { BASE_URL } from '../api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Categories extends React.Component {
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
            showdomesticsystem: false,
            showdomesticcomponents: false,
            showindustrialcomponents: false,
            showcommercialcomponents: false,
            showwatersoftner: false,
            listofcategories: [],
            subcategoryid: this.props.route.params.id,
            listofsubcategories: [],
            showsubcategory: false,
            iscategoryItem: 0,
            showloader1: false,
            showloader: false,
            subcatergorymargintop: 0,
            listofsearchbrands: [],
            listofsearchcategories: [],
            listofsearchproducts: [],
            showModal: false,
            search: '',
            flatlistheight: '',
            showmenu: false,
            otheritem: '',
            showlastitemmodal: false,
            req: '',
            req_size:'',
        }
        this.backActionHandler = this.backActionHandler.bind(this);
    }

    async componentDidMount() {
        this.getcategories();

        await AsyncStorage.getItem('userid').then((userid) => {
            if (userid) {
                this.setState({ userid: userid });
                // console.log('userid',this.state.userid);
            }
        });

        console.log('userid', this.state.userid);

        if (this.props.route.params.id) {
            this.setState({ subcategoryid: this.props.route.params.id })
        }
        else {
            console.log('no id')
        }
        // console.log('subcat id inside component did mount',this.state.subcategoryid)
        let margtop = 1;

        margtop = Dimensions.get('window').height / 13

        // AsyncStorage.setItem('subcategoryid',this.state.subcategoryid)
        // this.getsubcategories();

        this.setState({ subcatergorymargintop: margtop })

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


    UNSAFE_componentWillMount() {
        //this.getcategories();
        // this.getsubcategories();
    }

    clearasyncdata = async () => {
        //await AsyncStorage.clear();
        await AsyncStorage.removeItem('verifieduserloggedin')
        await AsyncStorage.removeItem('unverifieduserloggedin')
        await this.setState({ showmenu: !this.state.showmenu })
        this.props.navigation.navigate('Login')
    }

    getcategories = () => {
        // await delay(5000);
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
                    this.state.listofcategories.push(result.data[i])
                }
                this.setState({ showloader: !this.state.showloader })
                console.log('categories', this.state.listofcategories)


                //  if(this.props.route.params.id){
                //      console.log('inside if')
                //      this.setState({subcategoryid:this.props.route.params.id})
                //  }
                //  else {
                //     console.log('inside else')
                //         this.setState({subcategoryid:result.data[0].id})
                // }

                // console.log('subcat id inside component did mount',this.state.subcategoryid)

                // delay(5000);
                // console.log('subcatid inside getcat',this.state.subcategoryid)
                //this.setState({iscategoryItem:0})

                this.getsubcategories();

            })
            .catch(error => console.log('error', error));
    }

    rendercategories = () => {
        // console.log('2')
        //  console.log('cate',this.state.listofcategories)
        return this.state.listofcategories.map((item, index) => {
            return (
                <View>
                    <View >

                        <View style={{}}>
                            <ImageBackground
                                source={{ uri: 'https://romegamart.com/third-party/sidebar.jpeg' }}
                                // source={require('../../assets/sidebar.jpeg')}
                                // style={{width:Dimensions.get('window').width/2+50,height:Dimensions.get('window').height-160}}
                                style={{ width: Dimensions.get('window').width / 3 + 10, height: Dimensions.get('window').height / 14, justifyContent: 'center', }}
                            >
                                <TouchableOpacity
                                    // style={{width: Dimensions.get('window').width / 3+10, height: Dimensions.get('window').height / 14, backgroundColor: '#4897c2', justifyContent: 'center',}}
                                    onPress={() => this.setState({
                                        iscategoryItem: index,
                                        subcategoryid: item.id,
                                        subcatergorymargintop: (index) * Dimensions.get('window').height / 13
                                    }, () => this.getsubcategories())}
                                >
                                    {this.state.subcategoryid == item.id?
                                     <Text key={index} style={{ color: '#ffffff', fontSize: 18, marginLeft: 5, fontWeight:'bold' }}>
                                     {/* Domestic System  AsyncStorage.setItem('subcategoryid',item.id),  */}
                                     {item.name}
                                 </Text>
                                :
                                    <Text key={index} style={{ color: '#ffffff', fontSize: 14, marginLeft: 5 }}>
                                        {/* Domestic System  AsyncStorage.setItem('subcategoryid',item.id),  */}
                                        {item.name}
                                    </Text>
                                }
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>

                        {/* {(this.state.iscategoryItem == index ) ? */}
                        {/* // <View> && this.state.showdomesticsystem
                                //     <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                //         <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                //         {item.name}
                                //         </Text>
                                //         <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                //             Explore all domestic models
                                //         </Text>
                                //     </View>
                            //     <View style={{marginLeft:Dimensions.get('window').width/3,backgroundColor:'#f0f8ff',marginTop:-this.state.subcatergorymargintop}}>
                            //         {this.rendersubcategories()}
                            //      </View>
                            //     : null
                            // } */}
                    </View>

                    {/* <View style={{marginLeft:Dimensions.get('window').width/3,backgroundColor:'#f0f8ff',marginTop:this.state.iscategoryItem == 0 ? 5:-this.state.subcatergorymargintop,position:'absolute',width:Dimensions.get('window').width-(Dimensions.get('window').width/3-20),flexGrow:1}}>
                            {this.state.iscategoryItem == index  ?
                       
                            this.rendersubcategories()
                            
                           
                            :null
                            }     
                        </View> */}

                </View>
            )
        })
    }


    rendercategory = () => {
        //return this.state.listofcategories.map((item,index) => {
        return (
            <FlatList
                data={this.state.listofcategories}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity
                                style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 13, backgroundColor: '#4897c2', justifyContent: 'center', }}
                                onPress={() => this.setState({
                                    iscategoryItem: index,
                                    subcategoryid: item.id,
                                    subcatergorymargintop: (index) * Dimensions.get('window').height / 13
                                }, () => this.getsubcategories())}
                            >
                                <Text key={index} style={{ color: '#ffffff', fontSize: 18, marginLeft: 10 }}>
                                    {/* Domestic System  AsyncStorage.setItem('subcategoryid',item.id),  */}
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        )
        //})
    }


    getsubcategories = () => {
        // this.setState({listofsubcategories:[]})
        // this.setState({showsubcategory:true,iscategoryItem:index, subcategoryid:item.id })
        // console.log('subcategoryidinside get subcategories',this.state.subcategoryid)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(BASE_URL + "subcategories/" + this.state.subcategoryid, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                // this.setState({listofsubcategories:[]})
                this.state.listofsubcategories.length = 0;
                for (let i = 0; i < result.subcategories.length; i++) {

                    this.state.listofsubcategories.push(result.subcategories[i])
                }
                this.setState({ showloader1: !this.state.showloader1 })
                 console.log('subcategories', this.state.listofsubcategories)


            })
            .catch(error => console.log('error', error));
    }

    getsearch = () => {
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
                if (result.products.length > 0) {
                    for (let i = 0; i < result.products.length; i++) {

                        this.state.listofsearchproducts.push(result.products[i])
                    }
                    this.props.navigation.navigate('Products')
                }
                if (result.categories.length > 0) {
                    for (let i = 0; i < result.categories.length; i++) {

                        this.state.listofsearchcategories.push(result.categories[i])
                    }
                    this.props.navigation.navigate('Categories')
                }
                if (result.brands.length > 0) {
                    for (let i = 0; i < result.brands.length; i++) {

                        this.state.listofsearchbrands.push(result.brands[i])
                    }
                    this.props.navigation.navigate('Products')
                }
            })
            .catch(error => console.log('error', error));
    }

    otherform =() => {
        var formdata = new FormData();
formdata.append("user_id", this.state.userid);
formdata.append("title",this.state.req );
formdata.append("text", this.state.req_size);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://romegamart.com/api/category-comment", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      if(result.status == true){
          alert(result.message)
          this.setState({ showlastitemmodal: false })
      }
      else{
          alert(result.message)
      }
    })
  .catch(error => console.log('error', error));
    }

    sectioncategories = () => {
        // console.log('cat in sectio',this.state.listofcategories);
        <SectionList
            //stickySectionHeadersEnabled={false}
            sections={this.state.listofcategories}
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => <Text style={{ color: '#000000' }}>
                {item.name}
            </Text>}
        //   renderSectionHeader={({ section: { title } }) => (
        //     <Text style={styles.header}>{title}</Text>
        //   )}
        />
    }

    Item = ({ title }) => (
        // console.log('title',title)
        <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 13, backgroundColor: '#4897c2', justifyContent: 'center', }}>
            <Text style={{ color: '#ffffff', fontSize: 18, marginLeft: 10 }}>{title}</Text>
        </View>
    );

    rendersubcategories() {
        // delay(5000);
        // console.log('subcat',this.state.listofsubcategories)
        // return this.state.listofsubcategories.map((item,index) => {
        return (
            <View>

                <View
                // style={{ flex:1}}
                >
                    <ScrollView
                        horizontal={true}
                    //showsHorizontalScrollIndicator={false}
                    >
                        <FlatList
                            // contentContainerStyle={{paddingBottom:280}}
                            numColumns={3}
                            keyExtractor={(item, index) => String(item.id)}
                            data={this.state.listofsubcategories}
                            renderItem={({ item, index }) => {
                                return (
                                    <View >
                                        <View style={{ marginRight: 2, borderWidth: 1, borderColor: '#000000', marginBottom: 5, marginLeft: 5, }}>
                                            <View style={{ margin: 10, height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7-4, }}>

                                                <TouchableOpacity
                                                    style={{}}
                                                    onPress={() =>
                                                        //this.setState({otheritem:index},
                                                        index == this.state.listofsubcategories.length - 1 ?
                                                            this.setState({ otheritem: index, showlastitemmodal: true })
                                                            :
                                                            this.props.navigation.navigate('Products', { id: item.id })
                                                    }

                                                >
                                                    <Image key={item.id} source={{ uri: item.cat_icon }} style={{ height: Dimensions.get('window').width / 7, width: Dimensions.get('window').width / 7, marginBottom: 0 }} />
                                                </TouchableOpacity>

                                                <Text style={{ textAlign: 'center', fontSize: 9, fontFamily: 'sans-serif-light', }}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        //ListFooterComponent={<View style={{height: 20}}/>}
                        // style={{flex:1}}
                        />
                    </ScrollView>
                </View>
                {this.state.otheritem == this.state.listofsubcategories.length - 1 ?

                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => this.setState({ showlastitemmodal: false })}
                            visible={this.state.showlastitemmodal}
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
                                    <View>
                                        <TouchableOpacity
                                        onPress={() =>this.setState({showlastitemmodal:false})}
                                        style={{alignItems:'flex-end', marginLeft:Dimensions.get('window').width-90, marginTop:0}}
                                        >
                                        <AntDesign name="close" size={20} color="#ff0000" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{fontSize:18,}}>Please fill your requirement</Text>
                                    <TextInput
                                        placeholder={'Please enter type of product'}
                                        onChangeText={(text) => this.setState({ req: text })}
                                        value={this.state.req}
                                        style={{ height: 40, width: Dimensions.get('window').width - 80, fontSize: 14, borderColor: '#DDDDDD', borderWidth: 1, marginTop:10 }}
                                    />

                                    <TextInput
                                        placeholder={'Please enter the size'}
                                        onChangeText={(text) => this.setState({ req_size: text })}
                                        value={this.state.req_size}
                                        style={{ height: 40, width: Dimensions.get('window').width - 80, fontSize: 14, borderColor: '#DDDDDD', borderWidth: 1, marginTop:10 }}
                                    />

                                    <TouchableOpacity
                                        style={{ height: 40, width: Dimensions.get('window').width / 2, backgroundColor: '#2e3191', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}
                                        onPress={() =>this.otherform() }
                                    >
                                        <Text style={{ color: '#ffffff', fontSize: 20 }}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    :
                    null}
            </View>
        )
        //  })
    }

    rendersubcategory() {
        return (
            <View>
                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Wall Mount RO
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Table Top RO
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Under Sink RO
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Wall Mount RO
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Water Purifier
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: Dimensions.get('window').height / 6, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://romegamart.com/third-party/34.png' }}
                            // source={require('../../assets/34.png')} 
                            style={{ height: Dimensions.get('window').height / 9, width: Dimensions.get('window').width / 7 }} />
                        <Text style={{ fontSize: 24, }}>
                            Non Electric
                        </Text>
                        <TouchableOpacity>
                            <Entypo name="squared-plus" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
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
                            //onPress={() => this.setState({showModal:!this.state.showModal})}
                            onPress={() => this.props.navigation.navigate('Search')}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.showModal}
                            >
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <TextInput
                                        placeholder=''
                                        style={{ width: Dimensions.get('window').width - 85, height: 40, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, textAlign: 'center', fontSize: 18, borderColor: '#1e90ff', borderWidth: 2 }}
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(text) => this.setState({ search: text })}
                                        value={this.state.search}
                                    />
                                    <TouchableOpacity
                                        style={{ height: 40, width: 60, backgroundColor: '#1e90ff', borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                                        // onPress={() =>this.getsearch()}
                                        onPress={() => this.props.navigation.navigate('Search')}
                                    >
                                        <Feather name="search" size={30} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>

                            </Modal>
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
                <View style={{ flex: 0.9, backgroundColor: '#f0f8ff', flexGrow: 1 }}>
                    {/* <ScrollView style={{}}> */}
                    <View>
                        {/*<View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3, backgroundColor: '#1e90ff' }}>
                           <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 24 }}>
                                        Categories
                                    </Text>
                                </View>

                                <View>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 24 }}>
                                            See all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
            </View>*/}

                        {/* <View>
                                <ScrollView horizontal={true}>
                                    <View style={{ flexDirection: 'row',marginTop:40 }}>
                                        <View style={{ marginRight: 10, marginLeft: 10 }}>
                                            <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                                            <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                    Domestic models
                                        </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginRight: 10 }}>
                                            <Image source={require('../../assets/35.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                                            <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                    Commercial plants
                                        </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginRight: 10 }}>
                                            <Image source={require('../../assets/36.png')} style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 3 }} />
                                            <View style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 18, backgroundColor: '#1055b0', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                                    Industrial plants
                                        </Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView> 
                            </View>
                        </View>*/}
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingBottom: 0, width: Dimensions.get('window').width / 3 + 10 }}>
                            {/* {this.state.showloader? */}
                            <ScrollView>
                                {this.rendercategories()}

                            </ScrollView>
                            {/* :
                             <View style={{justifyContent:'center',alignItems:'center', height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}}>
                             <ActivityIndicator size="large" color="#2e3191" />
                             </View>
                             }  */}
                        </View>

                        <View style={{ marginTop: 5, width: Dimensions.get('window').width - (Dimensions.get('window').width / 3), }}>
                            {/* //{this.state.iscategoryItem == index  ? this.state.iscategoryItem == 0 ? 5:-this.state.subcatergorymargintop*/}

                            {this.rendersubcategories()}


                            {/* //  :null
                          //  }     */}
                        </View>


                        {/* <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Image 
                                     source={{uri: 'https://romegamart.com/third-party/34.png'}}
                                    source={require('../../assets/34.png')} 
                                    style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 5 }} />
                                    <Text style={{ fontSize: 24, }}>
                                        Domestic System
                                      </Text>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            showdomesticsystem: true,
                                            showdomesticcomponents: false,
                                            showindustrialcomponents: false,
                                            showcommercialcomponents: false,
                                            showwatersoftner: false,
                                        })}
                                    >
                                        <Entypo name="squared-plus" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.showdomesticsystem ?
                                <View>
                                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                            Domestic System
                                        </Text>
                                        <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                            Explore all domestic models
                                        </Text>
                                    </View>
                                    {this.rendersubcategories()}
                                </View>
                                : null
                            }

                            <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 5 }} />
                                    <Text style={{ fontSize: 24, }}>
                                        Domestic Components
                                      </Text>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            showdomesticsystem: false,
                                            showdomesticcomponents: true,
                                            showindustrialcomponents: false,
                                            showcommercialcomponents: false,
                                            showwatersoftner: false,
                                        })}
                                    >
                                        <Entypo name="squared-plus" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.showdomesticcomponents ?
                                <View>
                                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                            Domestic Components
                                        </Text>
                                        <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                            Explore all domestic components
                                        </Text>
                                    </View>
                                    {this.rendersubcategories()}
                                </View>
                                : null
                            }

                            <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 5 }} />
                                    <Text style={{ fontSize: 24, }}>
                                        Industrial Components
                                      </Text>
                                    <TouchableOpacity
                                    onPress={() => this.setState({
                                        showdomesticsystem: false,
                                        showdomesticcomponents: false,
                                        showindustrialcomponents: true,
                                        showcommercialcomponents: false,
                                        showwatersoftner: false,
                                    })}
                                    >
                                        <Entypo name="squared-plus" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.showindustrialcomponents ?
                                <View>
                                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                            Industrial Components
                                        </Text>
                                        <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                            Explore all industrial components
                                        </Text>
                                    </View>
                                    {this.rendersubcategories()}
                                </View>
                                : null
                            }

                            <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, borderBottomColor: '#DDDDDD', borderBottomWidth: 3, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 5 }} />
                                    <Text style={{ fontSize: 24, }}>
                                        Commercial Components
                                      </Text>
                                    <TouchableOpacity
                                    onPress={() => this.setState({
                                        showdomesticsystem: false,
                                        showdomesticcomponents: false,
                                        showindustrialcomponents: false,
                                        showcommercialcomponents: true,
                                        showwatersoftner: false,
                                    })}
                                    >
                                        <Entypo name="squared-plus" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.showcommercialcomponents ?
                                <View>
                                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                            Commercial Components
                                        </Text>
                                        <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                            Explore all commercial components
                                        </Text>
                                    </View>
                                    {this.rendersubcategories()}
                                </View>
                                : null
                            }
                            <View style={{ height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width, borderBottomColor: '#000000', borderBottomWidth: 3, justifyContent: 'center',marginBottom:55}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Image source={require('../../assets/34.png')} style={{ height: Dimensions.get('window').height / 7, width: Dimensions.get('window').width / 5 }} />
                                    <Text style={{ fontSize: 24, }}>
                                        Water Softner
                                      </Text>
                                    <TouchableOpacity
                                    onPress={() => this.setState({
                                        showdomesticsystem: false,
                                        showdomesticcomponents: false,
                                        showindustrialcomponents: false,
                                        showcommercialcomponents: false,
                                        showwatersoftner: true,
                                    })}
                                    >
                                        <Entypo name="squared-plus" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.state.showwatersoftner ?
                                <View style={{marginBottom:55}}>
                                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 3 }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10, }}>
                                            Water softners
                                        </Text>
                                        <Text style={{ fontSize: 19, marginLeft: 10, marginBottom: 15 }}>
                                            Explore all water softners
                                        </Text>
                                    </View>
                                    {this.rendersubcategories()}
                                </View>
                                : null
                            }
 */}

                        {/* <View>
                        <View>
                            <TouchableOpacity 
                            style={{width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 15, backgroundColor: '#00008b', alignItems: 'center', justifyContent: 'center'}}
                            onPress={() =>this.setState({showdomesticsystem:true})}
                            >
                                <Text style={{color:'#ffffff',fontSize:18}}>
                                    Domestic System
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.showdomesticsystem?
                        this.rendersubcategories()
                        :null}
                    </View>*/}

                    </View>


                    {/* </ScrollView> */}

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
                            //onPress={() => this.props.navigation.navigate('Categories')}
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


