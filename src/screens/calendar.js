import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Calendar = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Calendar</Text>
        <View styl>

        </View>
    </View>
  )
}

export default Calendar;

const styles = new StyleSheet.create({
    container : {
        backgroundColor:'#0b1229',
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column'
    },

    title : {
        fontSize:32,
        color:'#fff',
        marginHorizontal:'5%',
        marginVertical:'2.5%'
    }

})