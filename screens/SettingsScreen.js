import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ListItem, Card, Icon, withTheme } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {
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
            description: ''
        }
    }

    getUserDetails = () => {
        db.collection("Users").where('emailID','==',this.state.userId).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
          var data = doc.data()
            this.setState({
              firstName : data.firstName,
              lastName  : data.lastName,
              contact   : data.contact,
              docId     : doc.id,
              userName: data.firstName + " " + data.lastName,
              description: data.description
            })
          });
        })
    }

    componentDidMount() {
        this.getUserDetails();
    }

    updateUserProfileDetails = () => {
        db.collection("Users").doc(this.state.docId)
        .update({
          "firstName": this.state.firstName,
          "lastName" : this.state.lastName,
          "contact"   : this.state.contact,
          "description": this.state.description
        })
    
        alert("Your Profile Has Been Updated. Changes will occur once the app restarts.");
    }

    render() {
        return(
            <View style={{flex: 1}}>
                
                <View style={{flex: 0.1}}>
                    <MyHeader
                    title="Settings"
                    navigation={this.props.navigation}/>
                </View>

                <ScrollView style={{marginTop: 70}}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}> Profile Settings </Text>
                </View>
            
                <KeyboardAvoidingView style={{flex: 0.3, marginTop: 20}} behavior="padding" enabled>
                        <Card containerStyle={{marginTop: 40, width: "95%",alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}> Name: {this.state.userName} </Text>
                        </Card>

                        <Card containerStyle={{marginTop: 40, width: "95%",alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}> First Name:  </Text>
                        </Card>

                        <TextInput
                        style={styles.formTextInput}
                        placeholder ={"First Name"}
                        onChangeText={(text)=>{
                            this.setState({
                            firstName: text
                            })
                        }}
                        value ={this.state.firstName}/>

                        <Card containerStyle={{marginTop: 40, width: "95%",alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}> Last Name:  </Text>
                        </Card>

                        <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Last Name"}
                        onChangeText={(text)=>{
                            this.setState({
                            lastName: text
                            })
                        }}
                        value ={this.state.lastName}/>

                        <Card containerStyle={{marginTop: 40, width: "95%",alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}> Contact:  </Text>
                        </Card>

                        <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Contact"}
                        maxLength ={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                            this.setState({
                            contact: text
                            })
                        }}
                        value ={this.state.contact}/>

                        <Card containerStyle={{marginTop: 40, width: "95%",alignSelf: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}> Description:  </Text>
                        </Card>

                        <TextInput
                        style={styles.formTextInput}
                        placeholder ={"Tell Us About Yourself!"}
                        onChangeText={(text)=>{
                            this.setState({
                                description: text
                            })
                        }}
                        value ={this.state.description}/>

                        <TouchableOpacity style={styles.button}
                        onPress={()=>{
                            this.updateUserProfileDetails()
                        }}>
                        <Text style={styles.buttonText}> Update Profile </Text>
                        </TouchableOpacity>
                </KeyboardAvoidingView>

                <View style={{flex: 10}}>
                    <TouchableOpacity 
                    style={{backgroundColor:'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center',width: 50,height: 50, marginTop: 40,  alignSelf: 'center'}}
                    onPress={()=>{
                        this.props.navigation.navigate('HomeScreen')
                    }}>
                        <Icon name='home' style={{paddingTop: 2.5}} type='font-awesome' color='white' onPress={()=>{this.props.navigation.navigate('HomeScreen')}}/>
                    </TouchableOpacity>
                </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 10,
        
    },
    titleText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 10
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
    formTextInput:{
        width:"95%",
        height:40,
        alignSelf:'center',
        borderColor:'black',
        borderBottomWidth:1,
        marginTop:10,
        padding:0,
    },
    button:{
        width:"50%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"black",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:40,
        marginLeft: "25%"
    },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"white"
    }
})