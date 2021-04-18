import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import { AppTabNavigator2 } from './AppTabNavigator2';
import { AppTabNavigator3 } from './AppTabNavigator3';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CustomSideBarMenu from './CustomSideBarMenu';
import { Image } from 'react-native';
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: AppTabNavigator3,
            navigationOptions:{
                drawerIcon : <Icon name="home" type ="font-awesome" />,
            },
        },

        Explain: {
            screen: AppTabNavigator,
            navigationOptions:{
                drawerIcon : <Icon name="pencil" type ="font-awesome" />,
            },
        },

        Tuition: {
            screen: AppTabNavigator2,
            navigationOptions:{
                drawerIcon : <Icon name="list" type ="font-awesome" />,
            },
        },

        Notifications: {
            screen: NotificationScreen,
            navigationOptions:{
                drawerIcon : <Icon name="bell" type ="font-awesome" />,
            },
        },

        Settings: {
            screen: SettingsScreen,
            navigationOptions:{
                drawerIcon : <Icon name="cog" type ="font-awesome" />,
            },
            
        }
    },

    {
        contentComponent:  CustomSideBarMenu,
        screenContainerStyle: {
            marginTop: 50,
        }
    },

    {
        InitialRouteName: 'Explain'
    }
);