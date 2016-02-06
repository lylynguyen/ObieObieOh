
'use strict';
import React, {
  DatePickerIOS,
  AsyncStorage,
  Modal,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Fetch,
  View,
  Picker,
  ListView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

// import Modal from 'react-native-modal';

import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-dropdown';
  

import {createStore} from 'redux';

var ScrollableTabView = require('react-native-scrollable-tab-view');

var messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
// var messages = [];
var chores = [
  {category: 'kitchen', name: 'Joey', choreName: 'eat the cheese'}, 
  {category: 'Bathroom', name: 'Justin', choreName: 'buy new stall for HR'}
]

var users = ["Joey", "Justin", "Nick", "Lyly"];

var gDate; 
var gUser;
var gCategory;

var Base_URL = "http://localhost:8081" 

var border = function(color) {
  return {
    borderWidth: 4,
    borderColor: color
  }
}

var App = React.createClass({
  getInitialState: function() {
    this.test()
    return {
      chores: chores,
      messages: messages,
      users: users
    }
  },

  test: function() {
    fetch(process.env.Base_URL + '/dummy', {
      method: 'GET',
      headers: {
        //at some point will need to set token on AsynchSt.
        //which acts just as local storage did. Async Storage
        //is promisified, but don't think we need here b/c 
        //we're only retrieving the value
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(res) {
      //update state users array with response
      console.log('got here', res); 
    })
  },

  render: function() {
    return (
      <View style={[styles.container, border('black')]}>
        {/*<Navbar />
        <MessageContainer messages={this.state.messages} />*/}
        <ScrollableTabView>
          <MessageContainer messages={this.state.messages} tabLabel="Messages" />
          <DatePickerExample date={this.state.date} tabLabel="Date Picker" />
          <ChoreContainer chores={this.state.chores} tabLabel="Chores" />
        </ScrollableTabView>
      </View>
    )
  }
});

var Form = React.createClass({
  getInitialState: function() {
    return {
      text: 'hi'
    }
  },

  addMessage: function() {
    var messageObject = {name: 'Justin', text: this.state.text}
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
      <View>
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

var UserDrop = React.createClass({
  getInitialState: function() {
    return {
      user: ''
    };
  },

  componentDidMount: function() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  }, 

  _getOptionList: function() {
    return this.refs['OPTIONLIST'];
  }, 

  user: function(user) {
    this.setState({
      user: user
    });
    gUser = user; 
  },

  render: function() {
    return (
      <View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 320}}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="Select a User"
            onSelect={this.user}>
            <Option>Joey</Option>
            <Option>Lyly</Option>
            <Option>Nick</Option>
            <Option>Justin</Option>
          </Select>
          <View style={{ height: 10 }}/>
          <Text>Selected User: {this.state.user}</Text>
          <OptionList ref="OPTIONLIST"/>
        </View>
        <View 
          style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30}}
          >
          <Text onPress={this.props.toggleClose}>Close</Text>
        </View>
      </View>
    )
  }

});

var CategoryDrop = React.createClass({
  getInitialState: function() {
    return {
      category: ''
    };
  },

  componentDidMount: function() {
    updatePosition(this.refs['SELECT2']);
    updatePosition(this.refs['OPTIONLIST']);
  }, 

  _getOptionList: function() {
    return this.refs['OPTIONLIST'];
  }, 

  category: function(category) {
    this.setState({
      category: category
    });
    gCategory = category
  }, 

  render: function() {
    return (
      <View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 320 }}>
          <Select
            width={250}
            ref="SELECT2"
            optionListRef={this._getOptionList}
            defaultValue="Select a Category"
            onSelect={this.category}>
            <option>Kitchen</option>
            <option>Bathroom</option>
            <option>Livingroom</option>
            <option>Bedroom</option>
            <option>Laundry</option>
            <option>Yard</option>
          </Select>
          <View style={{ height: 20 }}></View>
          <Text>Selected Category: {this.state.category}</Text>
          <OptionList ref="OPTIONLIST"/>
        </View>
        <View 
          style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30}}
          >
          <Text onPress={this.props.toggleClose}>Close</Text>
        </View>
      </View>
    );
  }
});



var ChoreForm = React.createClass({
  getInitialState: function() {
    console.log('CHORE FORM', this);
    return {
      //need the text that the user inputs for choreName
      choreName: 'hola',
      //need the user who will perform the chore
      user: '',
      category: '',
      date: '',
      chores: chores,
      showStatus: false,
      showDate: false, 
      showUser: false,
      showCategory: false,
      showClose: false
    }
  },

  renderDate: function() {
    if(this.state.showDate) {
      return <DatePickerExample toggleClose={this.toggleClose}/>
    }
  },

  renderUser: function() {
    if(this.state.showUser) {
      return <UserDrop toggleClose={this.toggleClose}/>
    }
  },

  renderCategory: function() {
    if(this.state.showCategory) {
      return <CategoryDrop toggleClose={this.toggleClose}/>
    }
  },

  toggleDate: function () {
    // this.setState({showClose: true})
    this.setState({showDate: !this.state.showDate})
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },

   toggleUser: function () {
    this.setState({showUser: !this.state.showUser})
  },

   toggleCategory: function () {
    this.setState({showCategory: !this.state.showCategory})
  },

  toggleClose: function() {
    if(this.state.showUser) {
      this.setState({showUser: !this.state.showUser})
    } else if (this.state.showCategory) {
      this.setState({showCategory: !this.state.showCategory})
    } else if (this.state.showDate) {
      this.setState({showDate: !this.state.showDate})
    }
  },

  setDateButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.toggleDate}
      style={[styles.setDateButton, styles.dropdown]}
      >
      <Text>
        Set Date
      </Text>
    </TouchableHighlight>
  },

  setUserButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.toggleUser}
      style={[styles.setDateButton, styles.dropdown]}
      >
      <Text>
        User
      </Text>
    </TouchableHighlight>
  },

  setCategoryButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.toggleCategory}
      style={[styles.setDateButton, styles.dropdown]}
      >
      <Text>
        Category
      </Text>
    </TouchableHighlight>
  },

  addChore: function() {
    var choreObject = {
      name: gUser,
      category: gCategory,
      choreName: this.state.choreName, 
      date: gDate.toString().split(' ').slice(0, 4).join(' '),
      completed: false
    }
    this.props.sendChore(choreObject);
  },

  sendChoreButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.addChore}
      style={[styles.sendMessageButton]}
      >
      <Text>
        Submit Chore
      </Text>
    </TouchableHighlight>
  },
  
  render: function() {
    return (
      <View>
        {this.renderUser()}
        {this.renderCategory()}
        {this.renderDate()}
        <View style={styles.dropdown}>
          {this.setUserButton()}
          {this.setCategoryButton()}
          {this.setDateButton()}
        </View>
        <View style={[styles.formTest, border('blue')]}>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            value={this.state.choreName}
            rejectResponderTermination={false}
            style={styles.textInput}/>
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendChoreButton()}
        </View>
      </View>
    </View>
    )
  }
});

var ChoreContainer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      chores: chores,
      dataSource: ds.cloneWithRows(chores),
      user: '',
      category: ''
    };
  },

  sendChore: function(choreObj) {
    this.state.chores.push(choreObj);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.chores),
      chores: this.state.chores
    })
  },

  toggleForm: function() {
    this.setState({showForm: !this.state.showForm});
  },

  renderForm: function() {
    if(this.state.showForm) {
      return <ChoreForm sendChore={this.sendChore}/>
    }
  },

  submitChore: function(chore) {
    fetch(process.env.Base_URL + '/chores', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': AsyncStorage.getItem('obie')
      },
      body: JSON.stringify(chore)
    })
    .then(function(data) {
      this.loadChores();
      socket.emit('chore', chore);
    })
  },

  render: function() {
    return (
        <View style={[styles.messageContainer, border('red')]}>
          <Text style={styles.viewTitle}>Chores</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
              <View style={[styles.choreEntry, border('black')]}>
                <View>
                  <Text>
                    Name: {rowData.name}
                  </Text>
                  <Text>
                    Chore: {rowData.choreName}
                  </Text>
                  <Text>
                    Date: {rowData.date}
                  </Text>
                  <Text>
                    Category: {rowData.category}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text 
                  onPress={this.completeChore}>
                    Done?
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={{alignItems: 'center', marginBottom: 10}} >
            <Text onPress={this.toggleForm}>Toggle Chore Form</Text>
          </View>
          {this.renderForm()}
        </View>
      )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
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
    alignItems: 'stretch'
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
  sendMessageButton: {
    borderWidth: 2,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setDateButton: {
    borderWidth: .5,
    width: 101,
    height: 40,
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
  dropdown: {
    flexDirection:'row',
    borderColor: 'black',
    borderWidth: 1
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 200,
    left: 40,
    backgroundColor: 'green',
  },
  choreEntry: {
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('ObieObieOh', () => App);
