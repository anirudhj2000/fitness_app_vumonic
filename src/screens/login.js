import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text,TextInput, Dimensions, Animated,StyleSheet,ActivityIndicator,BackHandler,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Login = (props) => {

  const [viewToggle, setViewToggle] = useState(true);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMsgMail, setErrorMsgMail] = useState("Enter valid email!");
  const isFocused = useIsFocused();

  const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log(reg.test(email) === false)
    if (reg.test(email) === false) {
      return false;
    }
    else {
        return true;
    }
}

useEffect(() => {
    setEmail("");
    setPassword("");
    checkUserExists()
},[isFocused])

useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {backHandler.remove()}

  },[])

const handleEmailChange = (email) => {
    const validateStatus = validateEmail(email);
    setErrorStatus(!validateStatus);
    setEmail(email);
    console.log(email);
}



const checkUserExists = () => {
    // setViewToggle(false)
    console.log("check if user exists")
        auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("user exists",user)
            props.navigation.navigate('App',{screen:'Home'})
            setViewToggle(false);
        }
    });  
  setViewToggle(false);
}

const handleSignup = () => {
    props.navigation.navigate('Signup')
}

const handleLogin2 = () => {
    props.navigation.navigate('App',{screen:'Home'})
}

const handleLogin = async() => {

    setViewToggle(true);

    if(!email.length>0){
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : 'That email address is invalid!',
            position:'bottom',
            visibilityTime:2000
        });
        setViewToggle(false)
        return;
        
    }

    if(!password.length>0){
        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : 'Please enter the password',
            position:'bottom',
            visibilityTime:2000
        });
        setViewToggle(false)
        return;
    }
    console.log("email" + email);
    console.log("password" + password);
    if(email!=null && password!=null){
        await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        props.navigation.navigate('App',{screen:'Notification}'})
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : 'That email address is already in use!',
                position:'bottom',
                visibilityTime:2000
            });
        
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : 'That email address is invalid!',
                position:'bottom',
                visibilityTime:2000
            });
             
        }

        Toast.show({
            type: 'error',
            text1: 'Error!',
            text2 : error.code,
            position:'bottom',
            visibilityTime:2000
        });
        setViewToggle(false);
    });
    }
    else{
        setViewToggle(false);
        console.log("error")
    }   
}
  
  return (
    <View style={styles.body}>
        <Toast
        bottomOffset={40}
        />
        { viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            : 
            <>
        <View style={{ height: sh*0.1, width: sh*0.1,marginTop:'20%',marginBottom:'10%',alignSelf:'flex-start',marginHorizontal:'10%',backgroundColor:'#000',borderRadius:16}}>
            <LinearGradient
            colors={['#647DEE','#7F53AC']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={{ height: sh*0.1, width: sh*0.1, alignItems: 'center', justifyContent: 'center',borderRadius:6}}>
                <View style={{ height: sh*0.09, width: sh*0.09, alignItems: 'center', justifyContent: 'center',backgroundColor:'#09162b',borderRadius:6}}>
                    <Text style={{fontSize:48,color:'#fff'}}>V</Text>
                </View>
            </LinearGradient>
        </View>
        <View style={styles.titleHeader}>
            <Text style={{color:'#fff',fontSize:24,marginTop:8}}>Login</Text>
            <Text style={{color:'#fff',fontSize:16,marginVertical:4}}>Please sign in to continue</Text>
        </View>
        <View style={styles.loginBody}>
            <View style={[styles.inputView,{marginTop:'7%'}]}>
                <View style={styles.labelView}>
                    <Text style={styles.label}>Email</Text>
                    {errorStatus && <Text style={styles.errorTag}>{errorMsgMail}</Text>}
                </View>
                <TextInput style={[styles.inputBox,{borderRadius:4}]} value={email} onChangeText={(val) => {handleEmailChange(val)}} placeholder="Enter Email" placeholderTextColor={'#000'} />
            </View>
            <View style={[styles.inputView]}>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={true} style={[styles.inputBox,{borderRadius:4}]} value={password} onChangeText={(val) => setPassword(val)} placeholder="Enter Password" placeholderTextColor={'#000'} />
                {/* <TouchableOpacity>
                    <Text style={{textDecorationLine:'underline',color:'#bdbdbd'}}>Forgot password?</Text>
                </TouchableOpacity> */}
            </View>
        </View>
        <TouchableOpacity  style={styles.loginButton} onPress={() => {handleLogin()}}>
            <View>
                <Text style={{color:'#000'}}>Log in</Text>
            </View>
        </TouchableOpacity>
        <View style={{width:'100%',marginVertical:'5%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{borderBottomColor:'#fff',borderBottomWidth:1,width:'40%'}}/>
            <View style={{borderWidth:1,color:'#fff',width:30,height:30,borderRadius:20,borderColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:10}}>OR</Text>
            </View>
            <View style={{borderBottomColor:'#fff',borderBottomWidth:1,width:'40%'}}/>
        </View>
        <TouchableOpacity  style={[styles.loginButton,{marginTop:'1%'}]} onPress={() => {handleSignup()}}>
            <View>
                <Text style={{color:'#000'}}>Sign up</Text>
            </View>
        </TouchableOpacity>

        </>
        }
        
    </View>
  )
}

export default Login

const styles = new StyleSheet.create({
    body : {
        height : sh,
        width : sw,
        backgroundColor : '#071224',
        display :'flex',
        alignItems:'center'
    },

    titleHeader : {
        width:sw*0.8,
    },

    loginBody : {
        backgroundColor:'#182c4d',
        height:sh*0.3,
        width:sh*0.4,
        marginVertical:'2%',
        borderRadius:8,
        display:'flex',
        alignItems:'center'
    },

    loginButton : {
        width:sw*0.8,
        height:sh*0.05,
        backgroundColor:'#fff',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%'
    },

    inputView : {
        width:'90%',
        marginVertical:'2%'
    },

    label : {
        fontSize : 14,
        color:'#fff'
    },

    inputBox : {
        marginVertical:4,
        backgroundColor:'#fff',
        paddingHorizontal:8,
        color:'#000',
    },

    labelView : {
        width:'100%',
        display:'flex',
        flexDirection:'row',
    },

    errorTag : {
        fontSize:12,
        paddingHorizontal:'5%',
        paddingVertical:1,
        color:'#bb0000',
        backgroundColor:'#dbabad',
        marginHorizontal:'5%',
        borderRadius:4,
    },
    
})