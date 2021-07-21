import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import ExplainScreen from '../screens/ExplainScreen';
import SearchScreen from '../screens/SearchScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStackNavigator';
import {Icon} from 'react-native-elements';

const ACTIVE_TAB_COLOR = 'red'
const INACTIVE_TAB_COLOR = 'grey'

export const AppTabNavigator = createBottomTabNavigator(
    {
    ExplainScreen: {
        screen: ExplainScreen,
        navigationOptions: {
           /* tabBarIcon: 
            <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,*/
            tabBarLabel: "Post",
            tabBarIcon: ({ focused }) => <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
        }
    },
    SearchScreen: {
        screen: AppStackNavigator,
        navigationOptions: {
            /*tabBarIcon: 
            <Icon name='search' type='font-awesome' color='grey' style={{width: 20, height: 20}}/>,*/
            tabBarLabel: "Search",
            tabBarIcon: ({ focused }) => <Icon name='search' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
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
            shadowOffset: { width: 0, height: 0 },
            //backgroundColor: '#0d1d52'
        }
    },
    
}
);