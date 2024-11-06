import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Datauser = () => {
  const [steps, setSteps] = useState(0);
  const [sleepTime, setSleepTime] = useState('0:0:0');
  const [bpm, setBpm] = useState(0);
  const [temp, setTemp] = useState(0.0);
  const [breathsPerSecond, setBreathsPerSecond] = useState(0); 

  useEffect(() => {
    const fetchData = () => {
      const apiUrl =
        'https://apidb0.azurewebsites.net/api/HttpTrigger1?code=jIX44QZRQ1xgss1z_ckKs6H2_dUnE4rStM7Zvkm34eDRAzFuv5tD-Q==';

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const latestItem = data[data.length - 1];
          const columnData = latestItem.Column1;

         
          const breathsPerSecondMatch = columnData.match(/breaths_per_second= (\d+)/); 
          const stepsMatch = columnData.match(/steps= (\d+)/);
          const sleepTimeMatch = columnData.match(/sleep_time= (\d+:\d+:\d+)/);
          const bpmMatch = columnData.match(/BPM= (\d+)/);
          const tempMatch = columnData.match(/temp= (\d+\.\d+)/);

       
          if (breathsPerSecondMatch) setBreathsPerSecond(breathsPerSecondMatch[1]); 
          if (stepsMatch) setSteps(stepsMatch[1]);
          if (sleepTimeMatch) setSleepTime(sleepTimeMatch[1]);
          if (bpmMatch) setBpm(bpmMatch[1]);
          if (tempMatch) setTemp(tempMatch[1]);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    };

    const intervalId = setInterval(fetchData, 2000); 

    return () => clearInterval(intervalId); 
  }, []); 

  return (
    <View style={styles.container}>
      
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={require('../screens/components/images/step.png')}
            />
            <Text style={styles.title}>Steps</Text>
          </View>
          <Text style={styles.title}>{steps}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={require('../screens/components/images/sleep.png')}
            />
            <Text style={styles.title}>Sleep Time </Text>
          </View>
          <Text style={styles.title}>{sleepTime}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={require('../screens/components/images/temperature.png')}
            />
            <Text style={styles.title}>Temperature</Text>
          </View>
          <Text style={styles.title}>{temp}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={require('../screens/components/images/heart-attack.png')}
            />
            <Text style={styles.title}>PBM</Text>
          </View>
          <Text style={styles.title1}>Heart Rate: {bpm}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            style={styles.icon}
            source={require('../screens/components/images/4694655.png')} 
          />
          <Text style={styles.title}>Breaths Per Minute</Text>
        </View>
        <Text style={styles.title}>{breathsPerSecond}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    height: 200,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    width: '48%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title1: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Datauser;
