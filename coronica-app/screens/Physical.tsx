import React, { createRef, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { CStyles } from '../CStyles';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CButton from '../components/CButton';
import { HeaderTitle } from 'react-navigation-stack';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Do ten push-ups',
    pointVal: 10
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Do jumping jacks for 1 minute',
    pointVal: 10
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Do 20 squats',
    pointVal: 20
  },
];

function Item({ title, pointsVal, onPress }) {
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 30}}>
        <Text style={CStyles.textStyle}>{title}</Text>
        <Text style={CStyles.textStyle}>{pointsVal}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Physical({ navigation }) {
  const [points, setPoints] = useState(0);
  let circularProgressRef = React.createRef<AnimatedCircularProgress>();
  const prog = circularProgressRef.current
  return (
    <View style={CStyles.container}>
      <View style={{height: 100}}/>
      <Text style={CStyles.titleStyle}>{points}</Text>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={100}
        tintColor="#EDFFEC"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#FFFFFF"
        ref={circularProgressRef} />
      <FlatList 
        style={{paddingVertical: 20, width: 300}}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} pointsVal={item.pointVal} onPress={() => {
          setPoints(points+item.pointVal);
        }} />}
        keyExtractor={item => item.id} />
    </View>
  );

}
