import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import db from '../config';
import {View} from 'react-native';
import firebase from 'firebase';


export default class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            userId: firebase.auth().currentUser.email
        }
    }

    getNumberOfUnreadNotifications() {
        db.collection("AllNotifications")
        .where("notificationStatus","==","unread")
        .where("targetedUserId","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map((doc)=>doc.data());
            this.setState({
                value: unreadNotifications.length
            })
        })
    }


    componentDidMount() {
        this.getNumberOfUnreadNotifications();
    }

    BellIconWithBadge = () => {
        return(
            <View>
                <Icon name='bell' type='font-awesome' color="black" size={25} 
                onPress={() => this.props.navigation.navigate('Notifications')}/>
                <Badge
                value={this.state.value}
                badgeStyle={{backgroundColor: '#a30000'}}
                containerStyle={{position: 'absolute',top: -4, right: -4}}/>
            </View>
        )
    }

    render() {
        return (
            <Header
                leftComponent={<Icon name='bars' type='font-awesome' color='black' onPress={() => this.props.navigation.toggleDrawer()} />}
                centerComponent={{ text: this.props.title, style: { color: 'black', fontSize: 30, fontWeight: 'bold', height: 50, paddingTop: 5 } }}
                rightComponent={<this.BellIconWithBadge{...this.props}/>}
                //backgroundColor="#f0eded"
                backgroundColor="white"  />
        )
    }
}
