import React,{useReducer,useEffect, useState} from 'react';
import { View,StyleSheet,Dimensions,TouchableOpacity,Image,Text, TextInput, Modal,} from 'react-native';
import Images from '../../util/images';
import { RadioGroup } from 'react-native-radio-buttons-group';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const CreateWorkout = () => {
  
  const [toggle, setToggle] = useState(false);
  const [frequencyRadio, setFrequency] = useState([
    {
        id: '1', 
        label: 'This week',
        value: 'thisweek'
    },
    {
        id: '2',
        label: 'Every Week',
        value: 'everyweek'
    }
  ]); 

  const onPressRadioButton = (radioButtonsArray) => {
    setFrequency(radioButtonsArray);
    console.log(frequencyRadio)
  }

  const HandleBackPress = () => {
    props.navigation.pop();
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity onPress={() => {HandleBackPress()}}>
                <Image source={Images.left_arrow} style={{height:20, width:20,opacity:0.5,tintColor:'#fff'}} />
            </TouchableOpacity>
            <Text style={{fontSize:24,color:'#fff',marginHorizontal:'5%'}}>Create Workout</Text>
        </View>
        <View style={styles.createBody}>
            <View style={styles.title}>
                <TextInput 
                    placeholder='Enter title' 
                    placeholderTextColor={'#fff'} 
                    style={{color:'#fff',fontSize:20}}/>
            </View>
            <View style={styles.frequency}>
                <Text style={{fontSize:16,marginHorizontal:4,color:'#fff'}}>Frequency :</Text>
                <RadioGroup 
                    layout='row'
                    radioButtons={frequencyRadio} 
                    onPress={onPressRadioButton}
                />
            </View>
            <Text style={{color:'#fff',marginVertical:'5%',fontSize:24}}>Add Exercises</Text>
        </View>


        
    </View>
  )
}

export default CreateWorkout;

const styles = new StyleSheet.create({
    container : {
        height : '100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#0b1229',
    },

    header:{
        height:sh*0.05,
        width:'90%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        marginTop:'5%',
        display:'flex',
        alignItems:'center'
    },

    createBody : {
        width:'90%',
        alignSelf:'center',
        height:'100%',
        marginVertical:'5%'
    },
    title : {
        marginTop:'5%',
        padding:3,
        borderRadius:4,
        backgroundColor:'#28335e'
    },

    frequency : {
        marginTop:'5%',
        paddingHorizontal:4,
        paddingVertical:8,
        borderRadius:4,
        width:'100%',
        backgroundColor:'#28335e',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
})