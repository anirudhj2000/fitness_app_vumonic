import React,{useReducer,useEffect, useState} from 'react';
import { View,StyleSheet,Dimensions,TouchableOpacity,Image,Text, TextInput, Modal, ScrollView,Keyboard,KeyboardAvoidingView, Alert} from 'react-native';
import Images from '../../util/images';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Exercises } from '../utils/constants';
import ExerciseItemCard from '../components/exerciseItemCard';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message'

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    DELETE: 'delete',
    ADD:'add',
    CLEAR:'clear'
  }
  
  function reducer(workoutList, action) {
    switch (action.type) {
      case ACTIONS.INCREMENT:
        return workoutList.map((item) => {
            console.log("increment",item.id,action.payload.id);
            if(item.id == action.payload.id){
                return {...item, sets : item.sets+1}
            }
            return item;
        })
      case ACTIONS.DECREMENT:
        return workoutList.map((item) => {
            console.log("decrement",item.id,action.payload.id);
            if(item.id == action.payload.id){
                if(item.sets>0){
                    return {...item, sets : item.sets-1}
                }
                else{
                    return item;
                }
            }
            return item;
        })
      case ACTIONS.DELETE:
        return workoutList.filter((item) => {
            console.log()
            if(item.id != action.payload.id){
                return item;
            }
        })
      case ACTIONS.ADD:
        return [...workoutList,action.payload]
      case ACTIONS.CLEAR:
        return [];
      default:
        return workoutList
    }
  }

const CreateWorkout = (props) => {
  
  const [workoutList, dispatch] = useReducer(reducer, [])
  const [toggle, setToggle] = useState(false);
  const [exercise, setExercise] = useState("");
  const [title, setTitle] = useState("");
  const [exerciseList, setExerciseList] = useState(Exercises);
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

  const handleExerciseItemClick = (item) => {
    Keyboard.dismiss();
    setToggle(false);
    setExercise(item)
  }

  const handleAddExercise = () => {
    // if no exercise is selected
    if(!exercise){
        return;
    }

    // if exercise already exists
    let checkIfAlreadyExists = workoutList.filter((item) => {
        if(item.title == exercise){
            return item.title;
        }
    })
    if(checkIfAlreadyExists.length>0){
        setExercise("");
        return;
    }

    dispatch({type : ACTIONS.ADD , payload : {title : exercise , sets : 0, id : workoutList.length +1}})
    setExercise("");
    setExerciseList(Exercises);
    console.log("workoutList " + JSON.stringify(workoutList))
  }

  const handleTextChange = (text) => {
    const arr = Exercises.filter((item) => {
        var temp1 = item.toLowerCase()
        var temp2 = text.toLowerCase()
        if(temp1.includes(temp2)){
            return item;
        }

    });
    setExerciseList(arr);
    setExercise(text)
  }

  //handle add data to firestore
  const PushToFireStore = async() => {

    let finalObj = {};
    let frequency = ""
    frequencyRadio.map((item) => {
        if(item.selected){
            frequency = item.value
        }
    })

    if(!frequency){
        console.log("style veru")
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : 'Select frequency of the workout',
            position:'top',
            visibilityTime:2000
        });
        return ;
    }
    
    if(!title){
        console.log("style veru")
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : 'Please enter valid workout title',
            position:'top',
            visibilityTime:2000
        });
        return ;
    }

    if(!workoutList){
        console.log("style veru")
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : 'Cannot add empty workout, Please add exercises',
            position:'top',
            visibilityTime:2000
        });
        return ;
    }
    finalObj["title"] = title;
    finalObj["exercises"] = workoutList;

    firestore()
    .collection('workouts')
    .add(finalObj)
    .then(() => {
        handleClear();
        props.navigation.navigate('Workouts')
        console.log('User added!');
    });
  }

  const handleClear = () => {
    dispatch({type : ACTIONS.CLEAR});
    setTitle("");
    setExercise("");
    setExerciseList(Exercises);
  }

  return (
    <View style={styles.container}>
        <Toast
        bottomOffset={20}
        />
       <View style={styles.header}>
            <TouchableOpacity onPress={() => {HandleBackPress()}}>
                <Image source={Images.left_arrow} style={{height:20, width:20,opacity:0.5,tintColor:'#fff'}} />
            </TouchableOpacity>
            <Text style={{fontSize:24,color:'#fff',marginHorizontal:'5%'}}>Create Workout</Text>
        </View>
        <View style={styles.createBody}>
            <View style={styles.title}>
                <TextInput 
                    value={title}
                    placeholder='Enter title'
                    onChangeText={(val) => setTitle(val)}
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
            {/* <View style={styles.frequency}>
                <Text style={{fontSize:16,marginHorizontal:4,color:'#fff'}}>Frequency :</Text>
                <RadioGroup 
                    layout='row'
                    radioButtons={frequencyRadio} 
                    onPress={onPressRadioButton}
                /> */}
            {/* </View> */}
            <Text style={{color:'#fff',marginVertical:'5%',fontSize:24}}>Add Exercises</Text>
            <KeyboardAvoidingView keyboardVerticalOffset={sh*0.2}>
                <View style={[styles.title,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                    <TextInput 
                        onFocus={() => {setToggle(true)}} 
                        value={exercise} 
                        placeholder='Click to add exercises'
                        placeholderTextColor={'#fff'} style={{color:'#fff',fontSize:16,paddingHorizontal:8}}
                        onChangeText={(val) => {handleTextChange(val)}}/>

                    <TouchableOpacity onPress={() => {handleAddExercise()}} style={{marginHorizontal:'2.5%'}}>
                       <Image source={Images.plus} style={{height:20,width:20,tintColor:'#fff'}} />
                    </TouchableOpacity>
                </View>
                { toggle ?
                <ScrollView style={{height:sh*0.2,width:'100%',marginVertical:'2.5%',backgroundColor:'#28335e',flexGrow:0}}>
                    {
                        exerciseList.map((item) => {
                            return(
                                <TouchableOpacity onPress={() => {handleExerciseItemClick(item)}}>
                                    <Text style={{color:'#fff',fontSize:16,marginHorizontal:4,padding:4}}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                
                </ScrollView>:null
                }
            </KeyboardAvoidingView>
            <View style={{marginVertical:'5%'}}>
            {
              workoutList.length > 0 ? workoutList.map((item) => {
                    console.log(JSON.stringify(workoutList))
                    return(
                        <ExerciseItemCard 
                            title={item.title}
                            sets ={item.sets}
                            onPressAdd={() => {dispatch({type : ACTIONS.INCREMENT,payload : {id : item.id}})}}
                            onPressSubtract={() => {dispatch({type : ACTIONS.DECREMENT,payload : {id : item.id}})}} 
                            onPressDelete={() => {dispatch({type : ACTIONS.DELETE,payload : {id : item.id}})}}/>
                    )
                }) : null
            }
            </View>
           
        </View>
        <View style={{position:'absolute',display:'flex',flexDirection:'row',bottom:80,right:0}}>
                <TouchableOpacity onPress={() => {handleClear()}} style={{borderColor:'#de5f6c',borderWidth:1,paddingHorizontal:20,paddingVertical:12,borderRadius:4}}>
                    <Text style={{color:'#de5f6c',fontSize:16}}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {PushToFireStore()}} style={{backgroundColor:'#5fde74',paddingHorizontal:20,paddingVertical:12,marginHorizontal:12,borderRadius:4}}>
                    <Text style={{color:'#fff',fontSize:16}}>Save</Text>
                </TouchableOpacity>
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