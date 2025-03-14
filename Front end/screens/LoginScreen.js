import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { CustomCheckbox } from '../components/CustomCheckbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = "http://localhost:5225/api/Auth";

    const handleLogin = async () => {
      if (!email || !password) {
          Alert.alert('Помилка', 'Заповніть всі поля.');
          return;
      }
  
      setLoading(true);
      try {
          const response = await fetch(`${API_BASE_URL}/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json(); // Розпарсити JSON
  
          console.log('Response Data:', data); // Діагностика
          if (!response.ok) throw new Error(data.error || 'Щось пішло не так.');
  
          // Коректно витягнути токен
          const token = data.token?.result;
          if (!token) throw new Error('Не вдалося отримати токен.');
  
          // Зберегти токен у AsyncStorage, якщо вибрано "Запам’ятати мене"
          if (rememberMe) {
              await AsyncStorage.setItem('userToken', token);
              console.log('Saved Token:', token);
          }
  
          Alert.alert('Успіх', `Вхід виконано! Ласкаво просимо, ${data.user.email}.`);
          navigation.navigate('Tab');
      } catch (error) {
          console.error(error);
          Alert.alert('Помилка', error.message);
      } finally {
          setLoading(false);
      }
  };
  
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід</Text>
            <TextInput placeholder="Введіть email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Введіть пароль" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            <View style={styles.checkboxContainer}>
                <CustomCheckbox value={rememberMe} onValueChange={setRememberMe} />
                <Text>Запам'ятати мене</Text>
            </View>
           
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
            )}
             <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={{ color: '#000' , marginTop:5 }}>Забули пароль?</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ marginRight: 5 }}>Ще не зареєстровані?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('StepOne')}>
                    <Text style={{ color: '#A3763E', fontWeight: 'bold' }}>Зареєструватись</Text>
                </TouchableOpacity>
        </View>
        </View>
    );
};

export default LoginScreen;
