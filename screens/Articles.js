import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';

const Articles = () => {
  const [blogInfo, setBlogInfo] = useState([]);

  useEffect(() => {
    const getBlogInfo = async () => {
      try {
        const response = await fetch(
          'https://health.gov/myhealthfinder/api/v3/topicsearch.json',
        );
        const json = await response.json();
        setBlogInfo(json.Result.Resources.Resource);
      } catch (error) {
        console.error(error);
      }
    };

    getBlogInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {blogInfo.map((item, index) => (
        <ANN key={index} data={item} />
      ))}
    </ScrollView>
  );
};

const ANN = ({ data }) => {
  const handlePress = () => {
    Linking.openURL(data.AccessibleVersion);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.Title}</Text>
        <Text style={styles.subtitle}>{data.Categories}</Text>
      </View>
      <Image source={{ uri: data.ImageUrl }} style={styles.image} />
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.content}>
          <Text style={styles.text}> <Text style={styles.text1}>Click the URL:</Text>{data.AccessibleVersion}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: '90%',
    alignItems: 'center',
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle: {
    fontSize: 24,
    color: '#333',
    marginTop: 10,
  },
  content: {
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    color: '#0000FF',
    textAlign: 'center',
  },
  text1: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default Articles;
