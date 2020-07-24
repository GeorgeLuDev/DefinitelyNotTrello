import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Button } from 'react-native';
import {ListItem, SearchBar, Overlay} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
 

export default class BoardList extends Component {

  constructor() {
    super();
    this.state = {
        boards: [], 
        boardName: '',
        newboardindex: '',
        oldboardindex: '',
        isVisible: false,
        lists: [],
        cards: []

    };
    
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {

    try 
    {
      var value = await AsyncStorage.getItem("board");
      if (value !== null)
      {
        value = JSON.parse(value);
        // console.log(value.id);
      }
    } 
    catch (e) 
    {
      console.log("Something went wrong in fetching the boards data");
    }


    console.log("http://3.17.45.57/api/Board/" + value.id);
    const response = await fetch("http://3.17.45.57/api/Board/" + value.id , {method:'GET',headers:{'Content-Type': 'application/json'}});
    var res = JSON.parse(await response.text());
    console.log(res);
    this.setState(
        {
            lists: res.listString,
            cards: res.cardString
        } );
    // console.log(this.state.boards);

  }

  render() {

    return (
        <View>
            
                
                {this.state.lists.map(list =>
                <View>
                    <Text>
                        {list.listName}
                        {this.state.cards[list.index].map(card =>
                            
                                <Text>
                                    {card.cardName}
                                </Text>
                            
                            )}
                    </Text>
                </View>)}
                
        </View>
    );

  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }, 
  overlayContainer: {
    // height: '80%',
    // width: '80%'
  },
  overlayInput: {
    height: 40,
    width: 250,
    borderWidth: 1.5, 
    borderRadius: 3,
    marginBottom: 20,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff', 
    paddingHorizontal: 10
    
  },
  overlayButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#3498db', 
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    paddingHorizontal: 0
  }, 
  overlayButton: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    height: 40,
    width: 70,
    backgroundColor: '#2980b9',  
    paddingVertical: 15

  },
  overlayButtonText: {
    textAlign: 'center', 
    textAlignVertical: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    flexDirection: "column",
    justifyContent: 'flex-end',
    backgroundColor: "#3498db",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})


