"use strict";

var React = require('react-native');
var SCREEN_HEIGHT = require('Dimensions').get('window').height;
var {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} = React;

var noop = () => {};
var ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1!==r2)});

var ListPopover = React.createClass({
  propTypes: {
    list: PropTypes.array.isRequired,
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      list: [""],
      isVisible: false,
      onClick: noop,
      onClose: noop
    };
  },
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows(this.props.list)
    };
  },
  componentWillReceiveProps: function(nextProps:any) {
    if (nextProps.list !== this.props.list) {
      this.setState({dataSource: ds.cloneWithRows(nextProps.list)});
    }
  },
  handleClick: function(data) {
    this.props.onClick(data);
    this.props.onClose();
  },
  renderRow: function(rowData) {
    var separatorStyle = this.props.separatorStyle;
    var rowTextStyle = this.props.rowText;

    var separator = <View style={separatorStyle}/>;
    if (rowData === this.props.list[0]) {
      separator = {};
    }

    var row = <Text style={rowTextStyle}>{rowData}</Text>
    if (this.props.renderRow) {
      row = this.props.renderRow(rowData);
    }

    return (
      <View>
        {separator}
        <TouchableOpacity onPress={() => this.handleClick(rowData)}>
          {row}
        </TouchableOpacity>
      </View>
    );
  },
  renderList: function() {
    var styles = this.props.style;
    var maxHeight = {};
    if (this.props.list.length > 12) {
      maxHeight = {height: SCREEN_HEIGHT * 3/4};
    }
    return (
      <ListView
        style={maxHeight}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
      />
    );
  },
  render: function() {
    var containerStyle = this.props.containerStyle 
    var popoverStyle = this.props.popoverStyle

    if (this.props.isVisible) {
      return (
        <TouchableOpacity onPress={this.props.onClose}>
          <View style={containerStyle}>
            <View style={popoverStyle}>
              {this.renderList()}
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (<View/>);
    }
  }
});

var items = ["Item 1", "Item 2"];

var TestListPopover = React.createClass({
  getInitialState: function() {
    return {
      item: "Select Item",
      isVisible: false,
    };
  },

  showPopover: function() {
    this.setState({isVisible: true});
  },
  closePopover: function() {
    this.setState({isVisible: false});
  },
  setItem: function(item) {
    this.setState({item: item});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.showPopover}>
          <Text>{this.state.item}</Text>
        </TouchableHighlight>

        <ListPopover
          list={items}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#532860',
  },
  button: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B8C",
  },
});

module.exports = TestListPopover;



