import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { AppTabNavigator } from './components/AppTabNavigator';
import { AppTabNavigator2 } from './components/AppTabNavigator2';
import { AppTabNavigator3 } from './components/AppTabNavigator3';
import {AppStackNavigator} from './components/AppStackNavigator';
import {AppStackNavigator2} from './components/AppStackNavigator2';
import {AppStackNavigator3} from './components/AppStackNavigator3';
import {AppStackNavigator4} from './components/AppStackNavigator4';

export default function App() {
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
  Stack:{screen: AppStackNavigator},
  Stack2:{screen: AppStackNavigator2},
  Stack3:{screen: AppStackNavigator3},
  Stack4:{screen: AppStackNavigator4},
})

const AppContainer =  createAppContainer(switchNavigator);
