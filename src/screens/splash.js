import React from 'react'
import { useEffect} from 'react';
import { View,Text,Animated,StyleSheet,ActivityIndicator,Dimensions} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Splash = (props) => {


  useEffect(() => {
    setTimeout(() => {
        props.navigation.navigate('Login')
    },3000) 
  },[])

  return (
    <View style={styles.body}>
        <View style={{ height: sh*0.3, width: sh*0.3, alignItems: 'center', justifyContent: 'center',backgroundColor:'#000',borderRadius:16}}>
            <LinearGradient
            colors={['#647DEE','#7F53AC']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={{ height: sh*0.3, width: sh*0.3, alignItems: 'center', justifyContent: 'center',borderRadius:16}}
            >
                <View style={{ height: sh*0.29, width: sh*0.29, alignItems: 'center', justifyContent: 'center',backgroundColor:'#09162b',borderRadius:16}}>
                    <Text style={{fontSize:128,color:'#fff'}}>V</Text>
                    <Text style={{fontSize:20,color:'#fff'}}>Vunomic Assignment</Text>
                </View>
            </LinearGradient>
        </View>
        <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
        
    </View>
  )
}

const styles = new StyleSheet.create({
    body : {
        backgroundColor :'#071224',
        height: sh,
        width:sw,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Splash