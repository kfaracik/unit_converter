import React, { FunctionComponent } from "react";

// screens
import Welcome from "../screens/Welcome";
import ConverterScreen from "../screens/ConverterScreen";

// custom components
import { colors } from "../components/colors";

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
                }}
                initialRouteName="Welcome"
            >
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                // navigation={navigation}
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
