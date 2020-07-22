import React, { Component } from 'react';
import {  StyleSheet, View, Text } from 'react-native';

import SignupForm from './SignupForm';

export default class Signup extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>

        </View>

        <View style={styles.formContainer}>
            <SignupForm navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  }, 
  formContainer: {
    flex: 1,
    
  }
})
