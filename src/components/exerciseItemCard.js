import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native';
import Images from '../../util/images';


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const ExerciseItemCard = (props) => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:18,color:'#000',marginHorizontal:'5%'}}>{props.title}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            {/* <Text>Sets</Text> */}
            <Text>Sets : </Text>
            <View style={{flexDirection:'row',marginTop:'2.5%',marginHorizontal:'5%'}}>
                    <TouchableOpacity onPress={props.onPressSubtract}>
                        <Image source={Images.minus} style={{height:24,width:24}}/>
                    </TouchableOpacity>
                    <Text style={{width:24,textAlign:'center',fontSize:16,color:'#000'}}>{props.sets}</Text>
                    <TouchableOpacity onPress={props.onPressAdd} >
                        <Image source={Images.add_1} style={{height:24,width:24}}/>
                    </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={props.onPressDelete} style={{marginLeft:'5%'}}>
                <Image source={Images.delete} style={{height:24,width:24,tintColor:'red'}} />    
            </TouchableOpacity>    
        </View>
    </View>
  )
}

export default ExerciseItemCard;

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