import React from 'react';
import { View, Text,TouchableOpacity} from 'react-native';

const WeekdayIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{height:24,width:24,borderRadius:24,backgroundColor:props.statusColor,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:12,color:'#000'}}>{props.weekday}</Text>
    </TouchableOpacity>
  )
}

export default WeekdayIcon