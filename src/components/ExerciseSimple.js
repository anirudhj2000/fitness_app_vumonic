import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';
import Images from '../../util/images';


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const ExerciseSimple = (props) => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:18,color:'#000',marginHorizontal:'5%'}}>{props.title}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            {/* <Text>Sets</Text> */}
            <View style={{flexDirection:'column',marginTop:'2.5%',marginHorizontal:'5%'}}>
                <Text style={{fontSize:12}}>Sets</Text>
                <Text style={{width:24,textAlign:'center',fontSize:18}}>{props.sets}</Text>
            </View>    
        </View>
    </View>
  )
}

export default ExerciseSimple;

const styles = new StyleSheet.create({
    container : {
        height: sh*0.07,
        window:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:4,
        marginVertical:'1%'
    }
})