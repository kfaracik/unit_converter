import React, { FunctionComponent } from "react";

// screens
import Welcome from "../screens/Welcome";
import HomeScreen from "../screens/HomeScreen";
import ConverterScreen from "../screens/ConverterScreen";

// custom components
import { colors } from "../components/colors";
import Greeting from "../components/Header/Greeting";
import Profile from "../components/Header/Profile";
import Avi from "../assets/avi/avatar.png"

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
    Home: undefined;
    Welcome: undefined;
    Converter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.graylight,
                        borderBottomWidth: 0,
                        shadowColor: "transparent",
                        shadowOpacity: 0,
                        elevation: 0,
                        height: 120,    
                    },
                    headerTintColor: colors.secondary,
                    headerRightContainerStyle: {
                        paddingEnd: 25,
                    },
                    headerLeftContainerStyle: {
                        paddingStart: 10,
                    },
                    // TODO add dolar icon!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // headerRight: () => (
                    //     <Profile
                    //         img={Avi}
                    //         imgContainerStyle={{ backgroundColor: colors.tertiary }}
                    //     />
                    // ),
                }}
                // initialRouteName="Home"
                initialRouteName="Converter"
            >
                <Stack.Screen 
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{ 
                        headerTitle: (props) => (
                            <Greeting 
                                mainText="Hey Luke!"
                                subText="Welcome back"
                                {...props}
                            />
                        ),
                        headerLeft: () => <></>,
                    }}
                />
                <Stack.Screen
                    name="Converter"
                    component={ConverterScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;
