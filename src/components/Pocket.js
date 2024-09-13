import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Pile from './Pile';
import { useDispatch } from 'react-redux';
import { unfreezDice, updatePlayerPieceValue } from '../redux/reducers/gameSlice';
import { startingPoints } from '../helpers/PlotData';

// Define Plot component outside of Pocket
const Plot = ({ pieceNo, player, color, data, onPress }) => {
    const piece = data[pieceNo];
    
    return (
        <View style={[styles.plot, { backgroundColor: color }]}>
            {data && piece?.pos === 0 && (
                <Pile
                    color={color}
                    player={player}
                    onPress={() => onPress(piece)}
                />
            )}
        </View>
    );
};

const Pocket = React.memo(({ color, player, data}) => {
    const dispatch = useDispatch();

    const handlePress = async value => {
        let playerNo = value?.id[0];
        switch (playerNo) {
            case 'A':
                playerNo = 'player1';
                break;
            case 'B':
                playerNo = 'player2';
                break;
            case 'C':
                playerNo = 'player3';
                break;
            case 'D':
                playerNo = 'player4';
                break;
        }

        dispatch(updatePlayerPieceValue({
            playerNo,
            pieceId: value.id,
            pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
            travelCount: 1,
        }));

        dispatch(unfreezDice());
    };

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.childFrame}>
                <View style={styles.flexRow}>
                    <Plot pieceNo={0} data={data} onPress={handlePress} player={player} color={color} />
                    <Plot pieceNo={1} data={data} onPress={handlePress} player={player} color={color} />
                </View>
                <View style={[styles.flexRow, { marginTop: 20 }]}>
                    <Plot pieceNo={2} data={data} onPress={handlePress} player={player} color={color} />
                    <Plot pieceNo={3} data={data} onPress={handlePress} player={player} color={color} />
                </View>
            </View>
            {
          player==1?<Text style={{position:'absolute',zIndex:88,color:"white",bottom:2,fontWeight:900}}>player {player} </Text>
            :player==2?<Text style={{position:'absolute',zIndex:88,color:"white",fontWeight:900,transform:[{rotate:'90deg'}],left:-20}}>player {player} </Text>
            :player==3?<Text style={{position:'absolute',zIndex:88,color:"white",fontWeight:900,transform:[{rotate:'180deg'}],top:2}}>player {player} </Text>
            :<Text style={{position:'absolute',zIndex:88,color:"white",fontWeight:900,transform:[{rotate:'-90deg'}],right:-20}}>player {player} </Text>
            
            }
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%'
    },
    childFrame: {
        backgroundColor: 'white',
        width: '70%',
        height: '70%',
        borderColor: Colors.borderColor,
        padding: 1,
        borderWidth: 0.4,
        padding: 15
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '40%'
    },
    plot: {
        width: '36%',
        height: '80%',
        borderRadius: 120
    }
});

export default Pocket;
