import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class RegisterScreen extends Component {
  state = { username: '', email: '', password: '', confirmPassword: '' };

  handleRegister = async () => {
    const { username, email, password, confirmPassword } = this.state;

    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({ username, email, password }));
      Alert.alert('Success', 'Registration successful!');
      this.props.navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during registration');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your account in Lamify</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" value={this.state.username} onChangeText={(username) => this.setState({ username })} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={this.state.confirmPassword} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2' },
  logo: { width: 100, height: 100, marginBottom: 20, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 30, marginBottom: 15, fontSize: 16, elevation: 3 },
  button: { backgroundColor: '#4e8cff', padding: 15, borderRadius: 30, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginText: { color: '#4e8cff', marginTop: 20, fontSize: 16 },
});
