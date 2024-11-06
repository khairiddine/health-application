import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'


const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/Logo.png')}
                />
                <Text style={styles.text}> <Text style={styles.text1}>HEALTH</Text> CARE MONITOR</Text>
            </View>
            
            <Image
                style={styles.image1}
                source={require('../assets/Homeimage.png')}
            />
            <View style={styles.container2}>

                <Text style={styles.text} >FIND YOUR MEDICAL</Text>
                <Text style={styles.text}>DATA</Text>
                <Text >your health anytime, anywhere.</Text>
                <Text >Access medical data and receive personalized </Text>
                <Text >predictions. </Text>
            </View>
            <View style={styles.container3}>
                <Image
                    style={styles.Logo1}
                    source={require('../assets/eclipse3.png')}
                />
                <Image
                    style={styles.Logo1}
                    source={require('../assets/Eclipse1.png')}
                />
                <Image
                    style={styles.Logo1}
                    source={require('../assets/eclipse2.png')}
                />
            </View>

            <View style={styles.container4}>
                <TouchableOpacity color='#4fc65b' onPress={() => navigation.navigate('Data')}>
                    <Text style={styles.text2}>ENTER</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        
    
    },
    container1: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '1%',

    },
    text1: {
        fontWeight: 'bold'
    },
    Logo: {
        height: 25,
        width: 25,
    },
    text: {
        fontSize: 18
    },
    image1: {
        marginTop: 50,
        height: 350,
        width: 380,

    },
    container2: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center'


    },
    container3: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    Logo1: {
        height: 10,
        width: 10,
    },
    container4: {
        marginTop: 50,
        height: 57,
        width: 160,
        backgroundColor: '#4fc65b',
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 114

    },
    text2: {
        color: "white"
    }
});

export default Home;