import React, { Component } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import SearchBarInput from './SearchBarInput';
import { getEventsBySearch } from '../actions/EventActions';
import { onSearchBarValueChange } from '../actions/SearchBarActions';
import Button from './common/Button';

class SearchBar extends Component {
  componentWillUpdate() {
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
    console.log('1919191919 SEARCH BAR PROPS', this.props.searchBar);
    const timeItems = [
      { label: 'All dates', value: '' },
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This week', value: 'this_week' },
      { label: 'This weekend', value: 'this_weekend' },
      { label: 'Next week', value: 'next_week' },
      { label: 'This month', value: 'this_month' },
      { label: 'Next month', value: 'next_month' }
    ];

    let filterItems;

    if(this.props.userLocation.errorCode !== null) {
      filterItems = [
        { label: 'Best', value: 'best' },
        { label: 'Date', value: 'date' }
      ];
    } else {
      filterItems = [
        { label: 'Best', value: 'best' },
        { label: 'Distance', value: 'distance' },
        { label: 'Date', value: 'date' }
      ];
    }

    if(this.props.searchBar.searchBarVisible) {
      return (
        <View style={styles.searchBarContainer}>
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
          <Button
            onPress={() => this.props.getEventsBySearch({
              city: this.props.searchBar.city,
              startDateKeyword: this.props.searchBar.when.value,
              filter: this.props.searchBar.filter.value
            })}
          >
            GO
          </Button>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  searchBarContainer: {
    marginBottom: 15,
    width: '100%'
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
  searchBar: state.searchBar,
  userLocation: state.userLocation
})

export default connect(mapStateToProps, { getEventsBySearch, onSearchBarValueChange })(SearchBar);
