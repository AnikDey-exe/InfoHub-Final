import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';
import SwipeableFlatlist from '../components/SwipeableFlatlist';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : [],
      image: ''
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    this.notificationRef = db.collection("AllNotifications")
    .where("notificationStatus", "==", "unread")
    .where("targetedUserId",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  updateMarkAsRead = (notification) => {
    if(notification.notificationStatus === "unread") {
      db.collection("AllNotifications").doc(notification.doc_id).update({
          'notificationStatus': "read"
      })
  }
}

navigate = (notification) => {
  if(notification.type === 'explanation') {
    this.props.navigation.navigate("ExplanationDetails",{"details": notification})
  }
  else if(notification.type === 'tuition') {
    this.props.navigation.navigate("TuitionDetails",{"details": notification})
  }
  else {
    this.props.navigation.navigate("ConversationDetails",{"details": notification})
  }
}

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          onPress={()=>{this.navigate(item)}}
         // leftElement={<Icon name="user-circle" onPress={()=>{this.props.navigation.navigate("UserDetails",{"details": item})}} type="font-awesome" color ='black'/>}
         leftElement={
          <Avatar
          rounded
          source={{ uri: item.image }}
          size="medium"
          onPress={()=>{this.props.navigation.navigate("UserDetails",{"details": item})}}
          containerStyle={{
              
             marginTop: 10
              
          }}/>
      }
          title={item.topic}
          titleStyle={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}
          subtitle={item.message}
          subtitleStyle={{paddingLeft: 10}}
          rightElement={
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{
              this.updateMarkAsRead(item)
            }}>
              <Text style={{color:'white'}}> Delete </Text>
            </TouchableOpacity>
          }
          bottomDivider
        />
      )
 }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}> You Have No Notifications </Text>
              </View>
            )
            :(
              //<SwipeableFlatlist
              //allNotifications={this.state.allNotifications}/>
              <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
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
})