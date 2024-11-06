import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const Recommandation = () => {
  const [current, setCurrent] = useState('');
  const [number, onChangeNumber] = useState('');
  const [result, setResult] = useState(null);
  const [isChecked, setChecked] = useState(false);

  const getResult = async () => {
    try {
      let apiUrl = `https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${number}&sex=${current.toLowerCase()}`;

      if (isChecked && current.toLowerCase() === 'female' && parseInt(number) >= 11 && parseInt(number) <= 49) {
        apiUrl += '&pregnant=1';
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSelection = (value) => {
    setCurrent(value);
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
      {current.toLowerCase() === 'female' && parseInt(number) >= 11 && parseInt(number) <= 49 && (
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text style={styles.paragraph}>Pregnant?</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={getResult}>
        <Text style={styles.buttonText}>GET RESULT</Text>
      </TouchableOpacity>
      <ScrollView>
        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Resultat:</Text>
            <Text style={styles.resultText1}> {result.Result.MyHFHeading}</Text>
            <Text style={styles.resultText}>Recommandations:</Text>
            <ScrollView>
              {result.Result.Resources.all.Resource.map((item, index) => (
                <View key={index}>
                  <Text>{item.Title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
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
    marginLeft: 10,
  },
  checkbox: {
    margin: 8,
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
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText1: {
    fontSize: 19,
    fontWeight: 'bold',
    color:'green'
  },
});

export default Recommandation;
