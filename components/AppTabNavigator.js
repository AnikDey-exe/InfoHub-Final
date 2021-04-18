import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import ExplainScreen from '../screens/ExplainScreen';
import SearchScreen from '../screens/SearchScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStackNavigator';
import {Icon} from 'react-native-elements';

export const AppTabNavigator = createBottomTabNavigator({
    ExplainScreen: {
        screen: ExplainScreen,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Post"
        }
    },
    SearchScreen: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: 
            <Icon name='search' type='font-awesome' color='grey' style={{width: 20, height: 20}}/>,
            tabBarLabel: "Search"
        }
    }
});