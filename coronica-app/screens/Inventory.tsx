import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationScreenComponent,
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { CStyles } from '../CStyleså';

export default function Inventory({navigation}) {

  return (
    <View style={CStyles.container}>
      <Text style={CStyles.titleStyle}>Inventory</Text>
    </View>
  );

}
