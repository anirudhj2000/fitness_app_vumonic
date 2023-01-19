import React ,{useEffect, useState}from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList,ActivityIndicator, ImageBackground,TouchableOpacity,Dimensions} from 'react-native';
import WorkoutCard from '../components/workoutCard';
import firestore from '@react-native-firebase/firestore';
import Images from '../../util/images';


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Workouts = (props) => {
  const [workoutList, setWorkoutList] = useState([]);
  const [viewToggle, setViewToggle] = useState(true);

  const handleWorkoutClick = (id) => {
        props.navigation.navigate('ViewWorkout',{
            id
        })
  }

  const getWorkouts = async() => {


    await firestore()
    .collection('workouts')
    .get()
    .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        console.log(workoutList)
        let arr = []
        var tempObj = {}
        querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            tempObj = documentSnapshot.data();
            tempObj['id'] = documentSnapshot.id
            arr = [...arr,tempObj]
            setWorkoutList(arr)
            console.log("arr", arr)
        });
        
    });

    setViewToggle(false)
  }

  useEffect(() => {
    setWorkoutList([]);
    getWorkouts();
    
  },[])

  return (
    
    <View style={{height:sh*0.92,width:'100%',backgroundColor:'#0b1229'}}>
        { viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            : 
            <>
            <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{fontSize:32,color:'#fff'}}>Workouts</Text>
                    </View>
                    <View style={styles.homeCircuits} >
                    <FlatList
                        data={workoutList}
                        renderItem={({ item }) => (
                        <WorkoutCard
                            onPress={() => {handleWorkoutClick(item.id)}}
                            time ={item.exercises.length}
                            sets = {item.exercises.length}
                            title={`${item.title}`}/>
                        )}
                        //Setting the number of column
                        style={{flexGrow:1}}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                    />
                    </View>
                    
            </View>
            <TouchableOpacity style={{position:'absolute',right:0,bottom:0,marginHorizontal:'2.5%',marginVertical:'4%'}} onPress={() => {props.navigation.navigate('CreateWorkout')}}>
                <ImageBackground style={{height:sh*0.075,width:sh*0.075}} source={Images.add} />
            </TouchableOpacity>
            </>
        }
   </View>
  
  )
}

export default Workouts

const styles = new StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#0b1229'
    },

    title : {
        marginHorizontal:'5%',
        marginTop:'5%',
        marginBottom:'2.5%'
    },

    homeCircuits : {
        width:'90%',
        alignSelf:'center',
        marginTop:'2.5%',
        display:'flex',
        flexDirection:'column',
    },
})