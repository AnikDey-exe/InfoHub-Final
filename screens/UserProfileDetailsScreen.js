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
            image: '',
            viewerFirstName: '',
            viewerLastName: '',
            viewerFullName: '',
            viewerImage: '',
            conversationId: ''
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

    fetchViewerImage = (imageName) => {
        var storageRef = firebase.storage().ref().child("user_profiles/"+imageName);
        storageRef.getDownloadURL()
        .then((url)=>{
            this.setState({
                viewerImage: url
            })
        })
        .catch((error)=>{
            this.setState({
                viewerImage: '#'
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

    getViewerDetails = () => {
        db.collection("Users").where("emailID","==",this.state.userId).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    viewerFirstName: doc.data().firstName,
                    viewerLastName: doc.data().lastName,
                    viewerFullName: doc.data().firstName + " " + doc.data().lastName,
                })
            })
        })
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addConversationNotification = () => {
        var message = this.state.viewerFullName + " has started a conversation with you named "+this.state.userFullName + ", " + this.state.viewerFullName + ".";
            db.collection("AllNotifications").add({
                "message": message,
                "notificationStatus": "unread",
                "date": firebase.firestore.FieldValue.serverTimestamp(),
                "targetedUserId": this.state.profileId,
                "userId": this.state.userId,
                "image": this.state.viewerImage,
                "type": 'conversation',
                "requestId": this.state.conversationId,
                "targetedUserId2": this.state.userId,
                "topic": this.state.userFullName + ", " + this.state.viewerFullName,
                "description": "Start a new conversation!"
            })
    }

    componentDidMount() {
        this.getUserDetails();
        this.getViewerDetails();
        this.fetchImage(this.state.profileId);
        this.fetchViewerImage(this.state.userId);
    }

    addConversation = (profileId) => {
        var conversationId = this.createUniqueId();
        this.setState({
            conversationId: conversationId
        })
        db.collection("Conversations").add({
            "topic": this.state.userFullName + ", " + this.state.viewerFullName,
            "conversationId": conversationId,
            "targetedUserId": profileId.toLowerCase(),
            "targetedUserId2": this.state.userId.toLowerCase(),
            "description": "Start a new conversation!",
            "targetUserName": this.state.userFullName,
            "userName": this.state.viewerFullName,
            "requestId": conversationId,
        })

        db.collection("Conversations").add({
            "topic": this.state.userFullName + ", " + this.state.viewerFullName,
            "requestId": conversationId,
            "targetedUserId": this.state.userId.toLowerCase(),
            "targetedUserId2": profileId.toLowerCase(),
            "description": "Start a new conversation!",
            "targetUserName": this.state.userFullName,
            "userName": this.state.viewerFullName
        })
        .then(()=>{
            this.setState({
                topic: '',
                description: '',
                targetedUserId: ''
            })
        })

        return alert("If this user already has an account, you have successfully started a conversation with them!")
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                <View style={{flex: 0.1}}>
                    <Header
                    leftComponent={<Icon name="arrow-left" type='feather' color='black' onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{text: "Profile Details",style:{color: 'black',fontSize: 20, fontWeight: 'bold',height: 50, paddingTop: 5}}}
                    backgroundColor="white"
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

                {
                    this.state.profileId !== this.state.userId ? (
                        <View style={{flex: 10}}>
                        <TouchableOpacity 
                        style={{backgroundColor:'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center',width: 160,height: 30, marginTop: 20, alignSelf: 'center'}}
                        onPress={()=>{
                            this.addConversation(this.state.profileId)
                            this.addConversationNotification(this.state.userId)
                        }}>
                            <Text style={{alignSelf: 'center', color: 'white', fontSize: 15}}> Start Conversation </Text>
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