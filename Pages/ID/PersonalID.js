import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [(dd>9 ? '' : '0') + dd + '/' + (mm>9 ? '' : '0') + mm + '/'+this.getFullYear()].join('');
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const PersonalID = ({ route: { params: { carteira } }, navigation: { navigate, goBack } }) => {
    const [dimensions, setDimensions] = useState({ window, screen });

    const getProfileImage = () => {
        if (carteira.avatarImage && carteira.avatarImage.length) {
            
        } else {
            return <Text style={styles.noPicture}>Sem foto</Text>
        }
    };

    const textDisplay = (label, text) => {
        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    };

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
            <View style={styles.bottomContainer}>
                <View style={styles.firstRow} >
                    <View style={styles.imageContainer}>
                        {getProfileImage()}
                    </View>
                    <View style={styles.nameContainer}>
                        {textDisplay('PRIMEIRO NOME', carteira.firstName)}
                        {textDisplay('SOBRENOME', carteira.lastName)}
                        {textDisplay('DATA DE NASCIMENTO', new Date(carteira.birthday).yyyymmdd())}
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.title}>Documentos</Text>
                    {textDisplay('NÚMERO HC', carteira.hcNumber)}
                    {textDisplay('CPF', carteira.cpf)}
                    {textDisplay('RG', carteira.rg)}

                    <Text style={styles.title}>Endereço</Text>
                    {textDisplay('CIDADE', carteira.city)}
                    {textDisplay('ENDEREÇO', `${carteira.address}, ${carteira.number}`)}
                    {textDisplay('BAIRRO', carteira.neighborhood)}
                </View>
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
    },
    bottomContainer: {
        padding: 10,
        flex: 2
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderStyle: 'solid',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameContainer: {
        flex: 2,
        flexDirection: 'column',
        paddingLeft: 10
    },
    noPicture: {
        color: '#8a8a8a'
    },
    label: {
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: 9,
        marginBottom: 5,
        color: '#8f8f8f'
    },
    text: {
        lineHeight: 22,
        fontSize: 20,
    },
    body: {
        paddingTop: 5,
        flex: 2
    },
    fieldContainer: {
        borderWidth: 1,
        borderColor: '#8f8f8f',
        borderStyle: 'solid',
        borderRadius: 3,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        marginBottom: 15
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 20,
        marginTop: 20,
        marginBottom:10
    },
});

export default PersonalID;