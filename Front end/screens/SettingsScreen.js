import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword) {
            alert('Будь ласка, заповніть всі поля.');
            return;
        }
    
        try {
            const response = await fetch('https://localhost:5225/api/Auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Пароль успішно змінено!');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                alert(data.message || 'Помилка при зміні пароля.');
            }
        } catch (error) {
            console.error(error);
            alert('Сталася помилка. Спробуйте ще раз.');
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Налаштування</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Сповіщення</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Дозвіл на надсилання сповіщень</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={(value) => setNotificationsEnabled(value)}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Зміна пароля</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Поточний пароль"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={(text) => setCurrentPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Новий пароль"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TouchableOpacity style={styles.changeButton} onPress={handlePasswordChange}>
                    <Text style={styles.changeButtonText}>Змінити пароль</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D4C295',
        padding: 20,
    },
    changeButton: {
        backgroundColor: '#A77E40',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 20,
    },
    changeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});

export default SettingsScreen;
