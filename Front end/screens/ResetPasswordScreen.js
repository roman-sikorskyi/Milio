import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';

export const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const API_BASE_URL = "http://localhost:5225/api/Auth";

    const handleResetPassword = async () => {
      if (!email) {
        Alert.alert('Помилка', 'Введіть email.');
        return;
      }
    
      try {
       const response = await fetch(`${API_BASE_URL}/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.Error || 'Щось пішло не так.');
        }
    
        Alert.alert('Успіх', 'Інструкція для відновлення пароля надіслана.');
        navigation.replace('Login'); // Перехід на екран входу
      } catch (error) {
        Alert.alert('Помилка', error.message);
      }
    };
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Відновлення пароля</Text>
        <TextInput
          placeholder="Введіть email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Надіслати інструкцію</Text>
        </TouchableOpacity>
      </View>
    );
  };

