import React, { Component } from 'react';
import { View, Text, FlatList, LayoutAnimation, Linking } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getEventsByUserLocation } from '../actions/EventActions';
import EventTile from './EventTile';
import SearchBar from './SearchBar';
import LocationWarningMessage from './LocationWarningMessage';
import NumberOfEvents from './NumberOfEvents';
import Spinner from './common/Spinner';
import Button from './common/Button';


class EventList extends Component {
  componentDidMount() {
    this.props.getEventsByUserLocation();
    console.log('!!!!!CHECK IF LOADING!!!!! #UPDATED');
  }

  componentWillReceiveProps() {
      LayoutAnimation.easeInEaseOut();
  }

  renderEventList() {
    const { loading, events, userLocation, searchBar, city } = this.props;

    console.log('user location', userLocation);

    if(loading) {
      console.log('!!!!!!!LOADING BITCH!!!!!!!');
      return <Spinner />;
    } else if(events.length > 0) {
      console.log('!!!!!!EVENTS BITCH!!!!!!');
      return (
        <FlatList
          data={events}
          renderItem={({item}) => <EventTile event={item} />}
          keyExtractor={item => item.id}
        />
      );
    } else if(userLocation.errorCode === 1 && events.length <= 0 && city === 'Current Location') { // User denied access to location services.
      console.log('!!!!!!NO LOCATION SERVICES BITCH!!!!!!');
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginLeft: 10}}>
          <Text style={{color: '#FFFFFF', fontSize: 18,  marginBottom: 10, textAlign: 'center'}}>
            DRNK needs your location to get events near you
          </Text>
          <Button onPress={() => Linking.openURL('app-settings://barhopping101/')}>
            SETTINGS
          </Button>
        </View>
      );
    }

    return null;
  }

  render() {
    return (
      <LinearGradient colors={['#320086', '#FF0AF4']} style={styles.linearGradient}>
        <SearchBar />
        <LocationWarningMessage />
        <NumberOfEvents />
        {this.renderEventList()}
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    flex: 1,
    paddingBottom: 20
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  loading: state.events.loading,
  userLocation: state.userLocation,
  city: state.searchBar.city
});

export default connect(mapStateToProps, { getEventsByUserLocation })(EventList);
