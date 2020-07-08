import React, { Component } from 'react';
import {  StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'


export default class AuthenticationScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>
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
    flexDirection: 'row',
    backgroundColor: '#3498db', 
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    paddingHorizontal: 20
  }, 
  buttonContainer: {
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    height: 50,
    width: 130,
    backgroundColor: '#2980b9', 
    marginBottom: 40, 
    paddingVertical: 15

  },
  buttonText: {
    textAlign: 'center', 
    color: '#FFFFFF',
    fontWeight: '700'
  }
  
});