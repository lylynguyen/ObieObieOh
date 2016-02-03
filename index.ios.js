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
  ListView,
  TextInput,
  TouchableHighlight
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');

var messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
// var messages = [];
var finance = [{bill: "Rent", total: "$200.00"}, {bill: "Electric", total: "$50.00"}];
var border = function(color) {
  return {
    borderWidth: 4,
    borderColor: color
  }
}

var App = React.createClass({
  getInitialState: function() {
    return {
      messages: messages,
      finance: finance,
    }
  },
  // addMessage: function(messageText) {
  //   console.log('adding message: ', messageText);
  //   this.state.messages.push({
  //     name: 'Justin',
  //     text: messageText
  //   })
  //   console.log(this.state.messages);
  //   this.setState({dataSource: this.state.dataSource.cloneWithRows(
  //     this._genRows(this._pressData)
  //   )});
  //   this.setState({
  //     messages: this.state.messages
  //   });
  // },
  render: function() {
    return (
      <View style={[styles.container]}>
        {/*<Navbar />
        <MessageContainer messages={this.state.messages} />*/}
        <ScrollableTabView>
          <MessageContainer messages={this.state.messages} tabLabel="Messages" />
          <FinanceContainer messages={this.state.finance} tabLabel="Finance" />
          <MessageContainer messages={this.state.messages} tabLabel="Chores" />
        </ScrollableTabView>
      </View>
    )
  }
});

var Form = React.createClass({
  getInitialState: function() {
    return {
      text: 'Hi'
    }
  },
  addMessage: function() {
    console.log('addMessage from form..', this.state.text);
    var messageObject = {name: 'Justin', text: this.state.text}
    console.log('this.state.text: ', this.state.text);
    this.props.sendMessage(messageObject);
  },
  sendMessageButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.addMessage}
      style={[styles.sendMessageButton]}
      >
      <Text>
        Send Message
      </Text>
    </TouchableHighlight>
  },
  render: function() {
    return (
      <View style={[styles.formTest, border('blue')]}>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          rejectResponderTermination={false}
          style={styles.textInput}
        />
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendMessageButton()}
        </View>
      </View>
    )
  }
});


var MessageContainer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      messages: messages,
      dataSource: ds.cloneWithRows(messages)
    };
  },
  sendMessage: function(messageObj) {
    this.state.messages.push(messageObj);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.messages),
      messages: this.state.messages
    })
  },
  renderMessageEntry: function(rowData) {
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <Text>
          Name: {rowData.name}
        </Text>
        <Text>
          Message: {rowData.text}
        </Text>
      </View>
    )
  },
  render: function() {
    return (
      <View style={[styles.messageContainer, border('red')]}>
        <Text style={styles.viewTitle}>Messages</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessageEntry}
        />
        <Form sendMessage={this.sendMessage} />
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
});


var FinanceForm = React.createClass({
  getInitialState: function() {
    return {
      bill: 'bill',
      total: '$200.00'
    }
  },
  addBill: function() {
    var financeObject = {bill: this.state.bill, total: this.state.total}
    this.props.sendBill(financeObject);
  },
  sendBillButton: function(){
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.addBill}
      style={[styles.sendMessageButton]}
      >
      <Text>
        Send Bill
      </Text>
    </TouchableHighlight>
  },
  render: function() {
    return (
      <View style={[styles.formTest, border('blue')]}>
      <Text>
        Bill:</Text>
        <TextInput
          onChangeText={(bill) => this.setState({bill})}
          value={this.state.bill}
          rejectResponderTermination={false}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(total) => this.setState({total})}
          value={this.state.total}
          rejectResponderTermination={false}
          style={styles.textInput}
        />
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendBillButton()}
        </View>
      </View>
    )
  }
});

var FinanceContainer = React.createClass({
  getInitialState: function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return  {
      finance: finance,
      dataSource: ds.cloneWithRows(finance)
    };
  },
  sendBill: function(financeObj){
    this.state.finance.push(financeObj);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.finance),
      finance: this.state.finance
    })
  },
  renderBillEntry: function(rowData) {
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <Text>
          Bill: {rowData.bill}
        </Text>
        <Text>
          Total Bill: {rowData.total}
        </Text>
      </View>
    )
  },
  render: function() {
    return (
      <View style={[styles.messageContainer, border('red')]}>
        <Text style={styles.viewTitle}></Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBillEntry}
        />
        <FinanceForm sendBill={this.sendBill} />
      </View>
    )
  }
});

// var FinanceEntry = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.messageEntry}>
//         <Text>{this.props.user}</Text>
//         <Text>{this.props.bill}</Text>
//         <Text>{this.props.total}</Text>
//       </View>
//     )
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#98DDDE',

  },
  navbar: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',


  },
  messageContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  form: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  formTest: {
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 280,
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  sendMessageButton: {
    borderWidth: 2,
    borderColor: '#00CC00',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
