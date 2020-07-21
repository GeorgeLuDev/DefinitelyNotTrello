import React from 'react';
import { ImageBackground,StyleSheet,Text,View, TouchableOpacity, Button, Alert } from 'react-native';

function WelcomeScreen(){
    return(
        <View style ={styles.background}>
                <Text>
                    Welcome to the App.
                </Text>
            <TouchableOpacity>
                <Button title="Click here to login" onPress={() => Alert.alert("Damn boy he thicc!!")}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "dodgerblue",
        alignItems: "center",
        justifyContent: "center"
    },
})

export default WelcomeScreen;