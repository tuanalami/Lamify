import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      setEmail(storedEmail);
    };
    loadUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('favorites');
    navigation.replace('Welcome');
  };

  if (!email) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Guest Mode</Text>
        <Text style={styles.text}>
          You are browsing as a guest.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#555' }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>{email}</Text>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    width: 220,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  logout: { marginTop: 30 },
  logoutText: { color: 'red', fontSize: 16 },
});
