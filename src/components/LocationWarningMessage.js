import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const LocationWarningMessage = (props) => {
  if(props.userLocation.errorCode === 2 || props.userLocation.errorCode === 3) {
    return (
      <View style={styles.warningMessage}>
        <Text style={styles.warningMessageText}>Error getting your current location</Text>
      </View>
    );
  }

  return null;
}

const styles = {
  warningMessage: {
    backgroundColor: '#F1B353',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2
  },
  warningMessageText: {
    fontSize: 14,
    color: '#FFFFFF'
  }
};

const mapStateToProps = state => ({
  userLocation: state.userLocation
});

export default connect(mapStateToProps)(LocationWarningMessage);
