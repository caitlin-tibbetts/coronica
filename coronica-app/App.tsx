import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
//import Firebase from './config/Firebase';
import auth from '@react-native-firebase/auth';

import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Inventory from "./screens/Inventory";
import Physical from "./screens/Physical";
import SelfCare from "./screens/SelfCare";
import Social from "./screens/Social";
import Clicker from "./screens/Clicker";
import Health from "./screens/Health";

import CDrawerButton from './components/CDrawerButton';

const getFonts = () => Font.loadAsync({
  'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'montserrat-semibolditalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf')
})

const customDrawerNavigator = (props) => (
  <SafeAreaView style={{flex:1, backgroundColor: '#EDFFEC'}}>
    <ScrollView style={{marginTop: 50}}>
      <DrawerItems {...props}/>
    </ScrollView>
    <CDrawerButton title='Log out' onPress={() => {
      auth()
        .signOut()
        .then(() => props.navigation.navigate('RouteHome'))}}/>
  </SafeAreaView>
)

const ActivitiesNavigator = createDrawerNavigator({
  RouteInventory: {
    screen: Inventory,
    navigationOptions: {
      drawerLabel: "Daily Inventory"
    }
  },
  RoutePhysical: {
    screen: Physical,
    navigationOptions: {
      drawerLabel: "Physical Activities"
    }
  },
  RouteSelfCare: {
    screen: SelfCare,
    navigationOptions: {
      drawerLabel: "Self Care"
    }
  },
  RouteSocial: {
    screen: Social,
    navigationOptions: {
      drawerLabel: "Social Activities"
    }
  },
  RouteClicker: {
    screen: Clicker,
    navigationOptions: {
      drawerLabel: "Stress Clicker"
    }
  },
  RouteHealth: {
    screen: Health,
    navigationOptions: {
      drawerLabel: "Health Check-in"
    }
  },
}, {contentComponent: customDrawerNavigator, drawerWidth: 200, initialRouteName: 'RouteInventory',
    contentOptions: {
      activeTintColor: '#7C90DB',
      itemStyle: {color: '#011638'}
    },});

const RootNavigator = createSwitchNavigator({
  RouteHome: {
    screen: Home,
    navigationOptions: {
      title: ""
    }
  },
  RouteSignup: {
    screen: Signup,
    navigationOptions: {
      title: ""
    }
  },
  RouteActivities: ActivitiesNavigator
}, {initialRouteName: 'RouteHome'})

const AppContainer = createAppContainer(RootNavigator)

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      <AppContainer/>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
      />
    );
  }
}
