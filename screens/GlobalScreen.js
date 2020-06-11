import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements'

const GlobalScreen = () => {
    const [isLoading, setLoading] = useState(true)
    const [globalData, setGlobalData] = useState([])

    useEffect(() => {
        fetch('https://api.covid19api.com/summary')
            .then((response) => response.json())
            .then((responseJson) => {
                setGlobalData(responseJson)
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

        return (
            <View style={styles.startMain}>
                <Image style={{ width: 250, height: 250 }} source={{ uri: 'https://images.vexels.com/media/users/3/193295/isolated/preview/70b06d5888de4fa09d2e3bed5c992311-covid-19-earth-cartoon-icon-by-vexels.png' }} />
                <Text style={{ fontSize: 25, color: 'black', paddingBottom: 15, fontWeight: 'bold' }}>GLOBAL STATISTICS</Text>

                <ListItem
                    title={'New Confirmed'}
                    rightTitle={globalData.Global.NewConfirmed.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
                <ListItem
                    title={'Total Confirmed'}
                    rightTitle={globalData.Global.TotalConfirmed.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
                <ListItem
                    title={'New Deaths'}
                    rightTitle={globalData.Global.NewDeaths.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
                <ListItem
                    title={'Total Deaths'}
                    rightTitle={globalData.Global.TotalDeaths.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
                <ListItem
                    title={'New Recovered'}
                    rightTitle={globalData.Global.NewRecovered.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
                <ListItem
                    title={'Total Recovered'}
                    rightTitle={globalData.Global.TotalRecovered.toString()}
                    style={{ width: 420 }}
                    bottomDivider
                />
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
        padding: 20
    },
})

export default GlobalScreen