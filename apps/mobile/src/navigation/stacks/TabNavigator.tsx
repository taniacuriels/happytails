import { TabNavigatorParamList } from '../../types/navigation';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Main } from '../../screens/Main';


const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TabNavigator = () => {

    return (
        <Tab.Navigator
            initialRouteName="first-tab"
            screenOptions={{headerShown: true, lazy: true}}
            backBehavior={'none'}>
              <Tab.Screen name="first-tab" component={Main} options={{
                  tabBarLabel: 'First',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
                  ),
              }}/>
        </Tab.Navigator>
    );
};
