import React, { Component } from 'react';
import {  StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default class AuthenticationScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3498db',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 10
  }, 
  buttonContainer: {
    backgroundColor: '#2980b9',
    justifyContent: 'space-around',
    width: 130,
    height: 50,
    marginBottom: 20
    
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});