import React from 'react'
import { View, Text, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../util/images';


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;


const InfoCards = (props) => {
  return (
    <View style={styles.container}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2}}     
            style={{height:'100%',width:'100%',borderRadius:4,padding:12,flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} 
            colors={['#2C3E50', '#FD746C']}>
                <Text style={{color:'#fff',fontSize:16}}>{props.title1}</Text>
                <Text style={{color:'#fff',fontSize:32}}>{props.title2}</Text>
                <Text style={{color:'#fff',fontSize:10}}>{props.title3}</Text>
            </LinearGradient>
    </View>
  )
}

export default InfoCards;

const styles = new StyleSheet.create({
    container : {
        height : sh*0.15,
        width:sw*0.25,
    }
})