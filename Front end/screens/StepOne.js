
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import { useUser } from '../components/UserProvider';

export const StepOne = ({ navigation }) => {
    const { setUserData } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const handleNext = () => {
      if (!firstName || !lastName) {
        Alert.alert('Помилка', 'Заповніть всі поля.');
        return;
      }
      setUserData((prev) => ({ ...prev, firstName, lastName }));
      navigation.navigate('StepTwo');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Крок 1: Введення імені</Text>
        <TextInput placeholder="Введіть ім'я" style={styles.input} value={firstName} onChangeText={setFirstName} />
        <TextInput placeholder="Введіть прізвище" style={styles.input} value={lastName} onChangeText={setLastName} />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Далі</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ marginRight: 5 }}>Вже зареєстровані?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#A3763E', fontWeight: 'bold' }}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

