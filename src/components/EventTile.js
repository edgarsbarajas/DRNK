import React, { Component } from 'react';
import { TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import SvgUri from 'react-native-svg-uri';
import { View, Text, ImageBackground } from 'react-native';

class EventTile extends Component {
  renderImageBackground(eventLogo) {
    if(eventLogo === null) {
      return require('../../assets/images/stock_event_background.png');
    }

    return { uri: eventLogo.original.url };
  }

  render() {
    const { event, userLocation } = this.props;
    const startDate = moment(event.start.local).format('MMM Do YY, h:mm a');
    const endDate = moment(event.end.local).format('MMM Do YY, h:mm a');

    return (
      <TouchableOpacity onPress={() => Actions.eventDetails()}>
        <ImageBackground
          source={this.renderImageBackground(event.logo)}
          style={styles.container}
        >
          <View style={styles.overlay}></View>
          <Text style={[styles.text, styles.eventName]}>{event.name.text}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{startDate}</Text>
            <Text style={[styles.timeText]}>-</Text>
            <Text style={styles.timeText}>{endDate}</Text>
          </View>
          <View style={styles.venueInfoContainer}>
            <View style={styles.venueInfo}>
              <SvgUri width='18' height='18' style={styles.venueIcon} source={require('../../assets/svgs/building.svg')} />
              <Text style={styles.timeText}>{event.venue.name}</Text>
            </View>
            <View style={styles.venueInfo}>
              <SvgUri width='18' height='18' style={styles.venueIcon} source={require('../../assets/svgs/paper-plane.svg')} />
              <Text style={styles.timeText}>{event.distanceFromUser} mi away</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    height: 200,
    flex: 1,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:{  width: 0,  height: 1  },
    shadowColor: '#000000',
    shadowOpacity: .8,
    marginRight: 10,
    marginLeft: 10,
    shadowRadius: 2,
    elevation: 1
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .75)',
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  timeText: {
    fontSize: 16,
    color: '#FFF',
    paddingRight: 2,
    paddingLeft: 2
  },
  venueInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  venueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
    paddingLeft: 4,
    marginTop: 8
  },
  venueIcon: {
    marginRight: 3
  }
};

const mapStateToProps = state => ({
  userLocation: state.userLocation
});

export default connect(mapStateToProps)(EventTile);
