import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './stacks/MainStack';


const AppContainer = () => {
    return (
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
    );
};

export default AppContainer;
