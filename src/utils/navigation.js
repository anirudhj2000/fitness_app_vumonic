import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import Calendar from "../screens/calendar";
import Workouts from "../screens/workouts";
import Splash from "../screens/splash";
import {View, Image,Text} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import { StyleSheet } from "react-native";
import Signup from "../screens/signup";

const BottomTab = createBottomTabNavigator();

const BottomTabContainer = () => {
    return(
        <BottomTab.Navigator 
            defaultScreenOptions={Home}
            screenOptions={{
                tabBarShowLabel : false,
                tabBarStyle: 
                {
                    position: 'absolute',
                    bottom:0,
                    height : 70,
                    backgroundColor:'#0a0929'
                },
              }}>
            <BottomTab.Screen name="Home" component={Home} options={{headerShown:false,
               tabBarIcon : ({focused}) => (
                    <View style={styles.barView}>
                        <Image 
                            source={require('../assets/bell_1.png')}
                            resizeMode='contain'
                            style={focused?styles.iconStyleX:styles.iconStyle}
                            />
                        <Text style={{fontSize:12,color:focused?'#f76392':'#fff'}}>Notification</Text>
                    </View>
                ) }} />
            <BottomTab.Screen name="Workouts"component={Workouts}  options={{headerShown:false,
               tabBarIcon : ({focused}) => (
                    <View style={styles.barView}>
                        <Image 
                            source={require('../assets/camera.png')}
                            resizeMode='contain'
                            style={focused?styles.iconStyleX:styles.iconStyle}
                            />
                        <Text style={{fontSize:12,color:focused?'#f76392':'#fff'}}>Photo Upload</Text>
                    </View>
                ) }} />
            <BottomTab.Screen name="Calendar" component={Calendar} options={{headerShown:false,
               tabBarIcon : ({focused}) => (
                    <View style={styles.barView}>
                        <Image 
                            source={require('../assets/chat.png')}
                            resizeMode='contain'
                            style={focused?styles.iconStyleX:styles.iconStyle}
                            />
                        <Text style={{fontSize:12,color:focused?'#f76392':'#fff'}}>Chat</Text>
                    </View>
                ) }} />
        </BottomTab.Navigator>
    )
}

const Stack = createStackNavigator();
const StackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
            <Stack.Screen name='App' component={BottomTabContainer} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const NavContainer = () => {
    return(
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}

export default NavContainer;

const styles = new StyleSheet.create({

    barView : {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:80
    },

    iconStyle : {
        height:24,
        width:24,
        tintColor:'#fff',
    },

    iconStyleX : {
        height:24,
        width:24,
        tintColor:'#f76392',
        marginBottom:4,
        shadowColor:'#fff',
        backgroundColor:'#0a0929',
        elevation:4,
        shadowRadius:8,
        shadowOpacity:0.6,
        shadowOffset:{height:24,width:24}
    }

})  