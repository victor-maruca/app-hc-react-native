import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper";
import { Dimensions } from 'react-native';
import { FLUXOS } from "./flows";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const doctorImage = require('../../assets/doctor.png');

export const ChecklistView = ({ navigation }) => {
    const [dimensions, setDimensions] = useState({ window, screen });    
    const imageDimensions = dimensions.screen.width * 0.2;
    const [flow, setFlow] = useState([FLUXOS.key]);
    const [current, setCurrent] = useState(FLUXOS);
    const scrollRef = useRef(null);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    });

    const goBack = () => {
        setCurrent(FLUXOS);
        setFlow([FLUXOS.key]);
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    };

    const onPressOption = (option) => {
        let newFlow = flow;
        newFlow.push(option);
        setFlow(newFlow);
        setCurrent(current.children.find(o => o.key == option));
        scrollRef.current?.scrollToEnd({ animated: true });
    }

    return (
        <ScrollView ref={scrollRef}>
            <View style={styles.view}>
                <View style={{ height: dimensions.screen.height * 0.3, ...styles.upperContainer }}>
                    <View>
                        <Text style={styles.hcText}>Hospital de Clínicas</Text>
                        <Text style={styles.helpText}>Fale com o Dr. Virtual!</Text>
                    </View>
                </View>
                <View style={{ ...styles.bgBotoom, minHeight: dimensions.screen.height * 0.7 }}>
                    <View style={{ ...styles.bottomContainer, minHeight: dimensions.screen.height * 0.7 }}>
                        <View style={{ ...styles.chatBg, minHeight: dimensions.screen.height * 0.7 }}>
                            {mountChat(flow, imageDimensions, onPressOption, goBack)}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const mountChat = (path, imageDimensions, onPressOption, goBack) => {
    const mounted = [];
    let current = { children: [FLUXOS] };
    
    for (let i = 0; i < path.length; i++) {
        current = current.children.find(o => o.key == path[i]);
        mounted.push(
            <View key={i}>
                { i > 0 && <View height={40} /> }
                <View style={{ flexDirection: 'row' }}>
                    <Image source={doctorImage} style={{ width: imageDimensions, height: imageDimensions, resizeMode: 'contain' }} />
                    <Text style={styles.description}>{current.description}</Text>
                </View>
                <View height={20} />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={{ justifyContent: 'center' }}>
                        {
                            current.options && current.options.map((option, k) => {
                                let colors = ['#673AB7', '#009688', '#3F51B5', '#9C27B0'];
                                let color = colors[Math.floor((Math.random(1, 1000) * 10) + 4) % 4];
                                return <Button 
                                    key={k} 
                                    mode="contained" 
                                    color={color} 
                                    style={styles.option} 
                                    onPress={() => onPressOption(option.to)}
                                    disabled={i+1 != path.length}
                                >
                                        {option.label}
                                </Button>
                            })
                        }
                        {
                            !current.options && <Button 
                                mode="contained" 
                                color="#673AB7" 
                                style={styles.option} 
                                onPress={() => goBack()}
                            >
                                    Voltar para o início
                            </Button>
                        }
                    </View>
                    <View style={{ ...styles.euContainer, height: imageDimensions * 0.9, width: imageDimensions * 0.9, borderRadius: imageDimensions / 2 }}>
                        <Text style={styles.euText}>EU</Text>
                    </View>
                </View>
                <View height={20} />
            </View>
        );
    }

    return mounted;
}

const styles = StyleSheet.create({
    upperContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#673AB7',
    },
    helpText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
        lineHeight: 22
    },
    bgBotoom: {
        backgroundColor: '#673AB7',
        width: '100%',
    },
    hcText: {
        fontWeight: '200',
        fontSize: 10,
        color: '#FFFFFF',
        lineHeight: 10
    },
    bottomContainer: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        backgroundColor: '#ffffff',
    },
    view: {
        flex: 1,
        alignItems: "flex-start"
    },
    img: {
        width: 30,
        height: 'auto'
    },
    chatBg: {
        paddingTop: 30,
        backgroundColor: "#e8e0f5",
        paddingLeft: 10,
        paddingRight: 10
    },
    description: {
        width: '60%',
        fontSize: 14,
        lineHeight: 15,
        marginTop: 15,
        textAlign: 'left'
    },
    euContainer: {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#009688',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    option: {
        height: 40,
        marginBottom: 10,
        fontSize: 8
    },
    euText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#009688'
    }
});
