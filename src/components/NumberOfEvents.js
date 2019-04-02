import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class NumberOfEvents extends Component {
  renderVerbiage() {
    if(this.props.searchedCity === 'Current Location') {
      return <Text>near you</Text>;
    }

    return <Text>in {this.props.searchedCity}</Text>;
  }

  render() {
    const { searchedCity, searchBarVisible, events } = this.props;

    if(!searchBarVisible) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{events.length} events {this.renderVerbiage()}</Text>
        </View>
      );
    }

    return null;
  }
}

const styles = {
  container: {
    borderRadius: 2,
    shadowOffset:{  width: 0,  height: .25  },
    shadowColor: '#000000',
    shadowOpacity: .5,
  },
  text: {
    fontSize: 16,
    color: '#44147C',
    backgroundColor: '#10E7DC',
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10
  }
};

const mapStateToProps = state => ({
  searchBarVisible: state.searchBar.searchBarVisible,
  searchedCity: state.searchBar.searchedCity,
  events: state.events.events
});

export default connect(mapStateToProps)(NumberOfEvents);
