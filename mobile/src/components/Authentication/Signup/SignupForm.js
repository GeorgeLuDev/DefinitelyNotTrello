import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

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

  doSignUp = async () =>
    {
        //alert("doSignUp called");

        var js = '{"firstName":"'+ this.state.firstName.toString() + '","lastName":"'+ this.state.lastName.toString() + '","email":"'+ this.state.email.toString() + '","password":"' + this.state.password.toString() +'"}';

        console.log(js);

        // const data = js;
        
        // const xhr = new XMLHttpRequest()
        // xhr.withCredentials = true
        
        // xhr.addEventListener('readystatechange', function() {
        //   if (this.readyState === this.DONE) {
        //     console.log(this.responseText)
        //   }
        // })
        
        // xhr.open('POST', 'localhost:5000/api/SignUp')
        // xhr.setRequestHeader('content-type', 'application/json')
        
        // xhr.send(data)
        // console.log(xhr.responseText)

        //alert("calling Sign Up api");

        // try
        // {
            // const response = await fetch('localhost:5000/api/SignUp',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      try{
             alert("calling Sign Up api");
            const response = await fetch('3.17.45.57/api/test',{method:'GET'});

            

            var resJSON = await response.json();

            //alert(JSON.stringify(resJSON));

            if (resJSON.error === "")
            {
                alert("Sign Up Successful");
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
        // }
        // catch(e)
        // {
        //     // alert("there was an error");
        //     // alert(e.toString());
        //     return;
        // }
    }

  render() {
    return (
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
          />

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doSignUp()}>
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
    backgroundColor: '#2980b9', 
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