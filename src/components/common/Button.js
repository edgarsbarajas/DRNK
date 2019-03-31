import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, children}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: '#10E7DC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 2,
    shadowOffset:{  width: 0,  height: 1  },
    shadowColor: '#000000',
    shadowOpacity: .5,
  },
  buttonText: {
    color: '#44147c',
    fontSize: 18,
    fontWeight: 'bold'
  }
};

export default Button;
