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
  TouchableHighlight,
  Switch,
  SliderIOS,
  PickerIOS,
  DatePickerIOS,
} from 'react-native';

var Form = require('react-native-form')

var ScrollableTabView = require('react-native-scrollable-tab-view');

var messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
var finance = [{bill: "Rent", total: "$200.00"}, {bill: "Electric", total: "$50.00"}];

var bills = [{username: 'lyly', payer: 'Nick',total: 200, name: 'rent', duedate: '2016-03-03', datepaid: null}, {username: 'Justin', payer: 'Nick', total: 200, name: 'water', duedate: '2016-03-04', datepaid: null} ];

var billHistory = [{username: 'lyly', payer: 'Nick',total: 200, name: 'rent', duedate: '2016-03-03', datepaid: 'completed'}, {username: 'Justin', payer: 'Nick', total: 200, name: 'water', duedate: '2016-03-04', datepaid: 'completed'}];

var paymentOwed = [{username: 'lyly', payee: 'Nick',total: 200, name: 'rent', duedate: '2016-03-03', datepaid: null}, {username: 'Justin', payee: 'Nick', total: 200, name: 'water', duedate: '2016-03-04', datepaid: null}];


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
      bills: bills
    }
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        {/*<Navbar />
        <MessageContainer messages={this.state.messages} />*/}
        <ScrollableTabView>
          <MessageContainer messages={this.state.messages} tabLabel="Messages" />
          <FinanceContainer finance={this.state.finance} tabLabel="Finance" />
        </ScrollableTabView>
      </View>
    )
  }
});

//<BillContainer bills={this.state.bills} tabLabel="Create Bill"/>

var MessageForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
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
        <MessageForm sendMessage={this.sendMessage} />
      </View>
    )
  }
});

var BillContainer = React.createClass({
  getInitialState: function() {
    return{

      username: '',
      name: '',
      payer: '',
      total: '',
      duedate: '2016-03-16',
      datepaid: ''
    }
  },

  addBill: function() {
    var billObject = {username: this.state.username, payer: this.state.payer, total: this.state.total, name: this.state.name, duedate: this.state.duedate, datepaid: null};
    this.props.sendBill(billObject);
  },

   sendBillButton: function() {
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
    return  (
      <View style={[styles.formTest, border('blue')]}>
        <Form ref="form">
        <TextInput name="username" placeholder="Name, email, phone number"
        keyboardType='default'
        style={{height: 40, paddingLeft: 10, textAlign: 'justify'}}/>
      </Form>
         <Text>Bill: </Text>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          style={styles.textInput}
        />
         <Text>Payer: </Text>
        <TextInput
          onChangeText={(payer) => this.setState({payer})}
          value={this.state.payer}
          style={styles.textInput}
        />
        <Text>Total: </Text>
        <TextInput
          onChangeText={(total) => this.setState({total})}
          value={this.state.total}
          style={styles.textInput}
        />
        <Text>Payer: </Text>
        <TextInput
          onChangeText={(duedate) => this.setState({duedate})}
          value={this.state.duedate}
          style={styles.textInput}
        />
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendBillButton()}
        </View>
      </View>
    )
  },
});

var BillEntry = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      bills: bills,
      dataSource: ds.cloneWithRows(bills)
    };
  },
  sendBill: function(billObj) {
    this.state.bills.push(billObj);
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.bills),
      bills: this.state.bills
    })
  },

  renderBillEntry: function(rowData) {
    return (
      <View style={[styles.messagesEntry, border('blue')]}>
        <TouchableHighlight
          underlayColor="gray"
          onPress={this.payBill}
          >
        <Text>{rowData.payer} owes
        {rowData.username}
        {rowData.total} for
        {rowData.name} due on {rowData.duedate} </Text>
        </TouchableHighlight>
      </View>
    )
  },

  render: function() {
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBillEntry}
        />
      </View>
    )
  }
  //need to move the submit/send bill function to pay/request container
})

var FinanceContainer = React.createClass({
    getInitialState: function() {
    return{
      username: '',
      name: '',
      payer: '',
      total: '',
      duedate: '2016-03-16',
      datepaid: ''
    }
  },

  addBill: function() {
    var billObject = {username: this.state.username, payer: this.state.payer, total: this.state.total, name: this.state.name, duedate: this.state.duedate, datepaid: null};
    this.props.sendBill(billObject);
  },

   sendBillButton: function() {
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
      <View style ={[styles.messageContainer, border('black')]}>
        <Text style={styles.viewTitle}> Bills</Text>
        <View>
          <BillEntry />
        </View>
        <Text style={styles.viewTitle}> Payment Owed to You</Text>
        <View>
          <PaymentOwedEntry />
        </View>

        <View>
         <Text>Bill:</Text>
        <TextInput
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          style={styles.textInput}
        />
         <Text>Payer: </Text>
        <TextInput
          onChangeText={(payer) => this.setState({payer})}
          value={this.state.payer}
          style={styles.textInput}
        />
        <Text>Total: </Text>
        <TextInput
          onChangeText={(total) => this.setState({total})}
          value={this.state.total}
          style={styles.textInput}
        />
        <Text>Payer: </Text>
        <TextInput
          onChangeText={(duedate) => this.setState({duedate})}
          value={this.state.duedate}
          style={styles.textInput}
        />
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendBillButton()}
        </View>
        </View>
      </View>
    )
  }
});

var PaymentOwedEntry = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      paymentOwed: paymentOwed,
      dataSource: ds.cloneWithRows(paymentOwed)
    };
  },
  render: function () {
    return (
      <View style={[styles.messagesEntry, border('blue')]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.username} owes {rowData.username} {rowData.total} for {rowData.name} due on {rowData.duedate}</Text>}
        />
      </View>
    )
  }
});

var payBill; //function to pay 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',

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
  messageform: {
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
