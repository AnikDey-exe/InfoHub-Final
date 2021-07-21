import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { AppTabNavigator } from './components/AppTabNavigator';
import { AppTabNavigator2 } from './components/AppTabNavigator2';
import { AppTabNavigator3 } from './components/AppTabNavigator3';
import { AppTabNavigator4 } from './components/AppTabNavigator4';
import {AppStackNavigator} from './components/AppStackNavigator';
import {AppStackNavigator2} from './components/AppStackNavigator2';
import {AppStackNavigator3} from './components/AppStackNavigator3';
import {AppStackNavigator4} from './components/AppStackNavigator4';
import {AppStackNavigator5} from './components/AppStackNavigator5';
import { useFonts } from "@use-expo/font";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import MyHeader from './components/MyHeader';

const customFonts = {
  PoppinsRegular: require("./assets/Poppins-Regular.ttf"),
  PoppinsMedium: require("./assets/Poppins-Medium.ttf")
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
      return <AppLoading />;
  }

  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab:{screen: AppTabNavigator},
  BottomTab2:{screen: AppTabNavigator2},
  BottomTab3:{screen: AppTabNavigator3},
  BottomTab4:{screen: AppTabNavigator4},
  Stack:{screen: AppStackNavigator},
  Stack2:{screen: AppStackNavigator2},
  Stack3:{screen: AppStackNavigator3},
  Stack4:{screen: AppStackNavigator4},
  Stack5:{screen: AppStackNavigator5}
})

const AppContainer =  createAppContainer(switchNavigator);
