import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native"
import { List, Searchbar, Text } from "react-native-paper";
import { FAQ } from "../../Data/faq";

const lcFAQ = FAQ.map(({ question, answer }) => { return { question: question.toLowerCase(), answer: answer.toLowerCase() }})

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const FAQView = ({ navigation }) => {
    const [openIndex, setOpenIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFAQ, setFilteredFAQ] = useState(FAQ);
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

    const onChangeSearch = query => setSearchQuery(query.toLowerCase());

    useEffect(() => {
        const idxs = [];
        for (let i = 0 ; i < FAQ.length ; i++) if(lcFAQ[i].question.includes(searchQuery) || lcFAQ[i].answer.includes(searchQuery)) idxs.push(i);
        setFilteredFAQ(FAQ.filter((_, i) => idxs.includes(i)));
    }, [searchQuery])

    return (
        <ScrollView>
            <View style={styles.view}>
                <View style={{ height: dimensions.screen.height*0.3, ...styles.upperContainer}}>
                    <View>
                        <Text style={styles.hcText}>Hospital de Clínicas</Text>
                        <Text style={styles.helpText}>Estamos aqui pra te ajudar!</Text>
                    </View>
                </View>
                <View style={styles.bgBotoom}>
                    <View style={styles.bottomContainer}>
                        <Searchbar
                            placeholder="Buscar"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                        />
                        <List.Section style={styles.list}>
                            {filteredFAQ.map((obj, i) => {
                                const question = () => <Text style={styles.accordionTitle}>{obj.question}</Text>
                                const answer = () => <Text style={styles.answer}>{obj.answer}</Text>

                                return (
                                <List.Accordion 
                                    key={i} 
                                    left={question}
                                    titleNumberOfLines={100} 
                                    theme={styles.accordionTheme(openIndex == i)}
                                    expanded={openIndex == i}
                                    onPress={() => setOpenIndex(openIndex == i ? -1 : i)}
                                    style={styles.accordion}
                                >
                                    <List.Item left={answer} titleNumberOfLines={100} style={styles.item}/>
                                </List.Accordion>
                            )})}
                        </List.Section>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    upperContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#3F51B5',
    },
    helpText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
        lineHeight: 22
    },
    bgBotoom: {
        backgroundColor: '#3F51B5',
        width: '100%'
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
        paddingTop: 10,
    },
    view: {
        flex: 1,
        alignItems: "flex-start"
    },
    list: {
        width: '100%',
        maxWidth: '100%'
    },
    accordion: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        width: '100%'
    },
    accordionTheme: (open) => {
        return {
        colors: {
            background: `${open ? '#d9ddf2' : '#FFFFFF'}`
        }
    }},  
    item: {
        backgroundColor: '#d9ddf2',
    },
    accordionTitle: {
        fontWeight: 'bold',
        color: '#4453a6',
        marginLeft: '6%',
        maxWidth: '81%'
    },
    answer: {
        color: '#20222D',
        marginLeft: '6%',
        fontSize: 12,
        fontWeight: '200'
    }
});
