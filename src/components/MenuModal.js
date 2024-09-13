import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { playSound } from '../helpers/SoundUtility';
import { goBack } from '../helpers/NavigationUtil';
import { announceWinner, resetGame } from '../redux/reducers/gameSlice';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from './GradientButton';

const MenuModal = ({ visible, onPressHide }) => {
  const dispatch = useDispatch();

  const handleNewGame = useCallback(() => {
    dispatch(resetGame());
    playSound('game_start');
    dispatch(announceWinner(null));
    onPressHide();
  }, [dispatch, onPressHide]);

  const handleHome = useCallback(() => {
    goBack();
  }, []);

  return (
    <Modal
      isVisible={visible}
      backdropColor="black"
      backdropOpacity={0.8}
      onBackdropPress={onPressHide}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onPressHide}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['#0f0c29', '#302b63', '#24243e']}
          style={styles.gradientContainer}
        >
          <View style={styles.subView}>
            <GradientButton title="RESUME " onPress={onPressHide} />
            <GradientButton title="NEW GAME " onPress={handleNewGame} />
            <GradientButton title="HOME " onPress={handleHome} />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    paddingVertical: 40,
    width: '96%',
    borderWidth: 2,
    borderColor: 'gold',
    justifyContent: 'center',
  },
  subView: {
    alignItems: 'center',
  },
});

export default MenuModal;
