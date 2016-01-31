/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var messages = [{name: "Justin", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
var border = function(color) {
  return {
    borderWidth: 4,
    borderColor: color
  }
}

var App = React.createClass({
  getInitialState: function() {
    return {
      messages: messages
    }
  },
  render: function() {
    return (
      <View style={[styles.container, border('black')]}>
        <Navbar />
        <MessageContainer />
        <View style={[styles.form, border('blue')]}>
          <Text>Form Goes Here</Text>
        </View>

      </View>
    )
  }
});

var Navbar = React.createClass({
  render: function() {
    return (
      <View style={[styles.navbar, border('green')]}>
        <Text>Navbar</Text>
      </View>
    )
  }
})

var MessageContainer = React.createClass({
  render: function() {
    // var messageList = this.props.messages.map(function(message, index) {
    //   return <MessageEntry message={message} key={index} />
    // });
    return (
      <View style={[styles.messageContainer, border('red')]}>
        <Text style={styles.viewTitle}>Messages</Text>

      </View>
    )
  }
});

var MessageEntry = React.createClass({
  render: function() {
    return (
      <View style={styles.messageEntry}>
        <Text>{this.props.user}</Text>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  navbar: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ObieObieOh', () => App);
