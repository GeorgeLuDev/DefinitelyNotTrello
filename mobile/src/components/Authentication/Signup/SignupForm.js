import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class SignupForm extends Component {
 
  constructor() {
    super();
    this.state = {
        firstName: '', 
        lastName: '',
        email: '', 
        password: ''
    }
  }

  setFirstName = (name) => {
    this.setState({'firstName' : name})
  }
  setLastName = (lastName) => {
    this.setState({'lastName' : lastName})
  }
  setEmail = (email) => {
    this.setState({'email' : email})
  }
  setPassword = (password) => {
    this.setState({'password' : password})
  }

  storeData = async () =>
   {
    try {
      //const jsonValue = JSON.stringify(this.state)
      await AsyncStorage.setItem('user_data', this.email);
    } catch (e) {
      alert("error saving data");
    }
  }

  doSignUp = async () =>
    {

        var js = '{"firstName":"'+ this.state.firstName.toString() + '","lastName":"'+ this.state.lastName.toString() + '","email":"'+ this.state.email.toString() + '","password":"' + this.state.password.toString() +'"}';

        console.log(js);

      
      try{
             alert("calling Sign Up api");
            const response = await fetch('http://3.17.45.57/api/SignUp',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            

            var resJSON = await response.json();

            alert(JSON.stringify(resJSON));

            if (resJSON.error === "")
            {
                alert("Sign Up Successful");
                // this.storeData();
                this.props.navigation.navigate('Login');
            }
            else
            {
                alert(resJSON.error);
            }
          }
          catch(e){
            alert("there was an error");
             alert(e.toString());
          return;
          }
       
    }

    _scrollToInput (reactNode) {
      // Add a 'scroll' ref to your ScrollView
      this.scroll.props.scrollToFocusedInput(reactNode)
    }

  render() {
    return (

      <KeyboardAwareScrollView
      style={{ backgroundColor: '#24a9ae' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      extraHeight={10}
      
    >

      <View style={styles.container}>

        <TextInput 
        
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(firstName) => this.setFirstName(firstName)}
        />

        <TextInput
           style={styles.input}
           placeholder="Last Name"
           placeholderTextColor="rgba(255, 255, 255, 0.7)"
           onChangeText={(lastName) => this.setLastName(lastName)}
          />

        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(email) => this.setEmail(email)}
        />

        <TextInput
          
           style={styles.input}
           placeholder="Password"
           placeholderTextColor="rgba(255, 255, 255, 0.7)"
           onChangeText={(password) => this.setPassword(password)}
           secureTextEntry={true}
          />

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doSignUp()}>
                  <Text style={styles.buttonText}>
                    Sign Up
                  </Text>
        </TouchableOpacity>

      </View>
      </KeyboardAwareScrollView>
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
  }
})