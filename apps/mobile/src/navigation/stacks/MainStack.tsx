import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from '../../types/navigation';
import { TabNavigator } from './TabNavigator';
import { useStackNavigationScreenListeners } from '../../hooks/useStackNavigationScreenListeners';
import React from 'react';

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
    const screenListeners = useStackNavigationScreenListeners();

    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            screenListeners={screenListeners}
            initialRouteName="tabs">
            <Stack.Screen name="tabs" component={TabNavigator} />
        </Stack.Navigator>
    );
};
