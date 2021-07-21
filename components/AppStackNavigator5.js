import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import CreateScreen from '../screens/CreateScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ConversationDetailsScreen from '../screens/ConversationDetailsScreen';
import UserProfileDetailsScreen from '../screens/UserProfileDetailsScreen';

export const AppStackNavigator5 = createStackNavigator(
    {
        MyList: {
            screen: ConversationScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        ConversationDetails: {
            screen: ConversationDetailsScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        UserDetails: {
            screen: UserProfileDetailsScreen,
            navigationOptions: {
                headerShown: false
            }
        }
    },

    {
        initialRouteName: 'MyList'
    }
);