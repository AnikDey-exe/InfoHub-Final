import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';
import {Avatar} from 'react-native-elements';

export default class ConversationScreen extends Component {
    constructor(){
        super()
        this.state = {
          addedConversationsList : [],
          addedConversationsList2 : [],
          searchText: '',
          users: [],
          author: '',
          userId: '',
          userID: firebase.auth().currentUser.email,
          docId: '',
          image: '',
          value: '',
          viewerName: '',
          targetedUserName: ''
        }
        this.requestRef = null
        this.arrayholder = [],
        this.arrayholder2 = []
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
  
      getaddedConversationsList =()=>{
          if(this.state.searchText === ''){
              this.requestRef = db.collection('Conversations')
              .where("targetedUserId", '==', this.state.userID)
              .onSnapshot((snapshot)=>{
                var addedConversationsList = snapshot.docs.map(document => document.data());
                this.setState({
                  addedConversationsList : addedConversationsList,
                })
                this.arrayholder = snapshot.docs.map(document => document.data());
              })
          }
          else {
              this.setState({
                  addedConversationsList: []
              })
          }
      }

      getaddedConversationsList2 =()=>{
        if(this.state.searchText === ''){
            this.requestRef = db.collection('Conversations')
            .where("targetedUserId2", '==', this.state.userID)
            .onSnapshot((snapshot)=>{
              var addedConversationsList2 = snapshot.docs.map(document => document.data());
              addedConversationsList2 = addedConversationsList2.filter((list) => { return list.targetedUserId2 == this.state.userID })
              this.setState({
                addedConversationsList2 : addedConversationsList2,
              })
              this.arrayholder2 = snapshot.docs.map(document => document.data());
              this.arrayholder2 = this.arrayholder2.filter((list) => { return list.targetedUserId2 == this.state.userID })
            })
        }
        else {
            this.setState({
                addedConversationsList2: []
            })
        }
    }

      getUserDetails = (userID) => {
        db.collection("Users").where("emailID","==",userID).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    viewerName: doc.data().firstName + " " + doc.data().lastName
                })
            })
        })
      }

      searchFilterFunction = (text) => {
        this.setState({
          value: text
        })
        const newData = this.arrayholder.filter(item => {      
          const itemData = `${item.topic}   ${item.description}`.toUpperCase();
          
           const textData = text.toUpperCase();
            
           return itemData.indexOf(textData) > -1;    
        });

        const newData2 = this.arrayholder2.filter(item => {      
          const itemData = `${item.topic}   ${item.userName}`.toUpperCase();
          
           const textData = text.toUpperCase();
            
           return itemData.indexOf(textData) > -1;    
        });
        
        this.setState({ addedConversationsList: newData });

        this.setState({ addedConversationsList2: newData2 });
      }
      
      componentDidMount(){
          this.getaddedConversationsList(this.state.userID);
          this.getaddedConversationsList2(this.state.userID); 
         
      }
      
      componentWillUnmount(){
          this.requestRef();
      }
  
      keyExtractor = (item, index) => index.toString();

      // getTargetUserDetails = ( {item} ) => {
      //   db.collection("Users").where("emailID","==",item.targetedUserId).get()
      //   .then(snapshot => {
      //       snapshot.forEach((doc) => {
      //           this.setState({
      //               targetedUserName: doc.data().firstName + " " + doc.data().lastName
      //           })
      //       })
      //   })
      // }
  
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={`${item.topic}`}
            subtitle={`${item.description}`}
            titleStyle={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}
            subtitleStyle={{paddingLeft: 10}}
            containerStyle={{
              width: "95%",
              marginTop: 10,
              alignSelf: 'center'
            }}
            //leftElement={<img
              //src={this.state.users}
             //onPress={()=>{this.props.navigation.navigate("UserDetails",{"details": item})}}
              //style={{width: 30, height: 30, alignItems: 'center',marginTop: 0}}
             // />}
            rightElement={
              <TouchableOpacity 
              style={styles.button}
              onPress={()=>{this.props.navigation.navigate("ConversationDetails",{"details": item})}}>
                <Text style={{color:'white'}}> View </Text>
              </TouchableOpacity>
            }
          bottomDivider
          />
        )
      }

      renderItem2 = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={`${item.topic}`}
            subtitle={`${item.description}`}
            titleStyle={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}
            subtitleStyle={{paddingLeft: 10}}
            //leftElement={<img
              //src={this.state.users}
             //onPress={()=>{this.props.navigation.navigate("UserDetails",{"details": item})}}
              //style={{width: 30, height: 30, alignItems: 'center',marginTop: 0}}
             // />}
            rightElement={
              <TouchableOpacity 
              style={styles.button}
              onPress={()=>{this.props.navigation.navigate("ConversationDetails",{"details": item})}}>
                <Text style={{color:'white'}}> View </Text>
              </TouchableOpacity>
            }
          bottomDivider
          />
        )
      }

      componentWillMount() {
        this.getUserDetails(this.state.author);
        this.fetchImage(this.state.userId);   
      }

      render() {
        return(
            <View style={{flex: 1}}>
                <MyHeader
                title="Search"
                navigation={this.props.navigation}/>
                <View style={styles.searchView}>
                    <SearchBar
                    containerStyle={styles.searchBar}
                    lightTheme
                    placeholder="Search"
                    onChangeText={text => this.searchFilterFunction(text)}
                    round
                    autoCorrect={false}
                    value={this.state.value}
                    />
                   {/* <TouchableOpacity onPress={()=>{this.getSearchList(this.state.searchText)}}>
                         <Text style={{color: 'black',fontWeight: 'bold'}}> Search </Text> 
        </TouchableOpacity> */}

                </View>
                
                <View style={{flex:1}}>
                
                {
                this.state.addedConversationsList.length === 0
                ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}> No Conversations Found</Text>
              </View>
                )
                :(

                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.addedConversationsList}
                renderItem={this.renderItem}
                />
                

                )
          }
           {/* {
                this.state.addedConversationsList2.length === 0
                ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}> No Conversations Found You Started </Text>
              </View>
                )
                :(
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.addedConversationsList2}
                renderItem={this.renderItem}
                />

                )
          } */}
        </View>  
            </View>
        )
    }
}


const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"black",
      shadowColor: "#000",
      marginTop: 50,
      marginLeft: 40,
      shadowOffset: {
         width: 0,
         height: 8
       }
    },
    searchView: {
        flexDirection:'row',
        height:'auto',
        width:'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center'
        
    },
    searchBar: {
     // borderWidth:1,
      height:'auto',
      width:'100%',
      //paddingLeft:10,
      //borderRadius: 10,
      //backgroundColor: '#f0f0f0',
      //alignSelf: 'center'
    },
    searchButton: {
        borderWidth:0.5,
        height:30,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#edf2ef'
    }
})
