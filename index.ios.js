/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  DatePickerIOS,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

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
var border = function(color) {
  return {
    borderWidth: 4,
    borderColor: color
  }
}

var App = React.createClass({
  getInitialState: function() {
    return {
      chores: chores,
      messages: messages
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
      <View style={[styles.container, border('black')]}>
        {/*<Navbar />
        <MessageContainer messages={this.state.messages} />*/}
        <ScrollableTabView>
          <MessageContainer messages={this.state.messages} tabLabel="Messages" />
          <DatePickerExample messages={this.state.messages} tabLabel="Date Picker" />
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
  },

  onTimezoneChange: function(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  },

  render: function() {
    // Ideally, the timezone input would be a picker rather than a
    // text input, but we don't have any pickers yet :(
    return (
      <View>
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
      </View>
    );
  },
});

var WithLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
});

var Heading = React.createClass({
  render: function() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
});

var ChoreForm = React.createClass({
  getInitialState: function() {
    return {
      text: 'hola'
    }
  },
  addChore: function() {
    var choreObject = {name: 'Joey', choreName: this.state.text}
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
      <View style={[styles.formTest, border('blue')]}>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          rejectResponderTermination={false}
          style={styles.textInput}
        />
        <View style={[styles.buttonContainer, border('red')]}>
          {this.sendChoreButton()}
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

  renderDate: function() {
    return <DatePickerExample />
  },

  setDateButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.renderDate}
      style={[styles.setDateButton]}
      >
      <Text>
        Set Date
      </Text>
    </TouchableHighlight>
  },

  componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
    updatePosition(this.refs['SELECT2']);
    updatePosition(this.refs['CATEGORYLIST']);
  },

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  },

  _getOptionList2() {
    return this.refs['CATEGORYLIST'];
  },


  _user(user) {
    this.setState({
      ...this.state,
      user: user
    });
  },

   _category(category) {
    this.setState({
      category: category
    });
  },

  sendChore: function(choreObj) {
    this.state.chores.push(choreObj);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.chores),
      chores: this.state.chores
    })
  },
  renderChoreEntry: function(rowData) {
    return (
      <View style={[styles.messageEntry, border('black')]}>
        <Text>
          Name: {rowData.name}
        </Text>
        <Text>
          Chore: {rowData.choreName}
        </Text>
        <Text>
          Category: {rowData.category}
        </Text>
      </View>
    )
  },
  render: function() {
    console.log('REFS', this.refs); 
    return (
      <View style={[styles.messageContainer, border('red')]}>
        <Text style={styles.viewTitle}>Chores</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderChoreEntry}
        />
        <View style={[styles.overlay, {flexDirection: 'column', flex: .33}]}>
          <Select
            width={100}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select User"
            onSelect={this._user.bind(this)}
            style={[styles.overlay]}>
            <Option>Joey</Option>
            <Option>Justin</Option>
            <Option>Lyly</Option>
            <Option>Nick</Option>
          </Select>
          <OptionList ref="OPTIONLIST"/>
        </View>
        <View style={[styles.overlay, {flexDirection: 'column', flex: .33}]}>
          <Select
            width={100}
            ref="SELECT2"
            optionListRef={this._getOptionList2.bind(this)}
            defaultValue="Select Area"
            onSelect={this._category.bind(this)}
            style={[styles.overlay]}>
            <Option>Kitchen</Option>
            <Option>Bathroom</Option>
            <Option>Bedroom</Option>
            <Option>Yard</Option>
            <Option>Other</Option>
            <Option>Living Room</Option>
            <Option>Laundry Room</Option>
          </Select>
          <OptionList ref="CATEGORYLIST"/>
        </View>
        {this.setDateButton()}
        <ChoreForm sendChore={this.sendChore} />
      </View>
    )
  }
});



// const initialState = {
//   messages: messages,
//   chores: [{name: 'eat the cheese'}],
//   text: 'nachos',
//   users: ['Joey', 'Lyly', 'Nick', 'Justin'],
//   categories: ['Kitchen', 'Living Room', 'Yard', 'Laundry Room', 'Bathroom', 'Bedroom', 'Other']
// }

// const app = (state = initialState, action) => {
//  return state; 
// };


// const chore = (state, action) => {
//   switch (action.type) {
//     case 'ADD_CHORE': 
//       return {
//         name: action.name
//       };
//   }
// };

// const chores = (state, action) => {
//   switch (action.type) {
//     case 'ADD_CHORE':
//       return [
//         ...state,  
//         chore(undefined, action)
//       ];
//     default: 
//       return state; 
//   }
// }

// const store = createStore(app);

// const ScrollableTabView = require('react-native-scrollable-tab-view');

// let messages = [{name: "Lyly", text: "a;lshee hksehkahfj askhfakjse ashkjehakjes afeksjfhk esksjks jfhskfe"},{name: "Boner", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Joey", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."},{name: "Nick", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}]
// // var messages = [];
// const border = (color) => {
//   return {
//     borderWidth: 4,
//     borderColor: color
//   }
// }

// const App = () => 
//   <View style={[styles.container, border('black')]}>
//     {/*<Navbar />
//     <MessageContainer messages={this.state.messages} />*/}
//     <ScrollableTabView>
//       <MessageContainer messages={store.getState().messages} tabLabel="Messages" />
//       <MessageContainer tabLabel="Finance" />
//       <ChoreContainer tabLabel="Chores" />
//     </ScrollableTabView>
//   </View>
  

// var Form = React.createClass({
//   addMessage: function() {
//     console.log('addMessage from form..', this.state.text);
//     var messageObject = {name: 'Justin', text: this.state.text}
//     console.log('this.state.text: ', this.state.text);
//     this.props.sendMessage(messageObject);
//   },
//   sendMessageButton: function() {
//     return <TouchableHighlight
//       underlayColor="gray"
//       onPress={this.addMessage}
//       style={[styles.sendMessageButton]}
//       >
//       <Text>
//         Send Message
//       </Text>
//     </TouchableHighlight>
//   },
//   render: function() {
//     return (
//       <View style={[styles.formTest, border('blue')]}>
//         <TextInput
//           onChangeText={(text) => this.setState({text})}
//           value={store.getState().text}
//           rejectResponderTermination={false}
//           style={styles.textInput}
//         />
//         <View style={[styles.buttonContainer, border('red')]}>
//           {this.sendMessageButton()}
//         </View>
//       </View>
//     )
//   }
// });

// const Navbar = () => 
//   <View style={[styles.navbar, border('green')]}>
//     <Text>Navbar</Text>
//   </View>


// var MessageContainer = React.createClass({
//   getInitialState: function() {
//     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     return {
//       messages: messages,
//       dataSource: ds.cloneWithRows(messages)
//     };
//   },
//   sendMessage: function(messageObj) {
//     this.state.messages.push(messageObj);
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRows(this.state.messages),
//       messages: this.state.messages
//     })
//   },
//   renderMessageEntry: function(rowData) {
//     return (
//       <View style={[styles.messageEntry, border('black')]}>
//         <Text>
//           Name: {rowData.name}
//         </Text>
//         <Text>
//           Message: {rowData.text}
//         </Text>
//       </View>
//     )
//   },
//   render: function() {
//     return (
//       <View style={[styles.messageContainer, border('red')]}>
//         <Text style={styles.viewTitle}>Messages</Text>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this.renderMessageEntry}
//         />
//         <Form sendMessage={this.sendMessage} />
//       </View>
//     )
//   }
// });

