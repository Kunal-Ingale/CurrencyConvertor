import React from 'react'
import type { JSX, PropsWithChildren } from 'react'
//to take of Data type coming from prop
import { View, StyleSheet, Text } from 'react-native'

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.flag}> {props.flag}</Text>
            <Text style={styles.name}> {props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'

    },
    flag: {
        fontSize: 28,
        marginBottom: 4,
        backgroundColor: "#FFFFFF"
    },
    name: {
        fontSize: 14,
        backgroundColor: "#FFF"
    }
})


export default CurrencyButton
