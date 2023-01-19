import React from 'react';
import { View, TouchableOpacity,Text, StyleSheet,Dimensions} from 'react-native';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const CalendarCard = (props) => {
  return (
    <View style={styles.container}>
        <Text style={{color:'#fff'}}>{props.title}</Text>
    </View>
  )
}

export default CalendarCard;

const styles = new StyleSheet.create({
    container : {
        width : sw*0.3,
        height:sh*0.04,
        backgroundColor:'#795fde',
        borderRadius:4,
        marginVertical:'5%',
        marginRight:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})