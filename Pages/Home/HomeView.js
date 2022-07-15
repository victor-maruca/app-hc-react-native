import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const hcImage = require('../../assets/LOGO-HC.png');
const hcBG = require('../../assets/hc-bg.jpg');
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const HomeView = ({ navigation }) => {
    const [dimensions, setDimensions] = useState({ window, screen });
    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    });


    return (
        <ScrollView>
            <View style={styles.container}>

                <ImageBackground source={hcBG} resizeMode="cover" blurRadius={5}>
                    <View style={styles.upperContainer}>
                        <Image source={hcImage} style={{ ...styles.image, width: dimensions.screen.width * 0.5, height: dimensions.screen.width * 0.5 }} />
                    </View>
                </ImageBackground>

                <View style={styles.bottomContainer}>
                    <Text style={styles.header}>Bem vindo ao novo app do Hospital de Clínicas da Unicamp!</Text>
                    <View height={30} />
                    <Text>Aqui você pode encontrar algumas dúvidas comuns entre pacientes do HC e dicas para que seu atendimento ocorra sem complicações.</Text>
                    <View height={15} />
                    <Text>Usando a barra da parte inferior, você pode navegar pelas seguintes seções: </Text>
                    <View height={10} />
                    <View style={styles.minContainer}>
                        <View style={styles.pageLine}>
                            <Icon name="address-card" color='#9C27B0' size={22} />
                            <View width={10} />
                            <Text style={{ ...styles.subtitle, color: '#9C27B0' }}>Carteira HC</Text>
                        </View>
                        <View style={styles.pageLine}>
                            <View width={35} />
                            <Text>Aqui você pode criar Carteiras HC para você e seus familiares. Elas servem para reunir todos os documentos necessários para sua consulta e fazer o atendimento ser mais rápido.</Text>
                        </View>
                    </View>
                    <View height={10} />
                    <View style={styles.minContainer}>
                        <View style={styles.pageLine}>
                            <Icon name="list-ul" color='#673AB7' size={22} />
                            <View width={10} />
                            <Text style={{ ...styles.subtitle, color: '#673AB7' }}>Dr. Virtual</Text>
                        </View>
                        <View style={styles.pageLine}>
                            <View width={33} />
                            <Text>Aqui você pode tirar suas dúvidas sobre agendamento de consultas, documentação necessária, etc. com o nosso Dr. Virtual!</Text>
                        </View>
                    </View>
                    <View height={10} />
                    <View style={styles.minContainer}>
                        <View style={styles.pageLine}>
                            <Icon name="question-circle" color='#3F51B5' size={22} />
                            <View width={10} />
                            <Text style={{ ...styles.subtitle, color: '#3F51B5' }}>FAQ</Text>
                        </View>
                        <View style={styles.pageLine}>
                            <View width={28} />
                            <Text>Aqui se encontram algumas das dúvidas mais comuns dos Pacientes do Hospital de Clínicas. Já procurou no FAQ para ver se sua dúvida foi respondida?</Text>
                        </View>
                    </View>
                    <View height={40} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    upperContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    image: {
        resizeMode: 'contain'
    },
    bottomContainer: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    pageLine: {
        flexDirection: "row",
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    minContainer: {
        paddingTop: 20,
        paddingRight: 20
    }
});