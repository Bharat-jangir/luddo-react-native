import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import LuddoboardScreen from "../screens/LuddoboardScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import { navigationRef } from "../helpers/NavigationUtil";
import LuddoComputer from "../screens/LuddoComputer";


const Stack=createNativeStackNavigator();

function Navigation(){
    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
            initialRouteName="SplashScreen"
            screenOptions={()=>({
                headerShown:false,
            })}
            >
                <Stack.Screen name="LuddoBoardScreen" options={{
                    animation:'fade',
                }} component={LuddoboardScreen}/>
                <Stack.Screen name="LuddoComputer" options={{
                    animation:'fade',
                }} component={LuddoComputer}/>
                <Stack.Screen name="HomeScreen" options={{
                    animation:'fade',
                }} component={HomeScreen}/>
                <Stack.Screen name="SplashScreen" options={{
                    animation:'fade',
                }} component={SplashScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation