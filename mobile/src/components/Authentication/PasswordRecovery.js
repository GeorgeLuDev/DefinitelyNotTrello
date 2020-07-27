import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class PasswordRecovery extends Component {
 
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text1}>Can't log in?</Text>
        
        <View style={styles.text2}>
          <Text >We'll send a recovery link to</Text>
       </View>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />      


        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text style={styles.buttonText}>
                    Send Recovery Link
                  </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24a9ae',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'stretch', 
    padding: 15

  }, 
  input: {
    height: 45, 
    marginBottom:  10, 
    marginTop: 2,
    paddingHorizontal: 10,
    borderWidth: 1.5, 
    borderRadius: 3,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff', 
    
  }, 
  buttonContainer: {
    alignSelf: 'center',
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#FFF',
    justifyContent: 'center',
    height: 50,
    width: 170,
    backgroundColor: '#149499', 
    marginTop: 40,
    marginBottom: 40, 
    paddingVertical: 15

  },
  buttonText: {
    textAlign: 'center', 
    color: '#FFFFFF',
    fontWeight: '700'
  }, 
  text1: {
    alignSelf: 'center',
    fontFamily: 'sans-serif-medium',
    color: 'white',
    fontSize: 22,
    marginBottom: 30
  }, 
  text2: { 
    marginLeft: 2,
    marginBottom: 5,
  }
})