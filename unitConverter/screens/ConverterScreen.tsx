import React, { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import RNPickerSelect from 'react-native-picker-select';
import { useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';

// custom components
import RegularButton from "../components/Buttons/RegularButton";
import SmallText from "../components/Text/SmallText";
import { colors } from "../components/colors";
import RegularText from "../components/Text/RegularText";
import ConvetionItem from "../components/ConvetionItem";

const unitConverterEndpointEmulator = "http://192.168.1.3:3000/api/convert?";

const imperialUnits = [
    "gal",
    "lbs",
    "mi",
];

const siUnits = [
    "L",
    "kg",
    "km",
];

const fetchUnitst = () => {
    // We should get available units from API and then fetch them if api supports it
    return siUnits.concat(imperialUnits)
}

const isNumericValid = (value) => {
    return Number(value) != NaN
}

const parseNumber = (value: string): string => {
    value = value.replace(',', '.')
    const num = Number(value)
    return String(num)
}

const convertUnitAPI = (sourceVal: string, sourceUnit: string, targetUnit: string) => {
    const controller = new AbortController()

    // 5 second timeout:!!!!!!!!!!!!!!!!!!!!!!!
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const url = `${unitConverterEndpointEmulator}input=${sourceVal}${sourceUnit}`
    return fetch(url, { signal: controller.signal })
        .then(response => response.json())
}

const ConverterScreen: FunctionComponent = () => {
    const [lastConvertionItems, setLastConvertionItems] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [sourceAmout, setSourceAmout] = useState("0");
    const [sourceUnit, setSourceUnit] = useState("");
    const [targetAmount, setTargetAmout] = useState("0");
    const [targetUnit, setTargetUnit] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUnitList(fetchUnitst())
    }, []);

    const handleAddLastConvertion = (data: string) => {
        if (lastConvertionItems.length >= 10) {
            setLastConvertionItems([...lastConvertionItems.slice(1), data])
        } else {
            setLastConvertionItems([...lastConvertionItems, data])
        }
    }

    const convertUnit = (sourceVal: string, sourceUnit: string, targetUnit: string) => {
        if (sourceUnit === "" || sourceUnit === null) {
            alert("You have to select source unit.")
            return
        }

        const sourceAmoutParsed = parseNumber(sourceVal)
        if (!isNumericValid(sourceAmoutParsed)) {
            alert("You have to enter numeric value greater than 0.")
            return
        }

        setLoading(true)
        convertUnitAPI(sourceAmoutParsed, sourceUnit, targetUnit)
            .then(data => {
                setTargetAmout(data.returnNum.toString())
                setTargetUnit(data.returnUnit.toString())
                handleAddLastConvertion(data.string.toString())
                setLoading(false)
            })
    }

    return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
                <View style={styles.mainContainer}>
                    <View style={styles.unitStyle}>
                        <View>
                            <SmallText>Source amount</SmallText>
                            <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                onChangeText={value => setSourceAmout(value)}
                                value={sourceAmout}
                            />
                        </View>
                        <View>
                            <SmallText>Select source unit</SmallText>
                            <View style={styles.pickerStyle}>
                                <RNPickerSelect
                                    onValueChange={(value: string) => setSourceUnit(value)}
                                    items={unitList.map(unit => ({
                                        label: unit,
                                        value: unit
                                    })
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.separator}> ─────────  Convert to  ─────────</Text>
                    <View style={styles.unitStyle} pointerEvents={'none'} >
                        <View>
                            <SmallText>Target amount</SmallText>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={value => setTargetAmout(value)}
                                value={targetAmount}
                            />
                        </View>
                        <View>
                            <SmallText>Select target unit</SmallText>
                            <View style={styles.pickerStyle}>
                                <RNPickerSelect
                                    value={targetUnit}
                                    onValueChange={(value: string) => setTargetUnit(value)}
                                    items={unitList.map(unit => ({
                                        label: unit,
                                        value: unit
                                    })
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        {
                            loading
                                ? <ActivityIndicator color={colors.primary} size="large" />
                                : <RegularButton onPress={() => {
                                    convertUnit(sourceAmout, sourceUnit, targetUnit)
                                }}>Convert</RegularButton>
                        }
                    </View>
                </View>
                <View style={styles.lastConvertionsWrapper}>
                    <RegularText textStyle={{ color: colors.lightblack }}>Last conversions:</RegularText>
                    <View style={styles.items}>
                        {
                            lastConvertionItems.map((item, index) => {
                                return (
                                    <View key={index} >
                                        <ConvetionItem text={item} />
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
    },
    textInput: {
        backgroundColor: colors.graylight,
        height: 40,
        width: 150,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.lightblack,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 10,
    },
    unitStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pickerStyle: {
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderWidth: 1,
        borderColor: colors.lightblack,
        backgroundColor: colors.graylight,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    separator: {
        color: colors.primary,
        textAlign: 'center',
        padding: 10,
    },
    lastConvertionsWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    writelastConvertionWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});

export default ConverterScreen;