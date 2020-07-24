import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight } from 'react-native';
import {ListItem, SearchBar, Overlay} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
 

export default class BoardList extends Component {

  constructor() {
    super();
    this.state = {
        boards: [], 
        boardName: '',
        newboardindex: '',
        oldboardindex: '',
        isVisible: false,

    };
    
  }


  setIsVisible = (bool) => {
    this.setState({'isVisible' : bool})
  }

  componentDidMount() {
    this.fetchData();
    this.props.navigation.setOptions(
      {
          title: 'Boards',
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 20
              }}
              onPress={() => this.setIsVisible(true)}>

            <Entypo name="plus" size={34} color="white" />
              </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#4b414a',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center'
          }
        }

    );
  }

  setBoardName = (name) => {
    this.setState({'boardName' : name})
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if(value !== null) {
        return value;
      }
      else{
        alert ('user not found');
      }
    } catch(e) {
      // error reading value
    }
  }

  fetchData = async () => {
    alert("fetching data");
    var user = this.getData();
    const response = await fetch("http://3.17.45.57/api/User/" + "5f173bea05435aca02d81909" , {method:'GET',headers:{'Content-Type': 'application/json'}});
    // const json = await response.json();
    var res = JSON.parse(await response.text());
    // console.log(res.result[0]._id);
    this.setState({boards: res.result});
    // this.state.boards.map(boards => json.result);
    // console.log(this.state.boards);
    

  }

  addBoard = async () => 
  {
    var user = this.getData();
    // var js = JSON.stringify({
    //   boardName: this.state.boardName.toString, 
    //   index: this.state.boards.length, 
    //   parentUsers: user.email 
    // });

    var js = '{"boardName":"'+ this.state.boardName.toString() + '","index":"'+ this.state.boards.length + '","parentUsers":"'+ "5f173bea05435aca02d81909" +'"}';

    console.log(js);
    try
    {
      alert("here");
      const response = await fetch('http://3.17.45.57/api/CreateBoard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      alert("added successfully");
      this.setBoardName("");
      this.setIsVisible(false);
      this.componentDidMount();
    }
    catch(e)
    {

    }
    }
    
    
    
  

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round></SearchBar>
  }

   renderItem = ({ item }) => {

    return (
      <Text>{item.boardName}</Text>
    );
  }

  render() {

    return (

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
        >
          <View style={styles.centeredView}>

            <View style={styles.modalView}>
              <TextInput
                style={styles.overlayInput}
                
                  // {console.log(this.state.boards)}
                onChangeText={(name) => this.setBoardName(name)}
                placeholder="Board Name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"

              />
              {/* {this.state.boards.map(board =>
                <Text>{board.boardName}</Text>) } */}
              <View style={styles.overlayButtonContainer}>

                <TouchableOpacity style={styles.overlayButton} onPress={() => this.setIsVisible(false)}>
                  <Text style={styles.overlayButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <View style={{ width: 20 }}></View>

                <TouchableOpacity style={styles.overlayButton} onPress={() => this.addBoard()}>
                  <Text style={styles.overlayButtonText}>
                    Add
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        <View >

          <View>
            {console.log("printing this.state.boards HERE:")}
            {console.log(this.state.boards)}
            <FlatList
              data={this.state.boards}
              extraData={this.state}
              keyExtractor={(item) => item._id}
              renderItem={( {item} ) =>
                <ListItem
                  title={item.boardName}
                  bottomDivider 
                />
                }
              ListHeaderComponent={this.renderHeader}

            />

      {/* <FlatList
        data={this.state.boards}
        renderItem={this.renderItem}
        keyExtractor={(item) => item}
      /> */}

              {/* {this.state.boards.map(board =>
                <Text>{board.boardName}</Text>) } */}
          </View>
        </View>
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