// var ChoreForm = React.createClass({
//   addChore: function() {
//     var messageObject = {name: 'Justin', text: this.state.choreName}
//     console.log('this.state.text: ', this.state.chorName);
//     this.props.sendMessage(messageObject);
//   },
//   sendMessageButton: function() {
//     return <TouchableHighlight
//       underlayColor="gray"
//       onPress={this.addMessage}
//       style={[styles.sendMessageButton]}
//       >
//       <Text>
//         Send Message
//       </Text>
//     </TouchableHighlight>
//   },
//   render: function() {
//     return (
//       <View style={[styles.formTest, border('blue')]}>
//         <TextInput
//           onChangeText={(text) => this.setState({text})}
//           value={store.getState().text}
//           rejectResponderTermination={false}
//           style={styles.textInput}
//         />
//         <View style={[styles.buttonContainer, border('red')]}>
//           {this.sendMessageButton()}
//         </View>
//       </View>
//     )
//   }
// });
// var ChoreContainer = React.createClass({
//   getInitialState: function() {
//     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     return {
//       messages: messages,
//       dataSource: ds.cloneWithRows(messages)
//     };
//   },
//   sendMessage: function(messageObj) {
//     this.state.messages.push(messageObj);
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRows(this.state.messages),
//       messages: this.state.messages
//     })
//   },
//   renderMessageEntry: function(rowData) {
//     return (
//       <View style={[styles.messageEntry, border('black')]}>
//         <Text>
//           Name: {rowData.name}
//         </Text>
//         <Text>
//           Message: {rowData.text}
//         </Text>
//       </View>
//     )
//   },
//   render: function() {
//     return (
//       <View style={[styles.messageContainer, border('red')]}>
//         <Text style={styles.viewTitle}>Messages</Text>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this.renderMessageEntry}
//         />
//         <Form sendMessage={this.sendMessage} />
//       </View>
//     )
//   }
// });


// // const ChoreContainer = ({
// //   value = () => {
// //     return 2 * 2;
// //   }, 
// //   setThingsUp = () => {
// //     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// //     return {
// //       chores: this.getState().chores,
// //       dataSource: ds.cloneWithRows(messages)
// //     };
// //   },
// //   renderChoreEntry = (rowData) => {
// //     return (
// //       <View style={[styles.messageEntry, border('black')]}>
// //         <Text>
// //           Name: {rowData.name}
// //         </Text>
// //       </View>
// //     )
// //   }
// // }) => 
// //   <View>
// //     <View style={[styles.messageContainer, border('red')]}>
// //       <Text style={styles.viewTitle}>Chores</Text>
// //     </View>
// //     <View style={[styles.formTest, border('blue')]}>
// //       <TextInput
// //         // ref={node => {
// //         //   this.input = node;
// //         // }} 
// //         rejectResponderTermination={false}
// //         style={styles.textInput}/>
// //       <View style={[styles.buttonContainer, border('red')]}>
// //         <TouchableHighlight
// //           underlayColor="gray"
// //           onPress={() => {
// //             store.dispatch({
// //               type: 'ADD_CHORE', 
// //               name: 'testing'
// //             });
// //             // this.input.value = ''
// //           }}
// //           style={[styles.sendMessageButton]}
// //           >
// //           <Text>
// //             Submit Chore
// //           </Text>
// //         </TouchableHighlight>
// //       </View>
// //     </View>
// //   </View>
//   // ref={node => {
//   //     this.input = node;
//   //   }}


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
    borderColor: '#00CC00',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setDateButton: {
    borderWidth: 2,
    borderColor: '#00CC00',
    borderRadius: 10,
    flex: .1,
    width: 100,
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

/*

    <View>
      <ListView
        dataSource={store.getState.dataSource}
        renderRow={renderChoreEntry()}
      />
    </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Select
        width={250}
        defaultValue="Select category...">
        <Option>Kitchen</Option>
        <Option>Living Room</Option>
        <Option>Bathroom</Option>
        <Option>Bedroom</Option>
        <Option>Yard</Option>
        <Option>Laundry Room</Option>
        <Option>Other</Option>
      </Select>
    </View>
  */

AppRegistry.registerComponent('ObieObieOh', () => App);
