import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const fetchWithAuth = async (url, options = {}, navigation) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert('Сесія завершена', 'Авторизація потрібна.');
            navigation.replace('Login');
            return null;
        }

        console.log('Token:', token);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Додавання токена до заголовків
        };

        const response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers },
        });

        console.log('Response Status:', response.status);

        if (response.status === 401) {
            await AsyncStorage.removeItem('userToken');
            Alert.alert('Сесія завершена', 'Увійдіть заново.');
            navigation.replace('Login');
        }

        return response;
    } catch (error) {
        console.error('Fetch Error:', error);
        Alert.alert('Помилка', 'Щось пішло не так.');
        return null;
    }
};
