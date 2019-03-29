import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router , Scene } from 'react-native-router-flux';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import { toggleSearchBar } from './actions/SearchBarActions';

class RouterComponent extends Component {
  render() {
    return (
      <Router
        navigationBarStyle={{ backgroundColor: '#320086', borderBottomWidth: 0 }}
        titleStyle={{ color: '#FFFFFF' }}
      >
        <Scene key="root">
          <Scene
            initial
            key="eventsList"
            component={EventList}
            title='Events'
            onRight={this.props.toggleSearchBar}
            rightTitle='Search'
          />
          <Scene
            key="eventDetails"
            component={EventDetails}
            title='Details'
          />
        </Scene>
      </Router>
    );
  }
}

export default connect(null, { toggleSearchBar })(RouterComponent);
