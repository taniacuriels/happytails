import { Text, View } from 'react-native';
import { useStyles } from './styles';
import MessagingDemo from '../../components/MessagingDemo';
import AuthTest from '../../components/AuthTest';
import DomainTest from '../../components/DomainTest';

export const Main = () => {
    const styles = useStyles();
    
    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    { 'Main Screen'}
                </Text>
            </View>
            <DomainTest />
            <AuthTest />
            <MessagingDemo />
        </View>
    );
};
