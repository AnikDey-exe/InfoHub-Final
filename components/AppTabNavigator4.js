import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import CreateScreen from '../screens/CreateScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ConversationDetailsScreen from '../screens/ConversationDetailsScreen';
import UserProfileDetailsScreen from '../screens/UserProfileDetailsScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator5} from './AppStackNavigator5';
import {Icon} from 'react-native-elements';

const ACTIVE_TAB_COLOR = 'red'
const INACTIVE_TAB_COLOR = 'grey'

export const AppTabNavigator4 = createBottomTabNavigator(
{
    ConversationScreen: {
        screen: AppStackNavigator5,
        navigationOptions: {
            //tabBarIcon: 
            //<Icon name='list' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Conversations",
            tabBarIcon: ({ focused }) => <Icon name='comments' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
        }
    },
    CreateScreen: {
        screen: CreateScreen,
        navigationOptions: {
            //tabBarIcon: 
            //<Icon name='user' type='font-awesome' style={{width: 20, height: 20}} color='grey'/>,
            tabBarLabel: "Create",
            tabBarIcon: ({ focused }) => <Icon name='plus' type='font-awesome' style={{width: 20, height: 20}} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}/>,
        }
    },
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