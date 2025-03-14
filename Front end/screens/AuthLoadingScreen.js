import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
    useEffect(() => {
        const checkLoginState = async () => {
            const token = await AsyncStorage.getItem('userToken');
            
            if (token) {
                try {
                    // Запит на сервер для перевірки валідності токена
                    const response = await fetch('http://localhost:5225/api/Auth/ValidateToken', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        // Токен валідний -> переходимо на головний екран
                        navigation.replace('Tab');
                    } else {
                        // Токен застарілий або невалідний -> видаляємо його і перенаправляємо на Login
                        await AsyncStorage.removeItem('userToken'); 
                        navigation.replace('Login');
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    // У разі помилки також перенаправляємо на Login
                    await AsyncStorage.removeItem('userToken');
                    navigation.replace('Login');
                }
            } else {
                // Токен відсутній -> перенаправляємо на Register
                navigation.replace('StepOne');
            }
        };

        checkLoginState();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default AuthLoadingScreen;
