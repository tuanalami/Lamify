import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* LOGO ON TOP */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      {/* TITLE */}
      <Text style={styles.title}>Welcome Tuané</Text>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Discover & save your favorite recipes
      </Text>

      {/* BUTTONS */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.primaryText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.secondaryText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.replace('MainTabs')} // prevents going back
      >
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#ca5624ff',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ca5624ff',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryText: {
    color: '#ca5624ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestText: {
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
});
