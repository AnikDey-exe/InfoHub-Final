import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ExplanationDetailsScreen from '../screens/ExplanationDetailsScreen';
import TuitionDetailsScreen from '../screens/TuitionDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import TuitionScreen from '../screens/TuitionScreen';
import MyExplanationsScreen from '../screens/MyExplanationsScreen';
import MyTuitionsScreen from '../screens/MyTuitionsScreen';
import UserProfileDetailsScreen from '../screens/UserProfileDetailsScreen';

//To provide unprivileged children without an education free tuitions and answers from service providers willing to help out society.

export const AppStackNavigator = createStackNavigator(
    {
        SearchList: {
            screen: SearchScreen,
            navigationOptions: {
                headerShown: false
            }
        },

        ExplanationDetails: {
            screen: ExplanationDetailsScreen,
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
        initialRouteName: 'SearchList'
    }
);