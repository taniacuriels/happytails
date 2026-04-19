import { Text, View } from 'react-native';
import { useStyles } from './styles';

export const Main = () => {
    const styles = useStyles();
    
    

    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    { 'Main Screen'}
                </Text>
            </View>
            
        </View>
    );
};
