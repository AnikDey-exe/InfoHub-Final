import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, SearchBar } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';

export default class MyExplanationsScreen extends Component {

    constructor(){
        super()
        this.state = {
          userId: firebase.auth().currentUser.email,  
          addedExplanationsList : [],
          searchText: '',
          value: ''
        }
        this.requestRef = null
        this.arrayholder = []
    }

    getaddedExplanationsList =()=>{
        if(this.state.searchText === ''){
            this.requestRef = db.collection('ExplanationsList').where("userId","==",this.state.userId)
            .onSnapshot((snapshot)=>{
              var addedExplanationsList = snapshot.docs.map(document => document.data());
              this.setState({
                addedExplanationsList : addedExplanationsList
              });
              this.arrayholder = snapshot.docs.map(document => document.data());
            })
        }
        else {
            this.setState({
                addedExplanationsList: []
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
            const search = await db.collection('ExplanationsList').where("topic","==",this.state.searchText).where("userId","==",this.state.userId).get()
            search.docs.map((doc)=>{
                this.setState({
                  addedExplanationsList: [...this.state.addedExplanationsList,doc.data()]
                })
            })
        }
        else if(enteredText === "") {
            this.requestRef = db.collection('ExplanationsList').where("userId","==",this.state.userId)
            .onSnapshot((snapshot)=>{
              var addedExplanationsList = snapshot.docs.map(document => document.data());
              this.setState({
                addedExplanationsList : addedExplanationsList
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
      
      this.setState({ addedExplanationsList: newData });
    }
    
    componentDidMount(){
        this.getaddedExplanationsList();
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
          subtitle={item.userName}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{this.props.navigation.navigate("ExplanationDetails",{"details": item})}}>
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
                title="My Topics"
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
                this.state.addedExplanationsList.length === 0
                ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}> Your Explanations </Text>
              </View>
                )
                :(
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.addedExplanationsList}
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