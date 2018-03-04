/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import backgroundImage from 'images/biking.png'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type Props = {};
export default class Home extends Component<Props> {
  render() {
    console.log(this.props)
    return (
        <ImageBackground source={backgroundImage} resizeMode={'contain'} style={styles.container}>
          <Text style={styles.title}>Grow Together!</Text>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Active')}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Get Started
                </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.tip}>By continuing,you agree to our <Text style={styles.subTip}>Terms of Use & Privacy Policy</Text>.</Text>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:windowWidth,
    height:windowHeight,
    alignItems: 'center',
  },
  title:{
    fontSize:20,
    textAlign:'center',
    marginTop:80
  },
  tip:{
    position:'absolute',
    fontSize:12,
    textAlign:'center',
    bottom:20,
    color:'#999'
  },
  subTip:{
    color:'#333'
  },
  button:{
    position:'absolute',
    bottom:100,
    width:windowWidth*2/3,
    height:40,
    justifyContent:'center',
    backgroundColor:'#43BCD3',
    borderRadius:20
  },
  buttonText:{
    color: '#D9F1F5',
    textAlign: "center",
    fontSize:16,
    fontWeight:'bold'
  }
});
