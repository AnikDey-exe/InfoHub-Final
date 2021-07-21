import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExplainScreen extends Component {
    constructor() {
        super();
        this.state ={
          userId : firebase.auth().currentUser.email,
          topic:"",
          explanation:"",
          userName: "",
          docId: "",
          points: null,
          firstName: '',
          image: ''
        }
    }
 
    getUserDetails = () => {
        db.collection("Users").where("emailID","==",this.state.userId).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    firstName: doc.data().firstName,
                    userName: doc.data().firstName + " " + doc.data().lastName,
                    docId: doc.id,
                    points: doc.data().points
                })
            })
        })
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

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    componentDidMount() {
        this.getUserDetails();
        this.fetchImage(this.state.userId);
    }
    
    addPost = (topic, explanation)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        if(this.state.explanation !== '' && this.state.topic !== ''){
            db.collection('ExplanationsList').add({
                "userId": userId,
                "topic": topic,
                "explanation": explanation,
                "requestId":randomRequestId,
                "userName": this.state.userName,
                "firstName": this.state.firstName,
                "image": this.state.image
            })
            .then(()=>{
                this.setState({
                    topic:'',
                    description: '',
                    pricing: ''
                })
            })


            return alert("Your post has been added. \n Note that you can only post a topic and get 10 points only once per session.");
        
        }
        else if(this.state.topic === ''){
            return alert('Please provide a topic');        
        }
        else if(this.state.explanation === ''){
            return alert('Please provide an explanation');
        }
        this.setState({
            topic:'',
            explanation: ''
        })
    }

    addPoints = () => {
        db.collection("Users").doc(this.state.docId).update({
            'points': this.state.points + 10
        })

        
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <MyHeader
                title="Explain"
                navigation={this.props.navigation}/>

            <KeyboardAvoidingView style={styles.keyBoardStyle}>
                      <Text style={styles.pointsStyle}> Total Points: {this.state.points} </Text>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Topic"}
                onChangeText={(text)=>{
                    this.setState({
                        topic:text
                    })
                }}
                value={this.state.topic}
              />
              <TextInput
                style ={[styles.formTextInput,{height:200}]}
                multiline
                numberOfLines ={8}
                placeholder={"About The Topic"}
                onChangeText ={(text)=>{
                    this.setState({
                        explanation: text
                    })
                }}
                value ={this.state.explanation}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    this.addPost(this.state.topic,this.state.explanation)
                    this.addPoints()
                }}>
                <Text style={{color:'white', fontFamily: 'PoppinsRegular'}}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:40,
      alignSelf:'center',
      borderColor:'black',
      borderRadius:10,
      borderWidth:0.5,
      marginTop:25,
      padding:10,
      fontFamily: 'PoppinsRegular',
      fontSize: 10
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#0d1d52",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
      pointsStyle: {
        fontSize: 15, alignSelf: 'center',  marginTop: 20, fontFamily: 'PoppinsRegular'
      }
})