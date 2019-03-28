import React, { Component } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import SearchBarInput from './SearchBarInput';
import { getEventsBySearch } from '../actions/EventActions';

class SearchBar extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.searchBar.searchBarVisible !== this.props.searchBar.searchBarVisible) {
      LayoutAnimation.spring();
    }
  }

  render() {
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
            icon={require('../../assets/svgs/gem.svg')}
            prop='city'
            value={this.props.searchBar.city}
           />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <SearchBarInput
              halfSize
              icon={require('../../assets/svgs/calendar.svg')}
              items={timeItems}
              type='picker'
              prop='when'
              label={timeItems[this.props.searchBar.when.index].label}
              value={this.props.searchBar.when.value}
            />
            <SearchBarInput
              halfSize
              icon={require('../../assets/svgs/filter.svg')}
              type='picker'
              prop='filter'
              items={filterItems}
              label={filterItems[this.props.searchBar.filter.index].label}
              value={this.props.searchBar.filter.value}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.getEventsBySearch({city: this.props.searchBar.city, startDateKeyword: this.props.searchBar.when.value})}
              underlayColor='#10E7DC'
            >
              <Text style={styles.buttonText}>DRNK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  button: {
    borderWidth: 2,
    borderColor: '#10E7DC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    color: '#10E7DC',
    fontSize: 16
  }
}

const mapStateToProps = state => ({
  searchBar: state.searchBar
})

export default connect(mapStateToProps, { getEventsBySearch })(SearchBar);
