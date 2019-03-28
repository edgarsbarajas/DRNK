import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { onSearchBarValueChange } from '../actions/SearchBarActions';
import RNPickerSelect from 'react-native-picker-select';
import SvgUri from 'react-native-svg-uri';

class SearchBarInput extends Component {
  renderInput() {
    if(this.props.type === 'picker') {
      console.log('******picker value', this.props.value);
      console.log('******picker label', this.props.pickerLabel);
      return (
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{}}
            items={this.props.items}
            value={this.props.value.value}
            onValueChange={(value, index) => this.props.onSearchBarValueChange({ prop: this.props.prop, value: { value, index } }) }
          >
            <Text style={styles.pickerText}>{this.props.pickerLabel}</Text>
          </RNPickerSelect>
        </View>
      );
    } else if(this.props.type === 'text') {
      return (
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor='#777'
          style={styles.input}
          onChangeText={value => this.props.onSearchBarValueChange({prop: this.props.prop, value})}
          value={this.props.value}
        />
      );
    }
  }

  render() {
    const { halfSize, placeholder, type, label } = this.props;

    return (
      <View style={[styles.inputContainer, styles.focusedBorder, halfSize && {flex: 2}]}>
        <Text style={styles.label}>{label}</Text>
        { this.renderInput() }
      </View>
    );
  }
}

const styles = {
  inputContainer: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    borderBottomWidth: 2,
    height: 50
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: -10,
    color: '#FFFFFF'
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 15
  },
  pickerContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  unfocusedBorder: {
    borderColor: 'red'
  },
  focusedBorder: {
    borderColor: '#10E7DC'
  }
}

export default connect(null, { onSearchBarValueChange })(SearchBarInput);
