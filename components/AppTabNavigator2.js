import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import OfferScreen from '../screens/OfferScreen';
import TuitionScreen from '../screens/TuitionScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator2} from './AppStackNavigator2';
import {Icon} from 'react-native-elements';

export const AppTabNavigator2 = createBottomTabNavigator({
    OfferScreen: {
        screen: OfferScreen,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Offer"
        }
    },
    TuitionScreen: {
        screen: AppStackNavigator2,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='search' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Search"
        }
    }
});