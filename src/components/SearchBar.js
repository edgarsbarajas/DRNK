import React, { Component } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import SearchBarInput from './SearchBarInput';
import { getEventsBySearch } from '../actions/EventActions';
import { onSearchBarValueChange } from '../actions/SearchBarActions';

class SearchBar extends Component {
  componentWillReceiveProps(nextProps) {
      LayoutAnimation.easeInEaseOut();
  }

  renderCurrentLocationSearchOption() {
    if(!this.props.searchBar.city) {
      return (
        <TouchableOpacity style={styles.currentLocationSearchOption} onPress={() => this.props.onSearchBarValueChange({prop: 'city', value: 'Current Location'})}>
          <Text style={styles.currentLocationSearchOptionText}>Current Location</Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    console.log('props', this.props.searchBar);
    const timeItems = [
      { label: 'All dates', value: 'all dates' },
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This week', value: 'this_week' },
      { label: 'This weekend', value: 'this_weekend' },
      { label: 'Next week', value: 'next_week' },
      { label: 'This month', value: 'this_month' },
      { label: 'Next month', value: 'next_month' }
    ];

    const filterItems = [
      { label: 'Distance', value: 'Distance' },
      { label: 'Time', value: 'Time' }
    ];

    if(this.props.searchBar.searchBarVisible) {
      console.log('seatchbar props from searchbar component: ', this.props.searchBar);
      return (
        <View style={{marginBottom: 15}}>
          <SearchBarInput
            type='text'
            placeholder='San Francisco'
            label='where?'
            prop='city'
            value={this.props.searchBar.city} />
          {this.renderCurrentLocationSearchOption()}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <SearchBarInput
              halfSize
              label='when?'
              items={timeItems}
              type='picker'
              prop='when'
              pickerLabel={timeItems[this.props.searchBar.when.index].label}
              value={this.props.searchBar.when.value}
            />
            <SearchBarInput
              halfSize
              label='filter'
              type='picker'
              prop='filter'
              items={filterItems}
              pickerLabel={filterItems[this.props.searchBar.filter.index].label}
              value={this.props.searchBar.filter.value}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.getEventsBySearch({city: this.props.searchBar.city, startDateKeyword: this.props.searchBar.when.value})}
            underlayColor='#10E7DC'
          >
            <Text style={styles.buttonText}>DRNK</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  button: {
    backgroundColor: '#10E7DC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 2,
    shadowOffset:{  width: 0,  height: 1  },
    shadowColor: '#000000',
    shadowOpacity: .5,
  },
  buttonText: {
    color: '#44147c',
    fontSize: 18,
    fontWeight: 'bold'
  },
  currentLocationSearchOption: {
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: '#10E7DC',
    width: 170,
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentLocationSearchOptionText: {
    color: '#10E7DC',
    fontSize: 18
  }
}

const mapStateToProps = state => ({
  searchBar: state.searchBar
})

export default connect(mapStateToProps, { getEventsBySearch, onSearchBarValueChange })(SearchBar);
