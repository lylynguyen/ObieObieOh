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

var ScrollableTabView = require('react-native-scrollable-tab-view');

var messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
var finance = [{bill: "Rent", total: "$200.00"}, {bill: "Electric", total: "$50.00"}];

var bills = [{total: 200, name: 'rent', date: '2016-03-03'}, {total: 200, name: 'water', date: '2016-03-04'} ];

var billHistory = [{username: 'lyly', payer: 'Nick',total: 200, name: 'rent', date: '2016-03-03', datepaid: 'completed'}, {username: 'Justin', payer: 'Nick', total: 200, name: 'water', date: '2016-03-04', datepaid: 'completed'}];

var payments = [{username: 'lyly', payee: 'Nick',total: 200, name: 'rent', date: '2016-03-03', datepaid: null}, {username: 'Justin', payee: 'Nick', total: 200, name: 'water', date: '2016-03-04', datepaid: null}];


var users = ["Joey", "Justin", "Nick", "Lyly"];

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
      finance: finance
    }
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        {/*<Navbar />
        <MessageContainer messages={this.state.messages} />*/}
        <ScrollableTabView>
          <MessageContainer messages={this.state.messages} tabLabel="Messages" />
          <FinanceContainer finance={this.state.finance} tabLabel='Finance'/>
        </ScrollableTabView>
      </View>
    )
  }
});


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
          style={[styles.textInput]}
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
        <Text style={[styles.viewTitle]}>Messages</Text>
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      bills: bills,
      dataSource: ds.cloneWithRows(bills)
    }
  },

  render: function () {
    return (
      <View style={[styles.messageContainer, border('red')]}>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View>
            <Text>
              {rowData.name}
            </Text>
            <Text>
              {rowData.total}
            </Text>
          </View>
        )}
       />
      </View>
    );
  }
});

var PaymentContainer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      payments: payments,
      dataSource: ds.cloneWithRows(payments)
    };
  },

  render: function() {
    return (
      <View style={[styles.messageContainer, border('red')]}>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View>
            <Text>
              {rowData.username}
            </Text>
            <Text>
              {rowData.total}
            </Text>
          </View>
        )}
       />
      </View>
    );
  }
});


var FinanceContainer = React.createClass({
  getInitialState: function() {
    return {
      bills: bills,
      payments: payments,
      showBills: true,
      showPayments: false,
      showCreateBill: false
    }
  },
  toggleBills: function() {
    this.state.showPayments ? this.setState({showPayments: false}) : this.setState({showCreateBill: false})
    this.setState({showBills: !this.state.showBills})
  },

  togglePayments: function() {
    this.state.showBills ?  this.setState({showBills: false}) : this.setState({showCreateBill: false})
    this.setState({showPayments: !this.state.showPayments})
  },
  toggleCreateBills: function() {
    this.state.showPayments ? this.setState({showPayments: false}) : this.setState({showBills: false})
    this.setState({showCreateBill: !this.state.showCreateBill})
  },

 viewBillsButton: function() {
  return <TouchableHighlight underlayColor="gray"
    onPress={this.toggleBills}
  >
    <Text>Bills</Text>
    </TouchableHighlight>
 },

 viewPaymentsButton: function() {
  return <TouchableHighlight underlayColor="gray"
    onPress={this.togglePayments}
  >
    <Text>Payments</Text>
    </TouchableHighlight>
 },

  viewCreateBillButton: function() {
  return <TouchableHighlight underlayColor="gray"
    onPress={this.toggleCreateBills}
  >
    <Text>Create Bill</Text>
    </TouchableHighlight>
 },

 renderPayments: function() {
  if(this.state.showPayments){
    return (
      <PaymentContainer/>
    )
  }
 },

  // loadPayments: function() {
  //   fetch(process.env.Base_URL + '/payment/owed', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'token': AsyncStorage.getItem('obie')
  //     }
  //   })
  //   .then(function(payments) {
  //     this.setState({paymentsOwed: payments});
  //   })
  // },

 renderBills: function() {
  if(this.state.showBills) {
    return (
    <BillContainer/>
    )
  }
 },

//  loadBills: function() {
//   fetch(process.env.Base_URL + '/payment/pay', {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'token': AsyncStorage.getItem('obie')
//     }
//   })
//   .then(function(bills) {
//     this.state.bills = bills; 
//     this.setState({bills: this.state.bills});
//   })
// },

 renderCreateBill: function() {
  if(this.state.showCreateBill){
    return (
      <CreateBill/>
    )
  }
 },

  render: function() {
    return (
      <View style={[styles.finContainer, border('orange')]}>
        <View style={[styles.finBillPayContainer, border('purple')]}>
        {this.renderBills()}
        {this.renderPayments()}
        {this.renderCreateBill()}
        </View>
        <View style={[styles.finNavButtons, border('red')]}>
          <View>
            {this.viewBillsButton()}
          </View>
          <View>
            {this.viewPaymentsButton()}
          </View>
          <View>
            {this.viewCreateBillButton()}
          </View>
        </View>
      </View>
    )
  }
});

