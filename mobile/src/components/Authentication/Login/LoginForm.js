import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginForm extends Component {
 
  constructor() {
    super();
    this.state = {
        email: '', 
        password: ''
    }
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

  doLogIn = async () =>
    {
      // this.state.email.toString()  this.state.password.toString()

        var js = '{"email":"'+ "ccartalona@gmail.com" + '","password":"' + "password" +'"}';

        console.log(js);

      
      try{
            //  alert("calling Sign Up api");
            const response = await fetch('http://3.17.45.57/api/SignIn',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            

            // var resJSON = await response.json();

            // alert(JSON.stringify(resJSON));
            // console.log(resJSON);
            var json = await response.text();
            console.log(json);
            var res = JSON.parse(json);
            console.log(res);
            console.log(res.emailVerification);
            if (res.id === "-1")
            {
              alert("User/Password combination is incorrect.");
            }
            else if (res.emailVerification === 0)
            {
              alert("Please verify your email before signing in.");
            }
            else
            {
              var user = {
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName
              };
              try 
              {
                await AsyncStorage.setItem(
                  "user", JSON.stringify(user)
                );
                this.props.navigation.navigate("BoardList");
              } 
              catch (e) 
              {
                alert("Something went wrong");
              }
            }
            // if (resJSON.error === "")
            // {
            //     alert("Sign In Successful");
            //     this.storeData();
            //     this.props.navigation.navigate('BoardList');
            // }
            // else
            // {
            //     alert(resJSON.error);
            // }
          }
          catch(e){
            alert("there was an error");
             alert(e.toString());
          return;
          }
       
    }

  render() {
    return (
      

<KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >

<View style={styles.container}>

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
          />

        <TouchableOpacity onPress={() => this.props.navigation.navigate('PasswordRecovery')}>
                <Text style={styles.forgotPass}>
                Forgot Password
                </Text>
        </TouchableOpacity>
      


        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogIn()}>
                  <Text style={styles.buttonText}>
                    Log In
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