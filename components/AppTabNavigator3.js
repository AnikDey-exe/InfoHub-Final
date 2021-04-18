import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyExplanationsScreen from '../screens/MyExplanationsScreen';
import MyTuitionsScreen from '../screens/MyTuitionsScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator3} from './AppStackNavigator3';
import {AppStackNavigator4} from './AppStackNavigator4';
import {Icon} from 'react-native-elements';

export const AppTabNavigator3 = createBottomTabNavigator({
    MyExplanationsScreen: {
        screen: AppStackNavigator3,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='list' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "My Posts"
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='user' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Profile"
        }
    },
    MyTuitionsScreen: {
        screen: AppStackNavigator4,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='list' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "My Offers"
        }
    }
});