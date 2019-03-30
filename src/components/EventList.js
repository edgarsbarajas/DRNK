import React, { Component } from 'react';
import { View, Text, FlatList, LayoutAnimation } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getEventsByUserLocation } from '../actions/EventActions';
import EventTile from './EventTile';
import SearchBar from './SearchBar';
import Spinner from './common/Spinner';

class EventList extends Component {
  componentDidMount() {
    this.props.getEventsByUserLocation();
  }

  componentWillReceiveProps() {
      LayoutAnimation.easeInEaseOut();
  }

  renderEventList() {
    const { loading, events, userLocation } = this.props;

    if(loading) {
      return <Spinner size='large' />;
    } else if(userLocation === null) {
      return <Text>Cannot get location</Text>
    } else if(events.length > 0) {
      return (
        <FlatList
          data={events}
          renderItem={({item}) => { console.log('item being passed to tile', item); return <EventTile event={item} />;}}
          keyExtractor={item => item.id}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <LinearGradient colors={['#320086', '#FF0AF4']} style={styles.linearGradient}>
        <SearchBar />
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
  userLocation: state.userLocation.position
});

export default connect(mapStateToProps, { getEventsByUserLocation })(EventList);
