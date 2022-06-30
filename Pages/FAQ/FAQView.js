import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import { List, Searchbar } from "react-native-paper";
import { FAQ } from "../../Data/faq";

const lcFAQ = FAQ.map(({ question, answer }) => { return { question: question.toLowerCase(), answer: answer.toLowerCase() }})

export const FAQView = ({ navigation }) => {
    const [openIndex, setOpenIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFAQ, setFilteredFAQ] = useState(FAQ);

    const onChangeSearch = query => setSearchQuery(query.toLowerCase());

    useEffect(() => {
        const idxs = [];
        for (let i = 0 ; i < FAQ.length ; i++) if(lcFAQ[i].question.includes(searchQuery)) idxs.push(i);
        setFilteredFAQ(FAQ.filter((_, i) => idxs.includes(i)));
    }, [searchQuery])
    

    return (
        <View style={styles.view}>
            <Searchbar
                placeholder="Buscar"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <List.Section style={styles.list}>
                {filteredFAQ.map((obj, i) => {
                    return (
                    <List.Accordion 
                        key={i} 
                        title={obj.question} 
                        titleNumberOfLines={100} 
                        style={styles.accordion}
                        expanded={openIndex == i}
                        onPress={() => setOpenIndex(openIndex == i ? -1 : i)}
                    >
                        <List.Item title={obj.answer} titleNumberOfLines={100} style={styles.item}/>
                    </List.Accordion>
                )})}
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "flex-start"
    },
    list: {
        width: '100%'
    },
    item: {
       backgroundColor: '#dedede'
    }
});