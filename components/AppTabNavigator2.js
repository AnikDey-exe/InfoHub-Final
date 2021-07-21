import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import OfferScreen from '../screens/OfferScreen';
import TuitionScreen from '../screens/TuitionScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator2} from './AppStackNavigator2';
import {Icon} from 'react-native-elements';

const ACTIVE_TAB_COLOR = 'red'
const INACTIVE_TAB_COLOR = 'grey'

export const AppTabNavigator2 = createBottomTabNavigator(
    {
        OfferScreen: {
            screen: OfferScreen,
            navigationOptions: {
                //tabBarIcon: 
                //<Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
                tabBarIcon: 
                ({ focused }) => <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
                tabBarLabel: "Offer",
            }
        },
        TuitionScreen: {
            screen: AppStackNavigator2,
            navigationOptions: {
                /*tabBarIcon: 
                <Icon name='search' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,*/
                tabBarIcon: 
                ({ focused }) => <Icon name='search' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
                tabBarLabel: "Search"
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