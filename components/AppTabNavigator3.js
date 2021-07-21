import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyExplanationsScreen from '../screens/MyExplanationsScreen';
import MyTuitionsScreen from '../screens/MyTuitionsScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator3} from './AppStackNavigator3';
import {AppStackNavigator4} from './AppStackNavigator4';
import {Icon} from 'react-native-elements';

const ACTIVE_TAB_COLOR = 'red'
const INACTIVE_TAB_COLOR = 'grey'

export const AppTabNavigator3 = createBottomTabNavigator(
{
    MyExplanationsScreen: {
        screen: AppStackNavigator3,
        navigationOptions: {
            //tabBarIcon: 
            //<Icon name='list' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "My Posts",
            tabBarIcon: ({ focused }) => <Icon name='list' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            //tabBarIcon: 
            //<Icon name='user' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
            
            <Icon name='user-circle' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} /> 
            
            )
            ,
        }
    },
    MyTuitionsScreen: {
        screen: AppStackNavigator4,
        navigationOptions: {
           /* tabBarIcon: 
            <Icon name='list' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,*/
            tabBarLabel: "My Offers",
            tabBarIcon: ({ focused }) => <Icon name='list' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
        }
    }
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
    activeTintColor: ACTIVE_TAB_COLOR,
    inactiveTintColor: INACTIVE_TAB_COLOR,
    showLabel: true,
        style: {
            borderTopWidth: 0,
            paddingTop: 3,
            paddingBottom: 4,
            height: 60,
            shadowColor: '#60C3FF',
            shadowOpacity: 0.3,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 }
        }
    }
}
);