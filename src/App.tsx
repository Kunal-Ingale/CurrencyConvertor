import React, { JSX, useState } from 'react'
import { Text, View, TextInput, StyleSheet, FlatList, Pressable } from 'react-native'
import Snackbar from 'react-native-snackbar';
import { currencyByRupee } from './constants';
import CurrencyButton from './Components/CurrencyButton';


function App(): JSX.Element {
    const [inputValue, setInputValue] = useState('')
    const [resultValue, setResultValue] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')

    const buttonPressed = (targetValue: Currency) => {
        if (!inputValue) {
            return Snackbar.show({
                text: "Enter the value to convert",
                backgroundColor: '#EA7773',
                textColor: '#000000'
            })
        }
        const inputAmount = parseFloat(inputValue);
        if (!isNaN(inputAmount)) {
            const convertedValue = inputAmount * targetValue.value;
            const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
            setResultValue(result);
            setTargetCurrency(targetValue.name)
        } else {
            return Snackbar.show({
                text: "not a valid number",
                backgroundColor: '#EA7773',
                textColor: '#000000'
            })
        }
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.rupeesContainer}>
                        <Text style={styles.rupee}>Rs.</Text>
                        <TextInput
                            maxLength={14}
                            value={inputValue}
                            onChangeText={setInputValue}
                            keyboardType='number-pad'
                            placeholder='Enter amount in Rs.'
                        />
                    </View>
                    {resultValue && (
                        <Text style={styles.resultTxt}>{resultValue}</Text>
                    )}
                </View>
                <View style={styles.bottomContainer}>
                    <FlatList
                        numColumns={3}
                        data={currencyByRupee}
                        keyExtractor={item => item.name}
                        renderItem={(item) => (
                            <Pressable
                                style={[styles.button, targetCurrency === item.item.name && styles.selected]}
                                onPress={() => buttonPressed(item.item)}>
                                <CurrencyButton {...item.item} />
                            </Pressable>
                            //item.item refers to the actual currency object { name, value, flag, symbol }
                        )} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultTxt: {
        fontSize: 36,
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    rupee: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginRight: 8,
    },
    rupeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: '90%',
    },
    inputAmountField: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        padding: 5,
    },
    bottomContainer: {
        flex: 2,
        marginTop: 20,
    },
    button: {
        flex: 1,
        margin: 10,
        height: 70,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        color: 'Red',
    },
    selected: {
        backgroundColor: '#FFA500', // Orange when selected
    },
});

export default App
