import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IDHome from './IDHome';
import PersonalID from './PersonalID';
import IDCreate from './IDCreate';

const Stack = createStackNavigator();

export const IDView = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName={"IDHome"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="IDHome" component={IDHome} />
            <Stack.Screen name="PersonalID" component={PersonalID} />
            <Stack.Screen name="IDCreate" component={IDCreate} />
        </Stack.Navigator>
        
    );
}