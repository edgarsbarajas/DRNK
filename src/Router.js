import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Router , Scene } from 'react-native-router-flux';
import SvgUri from 'react-native-svg-uri';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import { toggleSearchBar } from './actions/SearchBarActions';

const RouterComponent = props => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#320086', borderBottomWidth: 0 }}>
      <Scene key='root'>
        <Scene
          initial
          key='eventsList'
          component={EventList}
          renderRightButton={(
            <TouchableOpacity onPress={props.toggleSearchBar}>
              <SvgUri height='18' width='18' style={{ marginRight: 15 }} source={require('../assets/svgs/search.svg')} />
            </TouchableOpacity>
          )}
          renderTitle={<SvgUri height='75' width='75' source={require('../assets/svgs/logo.svg')} />}
        />
        <Scene
          key='eventDetails'
          component={EventDetails}
          title='Details'
          tintColor='#FFFFFF'
          leftButtonTextStyle={{ color: '#FFFFFF' }}
        />
      </Scene>
    </Router>
  );
}

export default connect(null, { toggleSearchBar })(RouterComponent);
