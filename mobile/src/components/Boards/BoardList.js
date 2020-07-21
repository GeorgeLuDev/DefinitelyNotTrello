import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements'
 

export default class BoardList extends Component {

  constructor() {
    super();
    this.state = {
        data: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await fetch("http://3.17.45.57/api/test");
    const json = await response.json();
    this.setState({data: json.results});

  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round></SearchBar>
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
            <FlatList 
              data={this.state.data} 
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => 
              <ListItem
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item.name.first} ${item.name.last}`}
              bottomDivider
            />}
            ListHeaderComponent = {this.renderHeader}

            />
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
  
})
