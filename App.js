/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {View, Text} from 'react-native';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const App = () => {
//   return <NavigationContainer>{/* Navigation here */}</NavigationContainer>;
// }
// export default App;

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/navigation/stackNavigator";
//import { MainStackNavigator,} from "./stackNavigator";
//import BottomTabNavigator from "./src/navigation/tabNavigator";
//import linking from "./src/Screens/linking";
//import { Deeplinks } from '@ionic-native/deeplinks';
//import { enableScreens } from 'react-native-screens'
//enableScreens()

 const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
export default App

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// import About from './src/Screens/about';
// import Splash from "./src/Screens/splash";
// import Welcome from "./src/Screens/welcome";
// import Mobile from "./src/Screens/mobile";
// import Otp from "./src/Screens/otp";
// import Signup from "./src/Screens/signup";
// import Login from "./src/Screens/login";
// import Kyc from "./src/Screens/kyc";
// import Forgotpw from "./src/Screens/forgotpw";
// import Unverifiedhome from "./src/Screens/unverifiedhome";
// import Verifiedhome from "./src/Screens/verifiedhome";
// import Categories from "./src/Screens/categories";
// import Terms from "./src/Screens/terms";
// import Wishlist from "./src/Screens/wishlist";
// import Cart from "./src/Screens/cart";
// import Payment from "./src/Screens/payment";
// import Confirmation from "./src/Screens/confirmation";
// import Menu from "./src/Screens/menu";
// import Deals from "./src/Screens/deals";
// import Policy from "./src/Screens/policy";
// import Rateus from "./src/Screens/rateus";
// import Shareapp from "./src/Screens/shareapp";
// import Support from "./src/Screens/support";
// import Final from "./src/Screens/final";
// import Addaddress from "./src/Screens/addaddress";
// import Vendor from "./src/Screens/vendor";
// import Notifications from "./src/Screens/notifications";
// import Products from "./src/Screens/products";
// import Productdetails from "./src/Screens/productdetails";
// import Myaccount from "./src/Screens/myaccount";
// import Newsdetails from "./src/Screens/newsdetails";
// import News from "./src/Screens/news";
// import Search from "./src/Screens/search";


// const Stack = createStackNavigator();

// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator 
//     initialRouteName="Verifiedhome"
//     >
//       <Stack.Screen name="Splash" component={Splash} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="About" component={About} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Welcome" component={Welcome} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Mobile" component={Mobile} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Otp" component={Otp} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Signup" component={Signup} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Login" component={Login} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Kyc" component={Kyc} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Forgotpw" component={Forgotpw} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Unverifiedhome" component={Unverifiedhome} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Verifiedhome" component={Verifiedhome} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Categories" component={Categories} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Terms" component={Terms} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Wishlist" component={Wishlist} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Cart" component={Cart} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Payment" component={Payment} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Confirmation" component={Confirmation} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Menu" component={Menu} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Deals" component={Deals} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Policy" component={Policy} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Rateus" component={Rateus} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Shareapp" component={Shareapp} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Support" component={Support} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Final" component={Final} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Addaddress" component={Addaddress} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Vendor" component={Vendor} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Notifications" component={Notifications} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Products" component={Products} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Productdetails" component={Productdetails} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Myaccount" component={Myaccount} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Newsdetails" component={Newsdetails} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="News" component={News} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//       <Stack.Screen name="Search" component={Search} 
//       options={{headerShown: false,tabBarVisible: false,}}
//       />
//     </Stack.Navigator>
//   );
// }

// export { MainStackNavigator };

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={Verifiedhome} />
//         <Drawer.Screen name="Categories" component={Categories} />
//         <Drawer.Screen name="Deals" component={Deals} />
//         <Drawer.Screen name="Myaccount" component={Myaccount} />
//         <Drawer.Screen name="Wishlist" component={Wishlist} />
//         <Drawer.Screen name="Cart" component={Cart} />
//         <Drawer.Screen name="Notifications" component={Notifications} />
//         {/* <Drawer.Screen name="Settings" component={Settings} /> */}
//         <Drawer.Screen name="Vendor" component={Vendor} />
//         <Drawer.Screen name="About" component={About} />
//         <Drawer.Screen name="Terms" component={Terms} />
//         <Drawer.Screen name="Policy" component={Policy} />
//         <Drawer.Screen name="Rateus" component={Rateus} />
//         <Drawer.Screen name="Shareapp" component={Shareapp} />
//         <Drawer.Screen name="Support" component={Support} />
//         {/* <Drawer.Screen name="Logout" component={Terms} /> */}
       
        
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }