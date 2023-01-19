import React from 'react';
import { Text, View,StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>EasyFit</Text>
        <View style={styles.instructions}>
            {/* do it after all the dev */}
        </View>
    </View>
  )
}

export default Home;

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
        alignSelf:'center',
        marginVertical:'5%'
    }

})