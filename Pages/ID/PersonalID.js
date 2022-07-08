import React from 'react';
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalID = ({ route: { params: { carteira } }, navigation: { navigate, goBack } }) => {
    return (
        <ScrollView>
            <View style={styles.upperContainer}>
                <Icon 
                    style={styles.backIcon} 
                    name='arrow-left' 
                    color='#ffffff' 
                    size={20}
                    onPress={() => goBack()}
                />
                <Text style={styles.titleText}>{carteira?.firstName} {carteira?.lastName}</Text>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    upperContainer: {
        backgroundColor: '#9C27B0',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection: 'row'
    },  
    titleText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22,
        paddingLeft: 20
    },
    backIcon: {
        marginLeft: '7%'
    }
});

export default PersonalID;