var DatePickerExample = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  },

  onDateChange: function(date) {
    this.setState({date: date});
    gDate = this.state.date;  
  },

  onTimezoneChange: function(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <DatePickerIOS
            date={this.state.date}
            mode="datetime"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
            minuteInterval={30}
            style={[{height: 320}]}
          />
        </View>
        <View
          style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30}}
          >
          <Text onPress={this.props.toggleClose}>Close</Text>
        </View>
      </View>
    );
  },
});

var CreateBill = React.createClass({
  getInitialState: function() {
    return {
      name:'',
      total:'',
      Date:'',
      showDate: false,
      showCustomSplit: false,
      users: users,
    }
  },

  toggleDate: function() {
    this.setState({showDate: !this.state.showDate})
  },

  renderDate: function() {
    if(this.state.showDate) {
      return <DatePickerExample/>
    }
  },
  // addBill: function(bill) {
  //   fetch(process.env.Base_URL + '/payment/bill', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'token': AsyncStorage.getItem('obie')
  //     },
  //     body: JSON.stringify(bill)
  //   })
  //   .then(function(id) {
  //     this.createPayments(id)
  //     this.loadBills();
  //     socket.emit('bill');
  //     })
  // },
  toggleCustomSplit: function() {
    this.setState({showCustomSplit: !this.state.showDate})
  },

  renderCustomSplit: function() {
    if(this.state.showCustomSplit) {
      return <CustomSplitContainer/>
    }
  },

  render: function() {
    //Due date, on press need to render date picker
    return (
    <View>
      <Text>Bill: </Text>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.choreName}
          rejectResponderTermination={false}
          style={styles.textInput}/>
        {this.renderDate()}
      <Text>Total: </Text>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.choreName}
          rejectResponderTermination={false}
          style={styles.textInput}/>
        <TouchableHighlight onPress={this.toggleDate}>
          <Text>Due Date</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>Split Evenly</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.toggleCustomSplit}>
          <Text>Custom Split</Text>
        </TouchableHighlight>
        {this.renderCustomSplit()}
    </View>
    )
  }
});

var CustomSplitContainer = React.createClass({

  render: function() {
  var userlist = users.map(function(user) {
    return (
      <View>
      <Text>{user}: </Text>
      <TextInput
       // onChangeText={(userTotal) => this.setState({userTotal})}
          // value={this.state.choreName}
          rejectResponderTermination={false}
          style={styles.textInput}
      />
      </View>
    )
  });
    return (
      <View>
        <View>{userlist}</View>
        <TouchableHighlight>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
})

const styles = StyleSheet.create({

  finContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  finBillPayContainer: {
    flex: 9,
    alignItems: 'center'
  },
  finNavButtons: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
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

  form: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  formTest: {
    justifyContent: 'center',
    alignItems: 'stretch'
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
    alignItems: 'stretch'
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
  }
});

AppRegistry.registerComponent('ObieObieOh', () => App);
