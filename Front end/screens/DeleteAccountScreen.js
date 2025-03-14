import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DeleteAccountScreen = ({ navigation }) => {
    const handleDeleteAccount = async () => {
        Alert.alert(
            'Видалення акаунта',
            'Ви впевнені, що хочете видалити акаунт? Цю дію не можна скасувати.',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            const response = await fetch('http://192.168.x.x:5225/api/user/delete', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${authToken}`,
                                },
                                body: JSON.stringify({ userId: "USER_ID" }), // Замініть на реальний userId
                            });
                            setIsLoading(false);
    
                            if (response.ok) {
                                const data = await response.json();
                                Alert.alert('Успіх', data.message);
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }],
                                });
                            } else {
                                const errorData = await response.json();
                                Alert.alert('Помилка', errorData.message);
                            }
                        } catch (error) {
                            setIsLoading(false);
                            Alert.alert('Помилка', 'Щось пішло не так.');
                            console.error(error);
                        }
                    },
                },
            ]
        );
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ви впевнені, що хочете видалити акаунт?</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleDeleteAccount}>
                <Text style={[styles.actionText, { color: '#fff' }]}>Видалити акаунт</Text>
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
        borderWidth: 1,
        borderColor: '#A3763E',
    },
    actionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 15,
    },
    cancelText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default DeleteAccountScreen;
