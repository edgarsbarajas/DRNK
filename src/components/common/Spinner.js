import React from 'react';
import { View, Text } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Spinner = ({size}) => {
  return <BallIndicator color='#10E7DC' />
}

export default Spinner;

// <BarIndicator color='#10E7DC' />
// <DotIndicator color='#10E7DC' />
// <MaterialIndicator color='#10E7DC' />
// <PulseIndicator color='#10E7DC' />
// <SkypeIndicator color='#10E7DC' />
// <UIActivityIndicator color='#10E7DC' />
// <WaveIndicator color='#10E7DC' />
