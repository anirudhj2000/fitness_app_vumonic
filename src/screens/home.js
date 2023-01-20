import React ,{useState,useEffect}from 'react';
import { Text, View,StyleSheet,ScrollView,Dimensions,ActivityIndicator, TouchableOpacity} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Instructions } from '../utils/constants';
import InfoCards from '../components/infoCards';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Home = (props) => {

  const [viewToggle, setViewToggle] = useState(true);
  const [workouts, setWorkout] = useState(0);
  const [workoutList, setWorkoutList] = useState([]);
  const [todaysWorkout, setTodaysWorkout] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    getWorkoutSize()
  },[isFocused])

  const getWorkoutSize = async() => {
     let uid = auth().currentUser.uid;
     console.log(uid);

     await firestore()
            .collection('workoutsCollection')
            .doc(uid)
            .collection('workout')
            .get()
            .then((querySnapshot) => {
                setWorkout(querySnapshot.size)
                let arr = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempObj = documentSnapshot.data();
                    tempObj['id'] = documentSnapshot.id
                    arr = [...arr,tempObj]
                    setWorkoutList(arr)
                    console.log("arr", arr)
                });
                getTodaysWorkout()
            })

    setViewToggle(false);
    console.log(workouts)

  }

  const getTodaysWorkout = () => {
    let arr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date().getDay();
    let day = arr[d];

    var count =0;

    workoutList.forEach((item) => {
        console.log(item)
        if(item.week.indexOf(day)>-1){
            count++;
        }
    })

    setTodaysWorkout(count);
    
  }

  const handleLogout = () => {
    auth()
    .signOut()
    .then(() => {
        props.navigation.navigate('Login')
    });
  }
  
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>EasyFit</Text>
        { viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            : 
            <>
                <View style={styles.instructions}>
                    <Text style={{color:'#fff',fontSize:24,marginBottom:4}}>Instructions</Text>
                    {Instructions.map((item) => {
                        return(
                            <Text style={{color:'#fff',fontSize:14}}>{item}</Text>
                        )
                    })}
                </View>
                <View style={styles.stats}>
                    <Text style={{color:'#fff',fontSize:24}}>Workouts</Text>
                    <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:'5%',alignSelf:'center'}}>
                        <View style={{width:'30%',height:sh*0.1,backgroundColor:'#c7c7c7',borderRadius:4,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#000',fontSize:32}}>{workouts}</Text>
                            <Text>{'Workouts'}</Text>
                        </View>
                        <TouchableOpacity  onPress={() => {props.navigation.navigate('Workouts')}}>
                            <Text style={{color:'#0b78e6', textDecorationLine:'underline'}}>To workouts {`>>>`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.stats,{backgroundColor:'#0e3963'}]}>
                    <Text style={{color:'#fff',fontSize:24}}>Calendar</Text>
                    <Text style={{color:'#c7c7c7'}}>Upcoming workout</Text>
                    <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:'5%',alignSelf:'center',height:'auto'}}>
                        <View style={{paddingVertical:12,borderRadius:8,paddingHorizontal:12,backgroundColor:'#e67b60'}}>
                        <Text style={{fontSize:20,color:'#fff'}}>{todaysWorkout >0? `${todaysWorkout} Workout${todaysWorkout>1?`s`:``} today`: `No Workout today`}</Text>
                        </View>
                        <TouchableOpacity style={{marginTop:'15%'}} onPress={() => {props.navigation.navigate('Calendar')}}>
                            <Text style={{color:'#0b78e6', textDecorationLine:'underline'}}>To calendar {`>>>`}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <TouchableOpacity onPress={() => {handleLogout()}}  style={[styles.stats,{marginBottom:'20%',height:sh*0.07,justifyContent:'center',backgroundColor:'#fff'}]}>
                    <Text style={{fontSize:24,marginHorizontal:'5%'}}>Logout</Text>
                </TouchableOpacity>
            </>
        }
    </ScrollView>
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
    },

    instructions : {
        width:'90%',
        backgroundColor:'#6f4599',
        alignSelf:'center',
        borderRadius:8,
        marginTop:'10%',
        padding:12,
    },

    stats : {
        height:sh*0.2,
        width:'90%',
        backgroundColor:'#994562',
        alignSelf:'center',
        marginTop:'5%',
        borderRadius:8,
        padding:8
    }

})