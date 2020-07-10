import React, { Component } from 'react';
import {  StyleSheet, View, Text } from 'react-native';


export default class BoardList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>

        </View>

        <View style={styles.formContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }, 
  formContainer: {
    flex: 1,
    
  }
})
