import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { announceWinner, resetGame } from '../redux/reducers/gameSlice';
import { playSound } from '../helpers/SoundUtility';
import { resetAndNavigate } from '../helpers/NavigationUtil';
import LinearGradient from 'react-native-linear-gradient';
import { colorPlayer } from '../helpers/PlotData';
import LottieView from 'lottie-react-native';
import GradientButton from './GradientButton';
import Tropy from '../assets/animation/trophy.json';
import Firework from '../assets/animation/firework.json';
import HeartGirl from '../assets/animation/girl.json';
import Pile from './Pile';
import Modal from 'react-native-modal';  // Ensure you use react-native-modal package

const WinModal = ({ winner }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(!!winner);

    useEffect(() => {
        setVisible(!!winner);
    }, [winner]);

    const handleNewGame = () => {
        dispatch(resetGame());
        dispatch(announceWinner(null));
        playSound('game_start');
    };

    const handleHome = () => {
        dispatch(resetGame());
        dispatch(announceWinner(null));
        resetAndNavigate('HomeScreen');
    };

    return (
        <Modal
            isVisible={visible}
            backdropColor="black"
            backdropOpacity={0.8}
            onBackdropPress={() => setVisible(false)}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackButtonPress={() => setVisible(false)}
            style={styles.modal}
        >
            <View style={styles.modalContainer}>
                <LinearGradient
                    colors={['#0f0c29', '#302b63', '#24243e']}
                    style={styles.gradientContainer}
                >
                    <View style={styles.content}>
                        <Pile player={1} color={colorPlayer[winner - 1]} style={styles.pile} />
                        <Text style={styles.congratsText}>
                        🎉Congratulations! PLAYER {winner}
                        </Text>
                        <LottieView
                            autoPlay
                            hardwareAccelerationAndroid
                            loop={false}
                            source={Tropy}
                            style={styles.trophyAnimation}
                        />
                        <LottieView
                            autoPlay
                            hardwareAccelerationAndroid
                            loop={true}
                            source={Firework}
                            style={styles.fireworkAnimation}
                        />
                        <GradientButton title="NEW GAME " onPress={handleNewGame} style={styles.button} />
                        <GradientButton title="HOME " onPress={handleHome} style={styles.button} />
                    </View>
                </LinearGradient>
            </View>
                <LottieView
                    hardwareAccelerationAndroid
                    autoPlay
                    loop={true}
                    source={HeartGirl}
                    style={styles.girlAnimation}
                />
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientContainer: {
        borderRadius: 20,
        padding: 20,
        width: '98%',
        borderWidth: 2,
        borderColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
    },
    pile: {
        marginBottom: 20,
    },
    congratsText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Philosopher-Bold',
        marginVertical: 30,
        top:30
    },
    trophyAnimation: {
        height: 150,
        width: 150,
        marginVertical: 20,
    },
    fireworkAnimation: {
        height: 300,
        width: 300,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    girlAnimation: {
        height: 400,
        width: 300,
        position: 'absolute',
        bottom: -150,
        right: -100,
        zIndex: 99,
    },
    button: {
        marginVertical: 10,
    },
});

export default WinModal;
