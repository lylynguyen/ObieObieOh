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
  Dimensions,
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');

var messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
var finance = [{bill: "Rent", total: "$200.00"}, {bill: "Electric", total: "$50.00"}];

var bills = [{total: 200, name: 'rent', date: '2016-03-03'}, {total: 200, name: 'water', date: '2016-03-04'} ];

var billHistory = [{username: 'lyly', payer: 'Nick',total: 200, name: 'rent', date: '2016-03-03', datepaid: 'completed'}, {username: 'Justin', payer: 'Nick', total: 200, name: 'water', date: '2016-03-04', datepaid: 'completed'}];

var payments = [{username: 'lyly', payee: 'Nick',total: 200, name: 'rent', date: '2016-03-03', datepaid: null}, {username: 'Justin', payee: 'Nick', total: 200, name: 'water', date: '2016-03-04', datepaid: null}];

var billSplit = [];
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
      <View style={border('black')}>
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
  getInitialState: function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      bills: bills,
      dataSource: ds.cloneWithRows(bills)
    }
  },

  renderBillEntry: function(rowData){
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <Text style={{padding: 2}}>
          Bill Name: {rowData.name}
        </Text>
        <Text style={{padding: 2}}>
          Total: {rowData.total}
        </Text>
        <Text style={{padding: 2}}>
        Due Date: {rowData.date}
        </Text>
      </View>
    )
  },

  render: function() {
    return (
      <View style={[styles.paymentContainer, border('red')]}>
        <Text style={styles.viewTitle}>Bills</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBillEntry}
        />
      </View>
    )
  }
})


var PaymentContainer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      payments: payments,
      dataSource: ds.cloneWithRows(payments)
    }
  },

  renderPaymentEntry: function(rowData){
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <Text style={{padding: 2}}>
          User: {rowData.username}
        </Text>
        <Text style={{padding: 2}}>
          Total: {rowData.total}
        </Text>
        <Text style={{padding: 2}}>
          Date: {rowData.date}
        </Text>
      </View>
    )
  },

  render: function(){
    return (
      <View style={[styles.paymentContainer, border('black')]}>
        <Text style={styles.viewTitle}>Payments</Text>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPaymentEntry}
        />
      </View>
    )
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


 renderBills: function() {
  if(this.state.showBills) {
    return (
    <BillContainer/>
    )
  }
 },

 renderCreateBill: function() {
  if(this.state.showCreateBill){
    return (
      <CreateBill sendBill = {this.sendBill} />
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
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
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
      <View>
        <View>
          <DatePickerIOS
            date={this.state.date}
            mode="datetime"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
            minuteInterval={30}
            style={[{flex: 1, alignItems: 'stretch'}, border('black')]}
          />
        </View>
        <View
          style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30}}>
          <Text onPress={this.props.toggleClose }>Close</Text>
        </View>
      </View>
    );
  },
});
var gDate;

var CreateBill = React.createClass({
  getInitialState: function() {
    return {
      name:'',
      total:'',
      date: gDate,
      bills: bills,
      showDate: false,
      showCustomSplit: false,
      splitEvenly: false
    }
  },

  toggleDate: function() {
    this.setState({showDate: !this.state.showDate})
  },

  renderDate: function() {
    if(this.state.showDate) {
      return <DatePickerExample toggleClose={this.toggleClose}/>
    }
  },

  setDateButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.toggleDate}
      style={border('black')}>
      <Text>Set Date</Text>
    ></TouchableHighlight>
  },

  addBill: function() {
    var billObject = {
      name: this.state.name,
      total: this.state.total,
      date: gDate,
    }
    bills.push(billObject);
  },

  // sendBillButton: function() {
  //   return <TouchableHighlight 
  //   underlayColor='gray'
  //   onPress={this.addBill}><Text>Submit Bill</Text>
  //   </TouchableHighlight>
  // },

  toggleCustomSplit: function() {
    this.setState({showCustomSplit: !this.state.showCustomSplit})
  },

  toggleClose: function() {
    if(this.state.showDate) {
      this.setState({showDate: !this.state.showDate})
    }
    if(this.state.showCustomSplit) {
      this.setState({showCustomSplit: !this.state.showCustomSplit})
    }
  },

  renderBillInput: function() {
    return (
    <View style={{padding: 15}}>
      <Text>Bill:</Text>
      <TextInput
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        rejectResponderTermination={false}
        style={styles.textInput}
      />
    </View>
    )
  },

  renderTotalInput: function() {
    return (
      <View>
        <Text style={{paddingLeft: 15}}>Total:</Text>
        <TextInput
          onChangeText={(total) => this.setState({total})}
          value={this.state.total}
          rejectResponderTermination={false}
          style={styles.textInput}/>
      </View>
    )
  },

  renderCustomSplit: function() {
    if(this.state.showCustomSplit) {
      return <CustomSplitContainer toggleClose={this.toggleClose}/>
    }
  },

  renderDateInput: function(){
    return (
        <TouchableHighlight
        style={{
            borderColor: 'green', 
            borderRadius: 10, 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingLeft: 15, paddingTop:10}}
         underlayColor="gray" onPress={this.toggleDate} >
          <Text>Select Date</Text>
        </TouchableHighlight>
    )
  },

  renderSplitEvenlyButton: function(){
    return (
      <TouchableHighlight 
        onPress={this.addBill} underlayColor="gray">
        <Text>Split Evenly</Text>
      </TouchableHighlight>
    )
  },

  renderCustomSplitButton: function() {
    return (
      <TouchableHighlight underlayColor="gray" onPress={this.toggleCustomSplit}>
        <Text>Custom Split</Text>
      </TouchableHighlight>
    )
  },

  addBillandClose: function(){
    return (
      <View>
        {this.addBill}
        {this.toggleClose}
      </View>
    )
  },

  render: function() {
    return (
      <View>
        <View>
          {this.renderBillInput()}
        </View>
        <View>
          {this.renderTotalInput()}
        </View>
        <View style={{padding: 10}}>
          {this.renderDateInput()}
        </View>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <View>{
          this.renderSplitEvenlyButton()}
          </View>
          <View>
          {this.renderCustomSplitButton()}
          </View>
        </View>
        <View style={{padding:10}}>{this.renderCustomSplit()}</View>
        <View style={{paddingTop: 10}}>{this.renderDate()}</View>
      </View>
    )
  }
});

var CustomSplitContainer = React.createClass({
  render: function() {
  var userlist = users.map(function(user) {
    return (
      <View>
      <Text style={{padding: 2}}>{user}: </Text>
      <TextInput
          rejectResponderTermination={false}
          style={styles.textInput}
      />
      </View>
    )
  });
    return (
      <View>
        <View style={{padding: 1}}>{userlist}</View>
        <TouchableHighlight>
          <Text style={{padding: 1}} underlayColor="gray" onPress={this.props.addBillandClose}>Submit</Text>
        </TouchableHighlight>
        <View style={{alignItems: 'center'}}>
         <Text underlayCoor="gray" onPress={this.props.toggleClose}>Close</Text>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  splitForm: {
    justifyContent: 'flex-end'
  },
  finContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  finBillPayContainer: {
    flex: 9,
    alignItems: 'stretch'
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
    alignItems: 'center'
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
