import { NavigatorScreenParams } from '@react-navigation/native';

export type StackNavigatorParamList = MainStackParamList &
    TabNavigatorParamList

export type MainStackParamList = {
    tabs: NavigatorScreenParams<TabNavigatorParamList>;
}

export type FirstTabStackParamList = {
    first: undefined;
}


export type TabNavigatorParamList = {
    'first-tab': NavigatorScreenParams<FirstTabStackParamList>;
};
