import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ExplanationDetailsScreen from '../screens/ExplanationDetailsScreen';
import TuitionDetailsScreen from '../screens/TuitionDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import TuitionScreen from '../screens/TuitionScreen';
import MyExplanationsScreen from '../screens/MyExplanationsScreen';
import MyTuitionsScreen from '../screens/MyTuitionsScreen';
import UserProfileDetailsScreen from '../screens/UserProfileDetailsScreen';

export const AppStackNavigator2 = createStackNavigator(
    {
        TuitionList: {
            screen: TuitionScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        TuitionDetails: {
            screen: TuitionDetailsScreen,
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
        initialRouteName: 'TuitionList'
    }
);