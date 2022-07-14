import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View, Dimensions } from "react-native";
import { Text } from 'react-native-paper';
import { useStorage } from '../../hooks/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 *  Carteira type definition:
 * 
 *  {
 *      uuid: string,
 *      firstName: string,
 *      lastName: string,
 *      hcNumber: string,
 *      avatarImage: string,
 *      cpf: string,
 *      rg: string,
 *      birthday: date,
        city: string
 *      address: string
        number: int
        neighborhood: string
 *  }
 */

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const IDHome = ({ navigation }) => {
    const [ids, setIds] = useStorage('carteiras', []);
    const [dimensions, setDimensions] = useState({ window, screen });
    const cardDimensions = { height: dimensions.screen.width * 0.25, width: dimensions.screen.width * 0.25 };

    return (
        <ScrollView>
            <View style={styles.topContainer}>
                <View>
                    <Text style={styles.hcText}>Hospital de Clínicas</Text>
                    <Text style={styles.titleText}>Quem será atendido hoje?</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {ids.map((carteira, i) => {
                    return  <TouchableHighlight 
                        key={i} 
                        onPress={() => { navigation.navigate('PersonalID', { carteira })}} 
                        style={{...cardDimensions, margin: '4%'}}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"    
                    >
                        <View style={{...styles.card, ...cardDimensions}} >
                            <Icon name='user' color='#8a8a8a' size={40}/>
                            <Text style={styles.namesText}>{carteira?.firstName} {carteira?.lastName}</Text>
                        </View>    
                    </TouchableHighlight>  
                })}
                <TouchableHighlight 
                    onPress={() => { navigation.navigate('IDCreate') }} 
                    style={{...cardDimensions, margin: '4%'}}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD" 
                >
                    <View style={{...styles.card, ...cardDimensions}}>
                        <Icon name='plus' color='#c2c2c2' size={40}/>
                        <Text style={styles.newText}>Nova carteira</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    titleText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22
    },
    bottomContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20%',
        paddingRight: '20%',
        paddingTop: 60
    },
    card: {
        borderRadius: 5,
        borderColor: '#c2c2c2',
        borderWidth: 1,
        margin: '4%',
        flex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hcText: {
        fontWeight: '200',
        fontSize: 10,
        color: '#FFFFFF',
        lineHeight: 10,
    },
    newText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#c2c2c2',
        textAlign: 'center'
    },
    namesText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#8a8a8a'
    }
});

export default IDHome;