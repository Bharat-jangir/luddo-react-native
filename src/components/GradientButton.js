import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { playSound } from '../helpers/SoundUtility';
import LinearGradient from 'react-native-linear-gradient';
import { ComputerDesktopIcon, HomeIcon, PlayCircleIcon, PlayPauseIcon, UserIcon } from 'react-native-heroicons/outline';
import { RFValue } from 'react-native-responsive-fontsize';

const iconSize = RFValue(20);

const GradientButton = ({ title, onPress, iconColor = "#d5be3e" }) => {

  return (
    <View style={styles.buttonWrapper}>
        <TouchableOpacity 
        activeOpacity={0.8}
        onPress={()=>{
            playSound('ui');
            onPress()
        }}
        style={styles.btnContainer}
        >
        <LinearGradient
        colors={["#4c669f","#3b5998","#192f6a"]}
        style={styles.button}
        start={{x:0,y:0}}
        end={{x:0,y:1}}
        >
            {
                title=='RESUME '?(
                    <PlayPauseIcon size={iconSize} color={iconColor}/>
                ):title=="NEW GAME "?(
                    <PlayCircleIcon size={iconSize} color={iconColor}/>                
                ):title=='VS CPU '?(
                    <ComputerDesktopIcon size={iconSize} color={iconColor}/>
                ):title=='HOME '?(
                    <HomeIcon size={iconSize} color={iconColor}/>
                ):(
                    <UserIcon size={iconSize} color={iconColor}/>
                )
            }
            <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>

        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 10,
  },
  btnContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gold',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 0,
    minWidth:250,
    elevation:20
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(16),
    marginLeft: 20,
    textAlign:"left"
  },
});

export default GradientButton;
