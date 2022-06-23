import React from 'react';
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper";

export const IDView = ({ navigation }) => {
    return (<View style={styles.view}>
        <Button onPress={() => navigation.navigate('FAQ')}>Ir para o FAQ</Button>
    </View>);
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});