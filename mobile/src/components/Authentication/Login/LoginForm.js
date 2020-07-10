import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

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

        <TouchableOpacity>
          <Text style={styles.forgotPass}>
          Forgot Password
          </Text>
        </TouchableOpacity>
      


        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text style={styles.buttonText}>
                    Log In
                  </Text>
        </TouchableOpacity>

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
    marginBottom:  10, 
    marginTop: 2,
    color: '#fff', 
    paddingHorizontal: 10
    
  }, 
  buttonContainer: {
    alignSelf: 'center',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    justifyContent: 'center',
    height: 50,
    width: 170,
    backgroundColor: '#2980b9', 
    marginTop: 40,
    marginBottom: 40, 
    paddingVertical: 15

  },
  buttonText: {
    textAlign: 'center', 
    color: '#FFFFFF',
    fontWeight: '700'
  }, 
  forgotPass: {
    paddingHorizontal: 5,
    color: '#FFFFFF',
    textDecorationLine: 'underline'
  }
})