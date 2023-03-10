import React, { useState } from 'react'
import {View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import auth from '@react-native-firebase/auth';
import Images from '../../util/images';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [viewToggle, setViewToggle] = useState(false);
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

        if(!validateEmail(email)){
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : "Please enter valid email",
                position:'bottom',
                visibilityTime:2000
            });
        }

        if(!validatePassword(password)){
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : "Please enter valid password",
                position:'bottom',
                visibilityTime:2000
            });
            return;
        }

        setViewToggle(true)
        if(password != confirmPassword){
            setErrorStatusPassword2(true);
            setErrorMsgPass("Passwords do not match");
            return;
        }
        if(email!=null && password!=null){
            auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            let userUid = user.user.uid
            const account = {
                useruid: userUid,
                email: user.user.email
            }

            console.log(account);

            firestore().collection('accounts').doc(userUid).set(account);
            firestore().collection('workoutsCollection').doc(userUid).set(account);
            postSignupChange()
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2 : error.code,
                    position:'bottom',
                    visibilityTime:2000
                });
                setViewToggle(false)
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2 : error.code,
                    position:'bottom',
                    visibilityTime:2000
                });
                setViewToggle(false)
            }

            console.error(error);

            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : error.code,
                position:'bottom',
                visibilityTime:2000
            });
            setViewToggle(false)
        });
        }
        else{
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2 : error.code,
                position:'bottom',
                visibilityTime:2000
            });
        }   
    }

    const postSignupChange = async() => {
        Toast.show({
            type: 'success',
            text1: 'Sucess',
            text2 : 'Account created successfully!',
            position:'bottom',
            visibilityTime:2000
        });

        setEmail("");
        setPassword("");
        setConfirmPassword("");

        auth()
        .signOut()
        .then(() => {
            setViewToggle(false)
            props.navigation.navigate('Login')
        });
    }

    return (
        <View style={styles.body}>
            <Toast
            bottomOffset={40}
            />
            <View style={styles.titleBody}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}>
                    <Image source={Images.left_arrow} style={{height:24,width:24,marginRight:'3%',tintColor:'#fff'}}/>
                </TouchableOpacity>
                
                <Text style={styles.titleText}>Sign up</Text>
            </View>
            <View style={styles.loginBody}>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Email</Text>
                        {errorStatus && <Text style={styles.errorTag}>{`Enter valid email`}</Text>}
                    </View>
                    <TextInput style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Email" value={email} onChangeText={(val) => {handleEmailChange(val)}} placeholderTextColor={'#000'}/>
                </View>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Password</Text>
                        {errorStatusPassword && <Text style={styles.errorTag}>{"Enter valid password"}</Text>}
                    </View>
                    <TextInput secureTextEntry={true} value={password} onChangeText={(val) => handlePasswordChange(val)} style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Password" placeholderTextColor={'#000'} />
                </View>
                <View style={[styles.inputView]}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Confirm password</Text>
                        {errorStatusPassword2 && <Text style={styles.errorTag}>{errorMsgMail}</Text>}
                    </View>
                    <TextInput secureTextEntry={true} value={confirmPassword} onChangeText={(text) => {setConfirmPassword(text)}} style={[styles.inputBox,{borderRadius:4}]} placeholder="Enter Password" placeholderTextColor={'#000'}/>
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

            { viewToggle ?
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            : null
            }

            {/* <View style={styles.accountCreated}>
                <Text style={{fontSize:16,color:'#048f37'}}>Account created successfully!</Text>
                <Text style={{fontSize:12,color:'#048f37'}}>Please go back and login to continue.</Text>
            </View> */}


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
        paddingHorizontal:8,
        color:'#000',
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
        marginVertical:'5%',
        borderColor:'#048f37',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
    }
})