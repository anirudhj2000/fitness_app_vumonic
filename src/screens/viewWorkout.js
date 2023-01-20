import React ,{useEffect, useState}from 'react'
import { Text, View,StyleSheet, TouchableOpacity,Image,Dimensions,ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Images from '../../util/images';
import InfoCards from '../components/infoCards';
import ExerciseItemCard from '../components/exerciseItemCard';
import ExerciseSimple from '../components/ExerciseSimple';
import auth from '@react-native-firebase/auth';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const ViewWorkout = (props) => {
  const {id} = props.route.params
  const [viewToggle, setViewToggle] = useState(true);
  const [workout, setWorkout] = useState({})
  const [totals, setTotals] = useState({});

  useEffect(() => {
    console.log(id)
    getDocInfo(id);
  },[])

  const HandleBackPress = () => {
    props.navigation.pop();
  }

  const calculateTotals = () => {
    console.log("totals")
    let sets = 0;
    let exercises = 0;
    let time = 0;

    workout.exercises.map((item) => {
        sets += item.sets;
    })

    exercises = workout.exercises.length;

    time = sets*5,
    setTotals({
        sets : sets,
        exercises : exercises,
        time : time,
    })
  }

  const handleEdit = () => {
    props.navigation.navigate('CreateWorkout',{
        id : id,
        mode : 'edit'
    })
  }

  const getDocInfo = async(id) => {

    let uid = auth().currentUser.uid
    await firestore()
    .collection('workoutsCollection')
    .doc(uid)
    .collection('workout')
    .doc(id)
    .get()
    .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
        //   let temp = [];
        //   temp = [...temp,...documentSnapshot.data()]
          setWorkout(documentSnapshot.data())
        //   console.log(temp);
        }
    });
    setViewToggle(false);
    calculateTotals();
    console.log("called")
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {HandleBackPress()}}>
                <Image source={Images.left_arrow} style={{height:20, width:20,opacity:0.5,tintColor:'#fff'}} />
            </TouchableOpacity>
            <Text style={{fontSize:24,color:'#fff',marginHorizontal:'5%'}}>Views Workout</Text>

            <TouchableOpacity style={{position:'absolute',right:0,marginHorizontal:8}} onPress={() => {handleEdit()}}>
                <Image source={Images.edit} style={{height:20, width:20,tintColor:'#fff'}} />
            </TouchableOpacity>  
        </View>
        {
            viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
           :
           <View>
                {
                    totals ? 
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginVertical:'5%'}}>
                            <InfoCards title1="Exercises" title2={totals.exercises} />
                            <InfoCards title1="Sets" title2={totals.sets} />
                            <InfoCards title1="Time" title2={totals.time}title3="mins(approx)."/>
                        </View>
                        :
                        null   
                }
                <View style={{width:'90%',alignSelf:'center',marginVertical:'2.5%'}}>
                {
                    workout.exercises.map((item,key) => {
                        return(
                            <ExerciseSimple title={item.title} sets={item.sets}/>
                        )
                    })
                }
                </View>
           </View>
        }
    </View>
  )
}

export default ViewWorkout;

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
})