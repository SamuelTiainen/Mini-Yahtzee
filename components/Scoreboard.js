import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { SCOREBOARD_KEY } from '../constants/Game';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Scoreboard = ({ navigation }) => {
    
    const [scores, setScores] = useState([]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('Focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
        if (jsonValue !== null) {
            const tmpScores = JSON.parse(jsonValue);
            // Sort scores in descending order if required
            setScores(tmpScores);
        }
    };

    const clearScoreboard = async () => {
        await AsyncStorage.removeItem(SCOREBOARD_KEY);
        setScores([]);
    };

    return (
        <>
            <Header />
            <View>
                <Text>Scoreboard will be here...</Text>
            </View>
            <Footer />
        </>
    );
};
