import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../util/images';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const WorkoutCard = props => {
  return (
    <TouchableOpacity>
        
        <View style={styles.cardContainer}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{height:'100%',width:'100%',borderRadius:4,padding:12}} colors={['#616161', '#9bc5c3']}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <View style={styles.time}>
                <Image style={{height:12,width:12,tintColor:'#c7c7c7'}} source={Images.clock}/>
                <Text style={{color:'#fff',fontSize:12}}>28 min</Text>
            </View>
            <View style={styles.circuitInfo}>
                <Image source={Images.dumbell} style={{height:16,width:16,tintColor:'#c7c7c7'}}/>
                <Text style={{color:'#fff'}}>x{9}</Text>
            </View>
        </LinearGradient>
        </View>
        
    </TouchableOpacity>
  )
}


export default WorkoutCard;

const styles = new StyleSheet.create({
    cardContainer : {
        width:sw*0.42,
        height:sh*0.2,
        borderRadius:4,
        marginRight:'5%',
        marginVertical:'2.5%',
    },

    title : {
        fontSize:20,
        color:'#fff'
    },

    time : {
        width:'50%',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:4,
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        padding:4,
        justifyContent:'space-around'
    },

    circuitInfo:{
        position:'absolute',
        width:'40%',
        height:36,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding:4,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:4,
        marginHorizontal:'10%',
        bottom:0,
        marginBottom:'5%'
    }
})