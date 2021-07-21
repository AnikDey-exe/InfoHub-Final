import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';
import {Avatar} from 'react-native-elements';

export default class TuitionScreen extends Component {

    constructor(){
        super()
        this.state = {
          addedTuitionsList : [],
          searchText: '',
          value: ''
        }
        this.requestRef = null
        this.arrayholder = []
    }

    getaddedTuitionsList =()=>{
        if(this.state.searchText === ''){
            this.requestRef = db.collection('TuitionsList')
            .onSnapshot((snapshot)=>{
              var addedTuitionsList = snapshot.docs.map(document => document.data());
              this.setState({
                addedTuitionsList : addedTuitionsList
              });
              this.arrayholder = snapshot.docs.map(document => document.data());
            })
        }
        else {
            this.setState({
                addedTuitionsList: []
            })
        }
    }

    getSearchList = async(text) => {
       // var enteredText = this.state.searchText;
        var enteredText = text.split(""); 
       // console.log(this.state.searchText);
        if(enteredText[0].toUpperCase() === "A" ||
        enteredText[0].toUpperCase() === "B" ||
        enteredText[0].toUpperCase() === "C" ||
        enteredText[0].toUpperCase() === "D" ||
        enteredText[0].toUpperCase() === "E" ||
        enteredText[0].toUpperCase() === "F" ||
        enteredText[0].toUpperCase() === "G" ||
        enteredText[0].toUpperCase() === "H" ||
        enteredText[0].toUpperCase() === "I" ||
        enteredText[0].toUpperCase() === "J" ||
        enteredText[0].toUpperCase() === "K" ||
        enteredText[0].toUpperCase() === "L" ||
        enteredText[0].toUpperCase() === "M" ||
        enteredText[0].toUpperCase() === "N" ||
        enteredText[0].toUpperCase() === "O" ||
        enteredText[0].toUpperCase() === "P" ||
        enteredText[0].toUpperCase() === "Q" ||
        enteredText[0].toUpperCase() === "R" ||
        enteredText[0].toUpperCase() === "S" ||
        enteredText[0].toUpperCase() === "T" ||
        enteredText[0].toUpperCase() === "U" ||
        enteredText[0].toUpperCase() === "V" ||
        enteredText[0].toUpperCase() === "W" ||
        enteredText[0].toUpperCase() === "X" ||
        enteredText[0].toUpperCase() === "Y" ||
        enteredText[0].toUpperCase() === "Z"){
            const search = await db.collection('TuitionsList').where("topic","==",this.state.searchText).get()
            search.docs.map((doc)=>{
                this.setState({
                  addedTuitionsList: [...this.state.addedTuitionsList,doc.data()]
                })
            })
        }
        else if(enteredText === "") {
            this.requestRef = db.collection('TuitionsList')
            .onSnapshot((snapshot)=>{
              var addedTuitionsList = snapshot.docs.map(document => document.data());
              this.setState({
                addedTuitionsList : addedTuitionsList
              });
            })
        }
    }

    searchFilterFunction = (text) => {
      this.setState({
        value: text
      })
      const newData = this.arrayholder.filter(item => {      
        const itemData = `${item.topic}   ${item.userName}`.toUpperCase();
        
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      
      this.setState({ addedTuitionsList: newData });
    }
    
    componentDidMount(){
        this.getaddedTuitionsList();
    }
    
    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ( {item, i} ) =>{
      return (
        <ListItem
          key={i}
          title={item.topic} 
          subtitle={"Price: "+item.pricing + "\nContact: "+ item.contact + "\nPosted By: "+ item.userName}
          titleStyle={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}
          subtitleStyle={{paddingLeft: 10}}
          containerStyle={{
            width: "95%",
            marginTop: 10,
            alignSelf: 'center'
          }}
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
          //leftElement={<Icon name="user-circle" onPress={()=>{this.props.navigation.navigate("UserDetails",{"details": item})}} type="font-awesome" color ='black'/>}
          rightElement={
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{this.props.navigation.navigate("TuitionDetails",{"details": item})}}>
              <Text style={{color:'white'}}> View </Text>
            </TouchableOpacity>
          }
        bottomDivider
        />
      )
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
                this.state.addedTuitionsList.length === 0
                ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}> All Tuitions </Text>
              </View>
                )
                :(
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.addedTuitionsList}
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