import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LogoutScreen = ({ navigation }) => {
    const handleLogout = () => {
        // Логіка очищення токенів та виходу
        console.log('Локальні дані очищено');
        // Наприклад, очищення AsyncStorage:
        // await AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Перехід на екран входу
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ви впевнені, що хочете вийти?</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
                <Text style={styles.actionText}>Так, Вийти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Скасувати</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4C295',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    actionButton: {
        backgroundColor: '#A3763E',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 15,
    },
    cancelText: {
        fontSize: 16,
        color: 'red',
    },
});

export default LogoutScreen;
