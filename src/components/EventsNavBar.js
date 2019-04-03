import {
 View, Image, StatusBar, TouchableWithoutFeedback, Text
} from 'react-native';
import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';


class EventsNavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <SvgUri
            width='80'
            height='30'
            source={require('../../assets/svgs/logo.svg')}
          />
        </View>
      </View>
    );
  }

}
const styles = {
  container: {
    flexDirection: 'row',
    paddingTop: 50,
  }
};


export default EventsNavBar;
