import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Button } from 'react-native';
import { ListItem } from 'react-native-elements'

var countries = [];
var slugs = [];
var filteredList = ['United States of America', 'China', 'Italy', 'Pakistan'];

function filterList(text) {
    filteredList = []
    for (var i = 0; i < countries.length; i++) {
        if (countries[i].toLowerCase().includes(text.toLowerCase())) {
            filteredList.push(countries[i])
        }
    }
}

function returnCountryIndex(quer) {
    for (var i = 0; i < countries.length; i++) {
        if (countries[i] === quer) {
            return i
        }
    }
}

const StartScreen = ({ navigation }) => {
    const [isEmpty, setEmpty] = useState(true)
    const [nameOne, setNameOne] = useState('United States of America')
    const [nameTwo, setNameTwo] = useState('China')
    const [nameThree, setNameThree] = useState('Italy')
    const [nameFour, setNameFour] = useState('Pakistan')
    const [nameFive, setNameFive] = useState('India')

    const [countriesData, setCountriesData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.covid19api.com/countries')
            .then((response) => response.json())
            .then((responseJson) => {
                setCountriesData(responseJson)
                setLoading(false)
            })

            .catch((error) => {
                console.log('HELLO ERROR' + error)
            })
    }, []);

    if (isLoading) {
        return (
            <View style={styles.startLoad}>
                <ActivityIndicator />
            </View>
        );
    }

    else {
        countries = []
        countriesData.map((data) => {
            countries.push(data.Country)
        })
        slugs = []
        countriesData.map((data) => {
            slugs.push(data.Slug)
        })
        return (
            <View style={styles.startMain}>
                <Image style={{ width: 250, height: 250, display: (isEmpty) ? 'flex' : 'none' }} source={{ uri: 'https://images.vexels.com/media/users/3/193296/isolated/preview/12bde61b79a09e6f414909fa5adc64d1-covid-19-earth-mask-cartoon-by-vexels.png' }} />

                <View style={{ paddingTop: 20 }}>
                    <TextInput
                        style={styles.startInput}
                        placeholder='Search Here'
                        onChangeText={(input) => { (input === '') ? setEmpty(true) : setEmpty(false); filterList(input); setNameOne(filteredList[0]); setNameTwo(filteredList[1]); setNameThree(filteredList[2]); setNameFour(filteredList[3]); setNameFive(filteredList[4]); }} />
                </View>

                <View style={styles.list}>
                    <ListItem
                        title={nameOne}
                        leftAvatar={{ size: 25, source: { uri: 'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png' } }}
                        style={{ width: 420, display: (filteredList.length > 0) ? 'flex' : 'none' }}
                        onPress={() => { navigation.navigate('Country Data', { "name": { nameOne }, "slug": countriesData[returnCountryIndex(nameOne)].Slug }) }}
                        bottomDivider
                    />
                    <ListItem
                        title={nameTwo}
                        leftAvatar={{ size: 25, source: { uri: 'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png' } }}
                        style={{ width: 420, display: (filteredList.length > 1) ? 'flex' : 'none' }}
                        onPress={() => { navigation.navigate('Country Data', { "name": { nameTwo }, "slug": countriesData[returnCountryIndex(nameTwo)].Slug }) }}
                        bottomDivider
                    />
                    <ListItem
                        title={nameThree}
                        leftAvatar={{ size: 25, source: { uri: 'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png' } }}
                        style={{ width: 420, display: (filteredList.length > 2) ? 'flex' : 'none' }}
                        onPress={() => { navigation.navigate('Country Data', { "name": { nameThree }, "slug": countriesData[returnCountryIndex(nameThree)].Slug }) }}
                        bottomDivider
                    />
                    <ListItem
                        title={nameFour}
                        leftAvatar={{ size: 25, source: { uri: 'https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png' } }}
                        style={{ width: 420, display: (filteredList.length > 3) ? 'flex' : 'none' }}
                        onPress={() => { navigation.navigate('Country Data', { "name": { nameFour }, "slug": countriesData[returnCountryIndex(nameFour)].Slug }) }}
                        bottomDivider
                    />
                    
                    <View style={{ paddingTop: 20, alignItems: 'center', justifyContent: 'flex-end', display: (isEmpty) ? 'none' : 'flex' }}>
                        <Image style={{ width: 150, height: 150, }} source={{ uri: 'https://image.flaticon.com/icons/png/512/2731/2731265.png' }} />

                    </View>


                </View>
                <View style={{ display: (isEmpty) ? 'flex' : 'none' }}>
                    <Text style={styles.footer}>Coded With 💖</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    startLoad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startMain: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    startInput: {
        borderColor: 'black',
        width: 400,
        paddingLeft: 3,
        borderBottomWidth: 1,
        fontSize: 18
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        width: 200,
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'orange',
        margin: 10
    },
    list: {
        paddingTop: 10,

    },
    footer: {
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 5,
    }
})

export default StartScreen;