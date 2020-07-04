import React, { Component } from 'react';
import {  StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default class AuthenticationScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity>
          <Text>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  }, 
  buttonContainer: {
    flex: 1,
    
  }
})