import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,ActivityIndicator,Dimensions,TouchableOpacity, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Images from '../../util/images';
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import Weekdays from '../utils/constants';
import CalendarCard from '../components/calendarCard';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Calendar = () => {
  const isFocused = useIsFocused();
  const [viewToggle, setViewToggle] = useState(true);
  const [workoutList, setWorkoutList] = useState([]);
  const [weekList, setWeekList] = useState(Weekdays);

  useEffect(() => {
    setViewToggle(true)
    getWeeklyData();
    setWeekList(Weekdays);
    setWorkoutList([])
  },[isFocused])

  const getWeeklyData = async() => {
     let uid = auth().currentUser.uid;

     await firestore()
            .collection('workoutsCollection')
            .doc(uid)
            .collection('workout')
            .get()
            .then((querySnapshot) => {

                let arr = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempObj = documentSnapshot.data();
                    tempObj['id'] = documentSnapshot.id
                    arr = [...arr,tempObj]
                    setWorkoutList(arr)
                    console.log("arr", arr)
                    getWeekObj();
                })
            }).catch((err) => console.log(err));

    setViewToggle(false)
  }

  const getWeekObj = () => {
    let temp = weekList
    for(let i=0;i<workoutList.length;i++){
        temp.forEach((item) => {
            console.log(workoutList[i].week)
            console.log(item)
            if(workoutList[i].week.indexOf(item.val)>-1){
                item["workout"] = [];
                item.workout.push({
                    title : workoutList[i].title
                })
                
            }
        })
    }
    setWeekList(temp);
    console.log(temp);
  }

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Calendar</Text>
        <View style={styles.currWeek}>
            <Text style={{color:'#fff',fontSize:24}}>This week</Text>
        </View>

        { viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            : 
            <View style={styles.weekdays}>
                {
                    weekList.map((item) => {
                        console.log("hushu",item)
                        return(
                            <View style={styles.weekday}>
                                <Text style={{color:'#c7c7c7'}}>{item.val}</Text>
                                <View style={{borderBottomWidth:1,borderBottomColor:'#c7c7c7',width:'100%'}}/>
                                <ScrollView horizontal={true} style={{width:'100%'}}>
                                    {
                                        item.workout ? 
                                        item.workout.map((item1) => {
                                            
                                            return(
                                                <CalendarCard title={item1.title}/>
                                            )
                                        }) : null
                                    }
                                </ScrollView>
                            </View>
                        )
                    })
                }
            </View>
        }
    </View>
  )
}

export default Calendar;

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
        marginHorizontal:'5%',
        marginVertical:'5%'
    },

    currWeek : {
        marginHorizontal:'5%',
    },

    weekdays : {
        alignSelf:'center',
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'2.5%'
    },

    weekday : {
        height:sh*0.08,
        marginVertical:'2%',
        width:'100%'

    }

})