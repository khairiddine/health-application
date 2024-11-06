import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, StyleSheet, View, Alert } from 'react-native';

import * as Location from 'expo-location'

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          'Access Denied',
          'Permission to access location was denied. Please try again.',
          [{ text: 'OK', style: 'cancel' }]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {location && (
          <Marker pinColor='red' coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
            onPress={() =>
              Alert.alert(
                'Current Location',
                `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
              )
            }
          />

        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  alertText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333', 
  }
});
