import React, { useState } from 'react'
import {View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity,Image} from 'react-native'
import auth from '@react-native-firebase/auth';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMsgMail, setErrorMsgMail] = useState("Enter valid email!");
    const [errorStatusPassword, setErrorStatusPassword] = useState(false);
    const [errorStatusPassword2,setErrorStatusPassword2] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsgPass, setErrorMsgPass] = useState("Enter a strong password");
    
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

    const handleEmailChange = (email) => {
        const validateStatus = validateEmail(email);
        setErrorStatus(!validateStatus);
        setEmail(email);
        console.log(email);
    }

    const validatePassword = (password) => {
        let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if(password.match(check)){
            return true;
        } 
        else {
            return false;
        }
    }

    const handlePasswordChange = (password) => {
        setPassword(password);
        let passStatus = validatePassword(password);
        setErrorStatusPassword(!passStatus)
    }

    const handleSignup = () => {

        // if(!validatePassword(password)){
        //     return;
        // }

        // if(!validateEmail(email)){
        //     return;
        // }

        if(password != confirmPassword){
            setErrorStatusPassword2(true);
            setErrorMsgPass("Passwords do not match");
            console.log("Passwords match "+password+confirmPassword)
            return;
        }
        console.log("email" + email);
        console.log("password" + password);
        if(email!=null && password!=null){
            auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            postSignupChange()
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
        }
        else{
            console.log("error")
        }   
    }

    const postSignupChange = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    }

    return (
        <View style={styles.body}>
            <View style={styles.titleBody}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}>
                    <Image source={require('../assets/left-arrow.png')} style={{height:24,width:24,marginRight:'3%',tintColor:'#fff'}}/>
                </TouchableOpacity>
                
                <Text style={styles.titleText}>Sign up</Text>
            </View>
            <View style={styles.loginBody}>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Email</Text>
                        {errorStatus && <Text style={styles.errorTag}>{errorMsgMail}</Text>}
                    </View>
                    <TextInput style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Email" value={email} onChangeText={(val) => {handleEmailChange(val)}}/>
                </View>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Password</Text>
                        {errorStatusPassword && <Text style={styles.errorTag}>{"Enter valid password"}</Text>}
                    </View>
                    <TextInput secureTextEntry={true} value={password} onChangeText={(val) => handlePasswordChange(val)} style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Password" />
                </View>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Confirm password</Text>
                        {errorStatusPassword2 && <Text style={styles.errorTag}>{errorMsgMail}</Text>}
                    </View>
                    <TextInput secureTextEntry={true} value={confirmPassword} onChangeText={(text) => {setConfirmPassword(text)}} style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Password" />
                </View>

                
            </View>
            <TouchableOpacity  style={styles.loginButton} onPress={() => {handleSignup()}}>
                <View>
                    <Text style={{color:'#000'}}>Sign up</Text>
                </View>
            </TouchableOpacity>


            {/* Text for the password requirements */}
            <View style={styles.passReq}>
                <Text style={{color:'#fff',fontSize:16}}>Password requirements</Text>
                <Text style={{color:'#fff',fontSize:12,marginTop:'2%'}}>{`\u2022 ${" Min. 8 characters"}`}</Text>
                <Text style={{color:'#fff',fontSize:12}}>{`\u2022 ${" Alphanumeric text"}`}</Text>
                <Text style={{color:'#fff',fontSize:12}}>{`\u2022 ${" First letter should not be number"}`}</Text>
                <Text style={{color:'#fff',fontSize:12}}>{`\u2022 ${" Symbol(~`!@#$%^&*()_-+={[}]|\)"}`}</Text>
            </View>

            <View style={styles.accountCreated}>
                <Text style={{fontSize:16,color:'#048f37'}}>Account created successfully!</Text>
                <Text style={{fontSize:12,color:'#048f37'}}>Please go back and login to continue.</Text>
            </View>


        </View>
  )
}

export default Signup;

const styles = new StyleSheet.create({
    body : {
        height : sh,
        width : sw,
        backgroundColor : '#071224',
        display :'flex',
        alignItems:'center'
    },

    loginBody : {
        backgroundColor:'#182c4d',
        paddingVertical:16,
        width:sh*0.4,
        marginVertical:'2%',
        borderRadius:8,
        display:'flex',
        alignItems:'center'
    },

    titleBody : {
        width:sw*0.9,
        alignSelf:'center',
        marginVertical:'5%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },

    titleText : {
        fontSize:32,
        color:'#fff',
        fontWeight:'bold'
    },

    inputView : {
        width:'90%',
        marginBottom:'5%'
    },

    label : {
        fontSize : 14,
        color:'#fff'
    },

    inputBox : {
        marginVertical:4,
        backgroundColor:'#fff',
        paddingHorizontal:8
    },

    loginButton : {
        width:sw*0.8,
        height:sh*0.05,
        backgroundColor:'#fff',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%'
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

    passReq : {
        height:sh*0.15,
        width:sw*0.8,
        backgroundColor:'#fff',
        marginTop:'5%',
        borderRadius:4,
        backgroundColor:'#353954',
        paddingVertical:12,
        paddingHorizontal:16,
    },

    accountCreated : {
        width:sw*0.8,
        height:sh*0.05,
        zIndex:2,
        backgroundColor:'#0b3019',
        borderWidth:1.5,
        marginVertical:'2%',
        position:'absolute',
        bottom:0,
        borderColor:'#048f37',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'10%',
        borderRadius:8,
    }
})