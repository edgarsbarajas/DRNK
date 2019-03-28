import React from 'react';
import { NavigationBar, TouchableOpacity, Text } from 'react-native';

const NavBar = () => {
  return (
    <NavigationBar
      leftComponent = {<TouchableOpacity><Text>Left</Text></TouchableOpacity>}
      centerComponent = {<Text>Center</Text>}
    />
  )
}

export default NavBar;
