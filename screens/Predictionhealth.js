import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Recommandation = () => {
  const [current, setCurrent] = useState('');
  const [number, onChangeNumber] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [pbm, setPbm] = useState('');
  const [temperature, setTemperature] = useState('');
  const [result, setResult] = useState(null);
  const [sbpmValue, setSbpmValue] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const apiUrl = '******';

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
          const sbpmMatch = columnData.match(/BPM\s*=\s*(\d+)/);
          const tempMatch = columnData.match(/temp= (\d+\.\d+)/);
          if (sbpmMatch && tempMatch) {
            const sbpmValue = sbpmMatch[1];
            const tempValue = tempMatch[1];
            setSbpmValue(sbpmValue);
            setPbm(sbpmValue); 
            setTemperature(tempValue); 
          } else {
            console.error('sbpm or temp value not found in response:', latestItem);
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSelection = (value) => {
    setCurrent(value);
  };

  const handlePrediction = () => {
    const apiUrl = `http://localhost/prediction/?age=${number}&sex=${current === 'Male' ? 0 : 1}&cola=${cholesterol}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResult(data.y_pred[0]);
        console.log(data.y_pred[0]);
        if (data.y_pred[0] === 'Presence') {
          alert('You got a heart disease.');
        } else {
          alert('You haven\'t any heart disease.');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>AGE:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cholesterol:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCholesterol}
          value={cholesterol}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>PBM:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPbm}
          value={pbm}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Temperature:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTemperature}
          value={temperature}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.radioContainer}>
        <Text style={styles.label}>Sex:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, current === 'Male' && styles.radioButtonSelected]}
            onPress={() => handleSelection('Male')}
          >
            <Text style={[styles.radioText, current === 'Male' && styles.radioTextSelected]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, current === 'Female' && styles.radioButtonSelected]}
            onPress={() => handleSelection('Female')}
          >
            <Text style={[styles.radioText, current === 'Female' && styles.radioTextSelected]}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePrediction}>
        <Text style={styles.buttonText}>GET PREDICTION</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 15,
    marginRight: 10,
  },
  checkbox: {
    margin: 8,
    borderWidth: 1,
    padding: 4,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderColor: '#aaa',
  },
  radioButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  radioText: {
    fontSize: 16,
    color: '#555',
  },
  radioTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default Recommandation;
