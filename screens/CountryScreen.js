import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements'

const CountryScreen = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(true)
    const [countryData, setCountryData] = useState([])
    var countryName=''
    const countryInitial = route.params.name;
    const countrySlug = route.params.slug;
    if (countryInitial["nameOne"]) countryName=countryInitial["nameOne"]
    else if (countryInitial["nameTwo"]) countryName=countryInitial["nameTwo"]
    else if (countryInitial["nameThree"]) countryName=countryInitial["nameThree"]
    else if (countryInitial["nameFour"]) countryName=countryInitial["nameFour"]

    const urlOne = 'https://api.covid19api.com/dayone/country/' + countrySlug

    var firstCase = ''
    var numCasesDayOne = ''
    var currConfirmed = ''
    var currDeaths = ''
    var currRecovered = ''
    var currActive = ''

    useEffect(() => {
        fetch(urlOne)
            .then((response) => response.json())
            .then((responseJson) => {
                setCountryData(responseJson)
                setLoading(false)
            })

            .catch((error) => {
                console.log('HELLO ERROR' + error)
            })


    }, []);

    if (isLoading) {
        return (
            <View style={styles.startMain}>
                <ActivityIndicator />
            </View>
        );
    }

    else {
        firstCase = countryData[0].Date
        numCasesDayOne = countryData[0].Confirmed
        currConfirmed = countryData[countryData.length - 1].Confirmed
        currDeaths = countryData[countryData.length - 1].Deaths
        currRecovered = countryData[countryData.length - 1].Recovered
        currActive = countryData[countryData.length - 1].Active

        return (
            <View style={styles.startMain}>
                <Image style={{ width: 200, height: 200, marginLeft: 25 }} source={{ uri: 'https://images.vexels.com/media/users/3/193263/isolated/preview/a013cc0ab78536c966642da6a7d5eefb-covid-19-social-distancing-people-icon-by-vexels.png' }} />
                <Text style={{fontSize: 25, color: 'black', paddingBottom: 15, fontWeight: 'bold'}}>{countryName.toUpperCase()}</Text>

                <View>
                    <ListItem
                        title={'First Case Was Reported On'}
                        rightTitle={firstCase.substring(0,10)}
                        style={{ width: 420}}
                        bottomDivider
                    />
                    <ListItem
                        title={'Cases Registered On Day One'}
                        rightTitle={numCasesDayOne.toString()}
                        style={{ width: 420}}
                        bottomDivider
                    />
                    <ListItem
                        title={'Total Confirmed'}
                        rightTitle={currConfirmed.toString()}
                        style={{ width: 420}}
                        bottomDivider
                    />
                    <ListItem
                        title={'Total Deaths'}
                        rightTitle={currDeaths.toString()}
                        style={{ width: 420}}
                        bottomDivider
                    />
                    <ListItem
                        title={'Total Recovered'}
                        rightTitle={currRecovered.toString()}
                        style={{ width: 420}}
                        bottomDivider
                    />
                    <ListItem
                        title={'Active Cases'}
                        rightTitle={currActive.toString()}
                        style={{ width: 420}}
                        bottomDivider
                    />
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    startMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default CountryScreen;