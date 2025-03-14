import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import { useUser } from '../components/UserProvider';
import {CustomCheckbox} from '../components/CustomCheckbox';

export const StepTwo = ({ navigation }) => {
    const { setUserData } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
    const [subscribe, setSubscribe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleNext = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Помилка", "Введіть коректний email.");
        return;
      }
      if (password.length < 8) {
        Alert.alert("Помилка", "Пароль має містити щонайменше 8 символів.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Помилка", "Паролі не співпадають.");
        return;
      }
      if (!acceptPrivacyPolicy) {
        Alert.alert("Помилка", "Погодьтесь із політикою конфіденційності.");
        return;
      }
      setUserData((prev) => ({ ...prev, email, password }));
      navigation.navigate('StepThree');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Крок 2: Введення email та пароля</Text>
        <TextInput placeholder="Введіть email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput placeholder="Введіть пароль" style={styles.input} value={password} secureTextEntry={!showPassword} onChangeText={setPassword} />
        <TextInput placeholder="Підтвердіть пароль" style={styles.input} secureTextEntry={!showPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
        <CustomCheckbox value={acceptPrivacyPolicy} onValueChange={setAcceptPrivacyPolicy} label="Я погоджуюсь із політикою конфіденційності" />
        <CustomCheckbox value={subscribe} onValueChange={setSubscribe} label="Дозволити надсилання сповіщень" />
        <CustomCheckbox value={showPassword} onValueChange={setShowPassword} label="Показати пароль" />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Далі</Text>
        </TouchableOpacity>
      </View>
    );
  };

