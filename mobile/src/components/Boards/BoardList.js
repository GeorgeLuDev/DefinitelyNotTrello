import React, { Component } from 'react';
import { Animated, FlatList, StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, TouchableHighlight, Button } from 'react-native';
import {ListItem, SearchBar, Overlay} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
//import { TabBar } from 'react-native-tab-view';



// import { TabView, SceneMap } from 'react-native-tab-view';

// const FirstRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );

// const SecondRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
// );

// const initialLayout = { width: Dimensions.get('window').width };

// export default function BoardList() {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   const renderTabBar = () => (
//     <TabBar
//   renderIcon={({ route, focused, color }) => (
//     <Icon
//       name={focused ? 'abums' : 'albums-outlined'}
//       color={color}
//     />
//   )}
// />
//   );
//   return (
//     <TabView
//       tabBarPosition='bottom'
//       navigationState={{ index, routes }}
//       renderTabBar={renderTabBar}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={initialLayout}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//   },
// });

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
    // this.deleteBoard();
    // this.updateBoard();
    // this.fetchUserData();
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
            backgroundColor: '#24a9ae',
            
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

  // getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('user_data');
  //     if(value !== null) {
  //       return value;
  //     }
  //     else{
  //       alert ('user not found');
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  fetchData = async () => {
    // alert("fetching data");
    // var user = this.getData();

    try 
    {
      var value = await AsyncStorage.getItem("user");
      if (value !== null)
      {
        value = JSON.parse(value);
        // console.log(value.id);
        // return value.id;
      }
    } 
    catch (e) 
    {
      console.log("Something went wrong in fetching the users data.");
    }

    // console.log("http://3.17.45.57/api/User/" + value.id);
    const response = await fetch("http://3.17.45.57/api/User/" + value.id , {method:'GET',headers:{'Content-Type': 'application/json'}});
    // const json = await response.json();
    var res = JSON.parse(await response.text());
    // console.log(res);
    // console.log(res.result[0]._id);
    this.setState({boards: res.result});
    // this.state.boards.map(boards => json.result);
    // console.log(this.state.boards);
    

  }

  addBoard = async () => 
  {
    // var user = this.getData();
    // var js = JSON.stringify({
    //   boardName: this.state.boardName.toString, 
    //   index: this.state.boards.length, 
    //   parentUsers: user.email 
    // });

    try 
    {
      var value = await AsyncStorage.getItem("user");
      if (value !== null)
      {
        value = JSON.parse(value);
        // console.log(value.id);
        // return value.id;
      }
    } 
    catch (e) 
    {
      console.log("Something went wrong in fetching the users data.");
    }

    var js = '{"boardName":"'+ this.state.boardName.toString() + '","index":"'+ this.state.boards.length + '","parentUsers":["'+ value.id +'"]}';
    
    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/CreateBoard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      this.setBoardName("");
      this.setIsVisible(false);
      this.componentDidMount();
    }
    catch(e)
    {

    }
  }


  deleteBoard = async (event,boardId) => 
  {
    var js = '{"_id":"'+ boardId + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/DeleteBoard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      console.log(res);
    }
    catch(e)
    {

    }
    this.componentDidMount();
  }

  updateBoard = async () => 
  {
    var js = '{"_id":"'+ "5f1b2f3d721f250ef417d283" + '","boardName":"' + "Testerrrr" + '"}';

    // console.log(js);
    try
    {
      // alert("here");
      const response = await fetch('http://3.17.45.57/api/UpdateBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});
      // alert("added successfully");
      // this.setBoardName("");
      // this.setIsVisible(false);
      // this.componentDidMount();
      var res = JSON.parse(await response.text());
      console.log(res);
    }
    catch(e)
    {

    }
  }
    
  navigate = async (event,boardId) => 
  {

    var board = {
      id: boardId
    };
    this.props.navigation.navigate("Board",{
      id: boardId
    });
    // try 
    // {
    //   await AsyncStorage.setItem(
    //     "board", JSON.stringify()
    //   );
    //   this.props.navigation.navigate("Board");
    // } 
    // catch (e) 
    // {
    //   alert("Something went wrong");
    // }
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

                <View style={{ width: 20, backgroundColor: '#24a9ae' }}></View>

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
            {/* {console.log("printing this.state.boards HERE:")} */}
            {/* {console.log(this.state.boards)} */}
            <FlatList
              data={this.state.boards}
              ListHeaderComponentStyle={{marginBottom: 5}}
              extraData={this.state}
              keyExtractor={(item) => item._id}
              renderItem={( {item} ) =>
                // <ListItem
                //   title={item.boardName}
                //   bottomDivider 
                // />

                <ListItem
                  Component={TouchableScale}
                  containerStyle={{
                    borderRadius: 10,
                    marginHorizontal: 5,
                    marginTop: 7,
                    
                    
                  }}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  linearGradientProps={{
                    colors: ['#14adb4', '#14cdd5'],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  leftAvatar={{ rounded: true, source: { uri: item.boardBackground } }}
                  title={item.boardName}
                  titleStyle={{ color: 'white', fontWeight: 'bold' }}
                  subtitleStyle={{ color: 'white' }}
                  chevron={{ color: 'white' }}
                  onPress={(e) => this.navigate(e, item._id)}
                  onLongPress={(e) => this.deleteBoard(e, item._id)}
                />
              }
              // ListHeaderComponent={this.renderHeader}

            />
          </View>
        </View>
      </View>
    );

  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 7
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
    backgroundColor: '#24a9ae', 
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
    backgroundColor: '#149499',  
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
    backgroundColor: "#24a9ae",
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


