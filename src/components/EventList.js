import React, { Component } from 'react';
import { View, Text, FlatList, LayoutAnimation } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getEventsByUserLocation } from '../actions/EventActions';
import EventTile from './EventTile';
import SearchBar from './SearchBar';

class EventList extends Component {
  componentDidMount() {
    this.props.getEventsByUserLocation();
  }

  componentWillReceiveProps() {
      LayoutAnimation.easeInEaseOut();
  }

  render() {
    const { loading, events } = this.props;

    return (
      <LinearGradient colors={['#320086', '#FF0AF4']} style={styles.linearGradient}>
        <SearchBar />
        <FlatList
          data={events}
          renderItem={({item}) => { console.log('item being passed to tile', item); return <EventTile event={item} />;}}
          keyExtractor={item => item.id}
        />
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
  loading: state.events.loading
});

export default connect(mapStateToProps, { getEventsByUserLocation })(EventList);
