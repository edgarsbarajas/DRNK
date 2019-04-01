import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  renderVerbiage() {
    const { city } = this.props;

    if(city === 'Current Location') {
      return <Text>near you</Text>;
    }

    return <Text>in {city}</Text>;
  }

  render() {
    const { city, searchBarVisible ,loading, userLocation, events } = this.props;

    if(searchBarVisible || loading || (userLocation.errorCode === 1 && events.length <= 0 && city === 'Current Location')) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{events.length} events {this.renderVerbiage()}</Text>
      </View>
    );
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
  city: state.searchBar.city,
  searchBarVisible: state.searchBar.searchBarVisible,
  loading: state.events.loading,
  userLocation: state.userLocation,
  events: state.events.events
});

export default connect(mapStateToProps)(NumberOfEvents);
