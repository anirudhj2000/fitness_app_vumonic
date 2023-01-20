import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../util/images';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const WorkoutCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.cardContainer}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2}}     
            style={{height:'100%',width:'100%',borderRadius:4,padding:12}} 
            colors={['#2C3E50', '#FD746C']}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <View style={styles.time}>
                <View style={styles.timeStyle}>
                    <Image source={Images.clock} style={{height:16,width:16,marginRight:8}}/>
                    <Text style={{color:'#fff',fontSize:14}}>{props.time} mins</Text>
                </View>
                <View style={[styles.timeStyle,{marginTop:8}]}>
                    <Image source={Images.dumbell} style={{height:16,width:16,marginRight:8}}/>
                    <Text style={{color:'#fff',fontSize:14}}>{props.sets} exercises</Text>
                </View>
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
        fontSize:24,
        color:'#fff'
    },

    time : {
        width:'80%',
        borderRadius:4,
        flexDirection:'column',
        display:'flex',
        alignItems:'flex-start',
        backgroundColor:'rgba(0,0,0,0.3)',
        padding:12,
        position:'absolute',
        right:0,
        bottom:0,
        margin:16,
        justifyContent:'center',
    },

    timeStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
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