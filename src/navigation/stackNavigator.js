import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../Screens/about";
import Splash from "../Screens/splash";
import Welcome from "../Screens/welcome";
import Mobile from "../Screens/mobile";
import Otp from "../Screens/otp";
import Signup from "../Screens/signup";
import Login from "../Screens/login";
import Kyc from "../Screens/kyc";
import Forgotpw from "../Screens/forgotpw";
import Unverifiedhome from "../Screens/unverifiedhome";
import Verifiedhome from "../Screens/verifiedhome";
import Categories from "../Screens/categories";
import Terms from "../Screens/terms";
import Wishlist from "../Screens/wishlist";
import Cart from "../Screens/cart";
import Payment from "../Screens/payment";
import Confirmation from "../Screens/confirmation";
import Menu from "../Screens/menu";
import Deals from "../Screens/deals";
import Policy from "../Screens/policy";
import Rateus from "../Screens/rateus";
import Shareapp from "../Screens/shareapp";
import Support from "../Screens/support";
import Final from "../Screens/final";
import Addaddress from "../Screens/addaddress";
import Vendor from "../Screens/vendor";
import Notifications from "../Screens/notifications";
import Products from "../Screens/products";
import Productdetails from "../Screens/productdetails";
import Myaccount from "../Screens/myaccount";
import Newsdetails from "../Screens/newsdetails";
import News from "../Screens/news";
import Search from "../Screens/search";
import Orders from "../Screens/orders";
import Resetpw from "../Screens/resetpw";
import Settings from "../Screens/settings";
import Videos from "../Screens/videos";
//import { Deeplinks } from '@ionic-native/deeplinks';


const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="About" component={About} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Welcome" component={Welcome} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Mobile" component={Mobile} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Otp" component={Otp} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Signup" component={Signup} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Login" component={Login} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Kyc" component={Kyc} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Forgotpw" component={Forgotpw} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Unverifiedhome" component={Unverifiedhome} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Verifiedhome" component={Verifiedhome} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Categories" component={Categories} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Terms" component={Terms} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Wishlist" component={Wishlist} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Cart" component={Cart} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Payment" component={Payment} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Confirmation" component={Confirmation} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Menu" component={Menu} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Deals" component={Deals} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Policy" component={Policy} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Rateus" component={Rateus} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Shareapp" component={Shareapp} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Support" component={Support} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Final" component={Final} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Addaddress" component={Addaddress} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Vendor" component={Vendor} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Notifications" component={Notifications} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Products" component={Products} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Productdetails" component={Productdetails} 
      options={{headerShown: false,tabBarVisible: false,}}
      
      />
      <Stack.Screen name="Myaccount" component={Myaccount} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Newsdetails" component={Newsdetails} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="News" component={News} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Search" component={Search} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Orders" component={Orders} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Resetpw" component={Resetpw} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
      <Stack.Screen name="Settings" component={Settings} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
       <Stack.Screen name="Videos" component={Videos} 
      options={{headerShown: false,tabBarVisible: false,}}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }