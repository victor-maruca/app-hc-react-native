import React from "react";
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper";

export const FAQView = ({ navigation }) => {
    return (<View style={styles.view}>
        <Button onPress={() => navigation.navigate("Carteira")}>Ir para a Carteira</Button>
    </View>);
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});