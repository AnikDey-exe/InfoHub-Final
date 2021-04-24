import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';
import WelcomeScreen from '../screens/WelcomeScreen';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {AppTabNavigator2} from './AppTabNavigator2';
import {Icon} from 'react-native-elements';

export default class CustomSideBarMenu extends React.Component {
    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            image: '',
            name: ''
        }
    }

    getUserProfile = () => {
        db.collection("Users").where("emailID","==",this.state.userId)
        .onSnapshot(
            querySnapshot => {
                querySnapshot.forEach((doc)=>{
                    this.setState({
                        name: doc.data().firstName + " " + doc.data().lastName
                    })
                })
            }
        )
    }

    fetchImage = (imageName) => {
        var storageRef = firebase.storage().ref().child("user_profiles/"+imageName);
        storageRef.getDownloadURL()
        .then((url)=>{
            this.setState({
                image: url
            })
        })
        .catch((error)=>{
            this.setState({
                image: '#'
            })
        })
    }

    /*uploadImage = async(uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child("user_profiles/"+imageName);

        return ref.put(blob)
        .then((response)=>{
            this.fetchImage(imageName)
        })
    }

    selectPicture = async() => { 
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1080      
        })

        if(!cancelled) {
            this.setState({
                image: uri
            })
            this.uploadImage(uri, this.state.userId);
        }
    }*/

    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!cancelled) {
          this.uploadImage(uri, this.state.userId);
        }
      };
    
      uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
    
        var ref = firebase
          .storage()
          .ref()
          .child("user_profiles/" + imageName);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };


    componentDidMount() {
        this.getUserProfile();
        this.fetchImage(this.state.userId);
    }

    componentWillUnmount() {
        //this.fetchImage(this.state.userId);
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 0.5, alignItems: 'center', backgroundColor: 'white'}}>
                    <Avatar
                    rounded
                    source={{
                        uri: this.state.image
                    }}
                    size="large"
                    onPress={()=>{this.selectPicture()}}
                    containerStyle={{
                        
                       marginTop: 20
                        
                    }}
                    showEditButton/>
                    <Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10}}> {this.state.name} </Text>
                    <Text style={{fontWeight: '400', fontSize: 15, paddingTop: 0, color: 'grey'}}> {this.state.userId} </Text>
                </View>
                <View style={styles.drawerItemContainer}>
                    <DrawerItems
                    {...this.props}/>
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={()=>{
                    this.props.navigation.navigate('WelcomeScreen')
                    firebase.auth().signOut() 
                    }}>
                         <Icon
                            name="logout"
                            type="antdesign"
                            size={20}
                            iconStyle={{ paddingLeft: 7.5, paddingTop: 5 }}
                            />

                        <Text style={styles.logoutText}> Log Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerItemContainer: {
        flex: 0.9,
        marginTop: 0,
        fontSize: 30
    },
    logoutContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    logoutButton: {
        paddingBottom: -30,
        paddingLeft: 10,
        borderRadius: 5,
        flexDirection: "row",
        width: "100%",
            
    },
    logoutText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black', 
        paddingLeft: 10
    }
})