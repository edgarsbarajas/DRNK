import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Router , Scene } from 'react-native-router-flux';
import SvgUri from 'react-native-svg-uri';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventsNavBar from './components/EventsNavBar';
import { toggleSearchBar } from './actions/SearchBarActions';

class RouterComponent extends Component {
  renderRightButton() {
    return (
      <View style={{ borderWidth: 1, borderColor: 'pink', flexDirection: 'row', justifyContent: 'flex-start', flex: 1, width: '100%' }}>
      </View>
    );
  }

  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#320086', borderBottomWidth: 0 }}>
        <Scene key='root'>
          <Scene
            initial
            key='eventsList'
            component={EventList}
            renderRightButton={this.renderRightButton}
            renderTitle={<SvgUri height='75' width='75' source={require('../assets/svgs/logo.svg')} />}
            onRight={this.props.toggleSearchBar}
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
}

export default connect(null, { toggleSearchBar })(RouterComponent);

// navigationBarStyle={{ backgroundColor: '#320086', borderBottomWidth: 0 }}


// <Scene
//   initial
//   key='eventsList'
//   component={EventList}
//   title='DRNK'
//   renderRightButton={()=>filterIcon}
//   onRight={this.props.toggleSearchBar}
//   rightButtonImage={require('../assets/images/search.png')}
//   titleStyle={{ color: '#FFFFFF', fontSize: 26, letterSpacing: -3.5, fontWeight: 'bold' }}
// />
