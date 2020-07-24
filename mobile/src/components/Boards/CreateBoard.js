import React, { Component } from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';


export default class CreateBoard extends Component {

  render() {
    return (
        <Overlay isVisible>
          <Text>Hello from Overlay!</Text>
        </Overlay>
    );
  }
}

