import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function CButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{ title }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    width: 250,
    backgroundColor: '#011638',
  },
  buttonText: {
    color: '#EDFFEC',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
  }
})
