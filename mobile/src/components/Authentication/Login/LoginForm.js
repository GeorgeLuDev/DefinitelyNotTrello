import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default class LoginForm extends Component {
 
  render() {
    return (
      <View style={styles.container}>

        <TextInput 
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />

        <TextInput
           style={styles.input}
           placeholder="Password"
           placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    alignItems: 'stretch', 
    padding: 15

  }, 
  input: {
    height: 40, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom:  20, 
    color: '#fff', 
    paddingHorizontal: 10
    
  }
})