import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Card, Icon, withTheme } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class HomeScreen extends React.Component {
    /*static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/home-icon.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),
      };*/

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            userName: "",
            contact: '',
            userId: firebase.auth().currentUser.email,
            points: 0,
            docId: '',
            description: '',
            image: ''
        }
    }

    getUserDetails = () => {
        db.collection("Users").where("emailID", "==", this.state.userId).get()
            .then(snapshot => {
                snapshot.forEach((doc) => {
                    this.setState({
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        userName: doc.data().firstName + " " + doc.data().lastName,
                        docId: doc.id,
                        points: doc.data().points,
                        contact: doc.data().contact,
                        description: doc.data().description
                    })
                })
            })
    }

    fetchImage = async (imageName) => {
        var storageRef = await firebase.storage().ref().child("user_profiles/" + imageName);
        storageRef.getDownloadURL()
            .then((url) => {
                console.log("url 58: ", url)
                this.setState({
                    image: url
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    image: '#'
                })
            })
    }

    // uploadImage = async (uri, imageName) => {
    //     var response = await fetch(uri);
    //     var blob = await response.blob();
    //     var ref = firebase.storage().ref().child("user_profiles/" + imageName);

    //     return ref.put(blob)
    //         .then((response) => {
    //             this.fetchImage(imageName)
    //         })
    // }

    // selectPicture = async () => {
    //     const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1080
    //     })
    //     console.log("message 004.1:",uri)
    //     if (!cancelled) {
    //         this.setState({
    //             image: uri
    //         })
    //         this.uploadImage(uri, this.state.userId);
    //     }
    // }
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
        console.log('Home screen')
        this.getUserDetails();
        this.fetchImage(this.state.userId)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                
                    <View style={{ flex: 0.1 }}>
                        <MyHeader
                            title="My Profile"
                            navigation={this.props.navigation} />
                    </View>
                    <ScrollView style={{marginTop: 70}}>
                    <View style={{ flex: 0.5, alignItems: 'center', backgroundColor: 'white', marginTop: 30, width: "50%", height: "auto", alignSelf: 'center' }}>
                        <Avatar
                            rounded
                            source={{
                                uri: this.state.image
                            }}
                            size="xlarge"
                            onPress={() => { this.selectPicture() }}
                            containerStyle={{
                                marginTop: 20
                            }}
                            showEditButton />
                    </View>

                    <View style={styles.titleView}>
                        <Text style={styles.titleText}> Welcome {this.state.firstName}! </Text>
                        <Text style={styles.desText}> {this.state.description} </Text>
                    </View>

                    <View style={styles.pointsView}>
                        <Text style={styles.pointsText}> Points: {this.state.points} </Text>
                    </View>

                    <View style={{ flex: 0.3, marginTop: 20, bottom: 20 }}>
                        <Card
                            title={"My Profile"}
                            titleStyle={{ fontSize: 20 }}
                            containerStyle={{borderRadius: 15}}>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}> Name: {this.state.userName} </Text>
                            </Card>

                            <Card>
                                <Text style={{ fontWeight: 'bold' }}> First Name: {this.state.firstName} </Text>
                            </Card>

                            <Card>
                                <Text style={{ fontWeight: 'bold' }}> Last Name: {this.state.lastName} </Text>
                            </Card>

                            <Card>
                                <Text style={{ fontWeight: 'bold' }}> Email: {this.state.userId} </Text>
                            </Card>

                            <Card>
                                <Text style={{ fontWeight: 'bold' }}> Contact: {this.state.contact} </Text>
                            </Card>
                        </Card>
                    </View>

                    <View style={{ flex: 10, bottom: 10}}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, alignSelf: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate('Settings')
                            }}>
                            <Icon name='cog' style={{ paddingTop: 5 }} type='font-awesome' color='white' onPress={() => { this.props.navigation.navigate('Settings') }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        justifyContent: 'center',
        marginTop: 40
    },
    titleText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30
    },
    pointsView: {
        justifyContent: 'center',
        marginTop: -10
    },
    pointsText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    desText: {
        alignSelf: 'center',
        fontSize: 10,
        color: 'grey',
        marginTop: 20
    }
})