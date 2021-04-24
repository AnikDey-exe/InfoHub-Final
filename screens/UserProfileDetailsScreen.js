import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Card, Icon, withTheme, Header, Avatar } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            userId: firebase.auth().currentUser.email,
            profileId: this.props.navigation.getParam('details')["userId"],
            userFirstName: '',
            userLastName: '',
            userFullName: '',
            userPoints: '',
            userContact: '',
            userDescription: '',
            docId: '',
            image: ''
        }
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

    getUserDetails = () => {
        db.collection("Users").where("emailID","==",this.state.profileId).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    userFirstName: doc.data().firstName,
                    userLastName: doc.data().lastName,
                    userFullName: doc.data().firstName + " " + doc.data().lastName,
                    docId: doc.id,
                    userPoints: doc.data().points,
                    userContact: doc.data().contact,
                    userDescription: doc.data().description
                })
            })
        })
    }

    componentDidMount() {
        this.getUserDetails();
        this.fetchImage(this.state.profileId);
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                <View style={{flex: 0.1}}>
                    <Header
                    leftComponent={<Icon name="arrow-left" type='feather' color='black' onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{text: "Profile Details",style:{color: 'black',fontSize: 20, fontWeight: 'bold',height: 50, paddingTop: 5}}}
                    //backgroundColor="white"
                    />
                </View>

                <View style={{ flex: 0.5, alignItems: 'center', marginTop: 30, width: "50%", height: "auto", alignSelf: 'center' }}>
                        <Avatar
                            rounded
                            source={{
                                uri: this.state.image
                            }}
                            size="xlarge"
                            containerStyle={{
                                marginTop: 20
                            }}
                           />
                    </View>

                
                <View style={styles.titleView}>
                    <Text style={styles.titleText}> {this.state.userFullName} </Text>
                    <Text style={styles.desText}> {this.state.userDescription} </Text>
                </View>
                
                <View style={styles.pointsView}>
                    <Text style={styles.pointsText}> Points: {this.state.userPoints} </Text>
                </View>
            
                <View style={{flex: 0.3, marginTop: 40}}>
                    <Card
                    title={"My Profile"}
                    titleStyle={{fontSize: 20}}>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> First Name: {this.state.userFirstName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Last Name: {this.state.userLastName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Email: {this.state.profileId} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Contact: {this.state.userContact} </Text>
                        </Card>
                    </Card>
                </View>

                {
                    this.state.profileId === this.state.userId ? (
                        <View style={{flex: 10}}>
                        <TouchableOpacity 
                        style={{backgroundColor:'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center',width: 50,height: 50, marginTop: 40, alignSelf: 'center'}}
                        onPress={()=>{
                            this.props.navigation.navigate('Settings')
                        }}>
                            <Icon name='cog' style={{paddingTop: 2.5}} type='font-awesome' color='white' onPress={()=>{this.props.navigation.navigate('Settings')}}/>
                        </TouchableOpacity>
                    </View>
                    ) : (
                        null
                    )
                }
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
        marginTop: 40
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