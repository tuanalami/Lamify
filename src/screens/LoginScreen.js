import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        Alert.alert('Error', 'No account found, please register!');
        return;
      }

      const user = JSON.parse(userData);

      if (email === user.email && password === user.password) {
        await AsyncStorage.setItem('userEmail', email); // save for profile
        Alert.alert('Success', 'Logged in successfully!');
        this.props.navigation.replace('MainTabs'); // go to main app
      } else {
        Alert.alert('Error', 'Email or password is incorrect');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Tuané</Text>
        <Text style={styles.subtitle}>Discover & save your favorite recipes</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2' },
  logo: { width: 150, height: 150, marginBottom: 20, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 30, marginBottom: 15, fontSize: 16, elevation: 3 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 30, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerText: { color: '#000', marginTop: 20, fontSize: 16 },
});
