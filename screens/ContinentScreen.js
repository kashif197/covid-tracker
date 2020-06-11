import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'


const ContinentScreen = ({ navigation, route }) => {
    const [continentData, setContinentData] = useState([])
    const [isLoading, setLoading] = useState(true)

    let url = 'https://covid19-update-api.herokuapp.com/api/v1/world/continent/' + route.params.name

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setContinentData(responseJson)
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

        let newData = continentData.countries

        let countryNames = []
        newData.map((data) => {
            countryNames.push(data.name)
        })

        let countryCases = []
        newData.map((data) => {
            countryCases.push(data.cases)
        })

        let countryDeaths = []
        newData.map((data) => {
            countryDeaths.push(data.deaths)
        })

        return (
            <View style={styles.startMain}>

                <Image style={{ width: 200, height: 200 }} source={{ uri: 'https://images.vexels.com/media/users/3/193296/isolated/preview/12bde61b79a09e6f414909fa5adc64d1-covid-19-earth-mask-cartoon-by-vexels.png' }} />


                <ListItem
                    title='Total Cases'
                    rightTitle='Deaths'
                    style={{ width: 420 }}
                    bottomDivider />
                <ScrollView>
                    {
                        newData.map((l, i) => (
                            <ListItem
                                key = {i}
                                title={countryNames[i]}
                                subtitle={countryCases[i].toString()}
                                style={{ width: 420 }}
                                rightTitle={countryDeaths[i].toString()}
                                bottomDivider
                            />
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    startLoad: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startMain: {
        paddingTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row'
    },
    table: {
        flexDirection: 'row',
    },
    text: {
        margin: 15
    }
})

export default ContinentScreen