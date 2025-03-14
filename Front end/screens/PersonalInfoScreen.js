import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInfoScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);

    // Вибір аватара
    const selectAvatar = () => {
        const options = {
            mediaType: 'images', // Виправлено з 'images'
            quality: 1,
        };
    
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('Image picker error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setAvatar(selectedImage); // Встановлення аватара
            }
        });
    };
    

    // Збереження даних
    const handleSave = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                Alert.alert('Помилка', 'Токен користувача не знайдено.');
                return;
            }
    
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
    
            if (avatar) {
                const fileName = avatar.uri.split('/').pop(); // Ім'я файлу з URI
                const fileType = fileName.split('.').pop() || 'jpeg'; // Тип файлу
                formData.append('Avatar', {
                    uri: avatar.uri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }
    
            const response = await fetch('http://localhost:5225/api/user/Profile', {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            });
    
            // Перевірка статусу відповіді
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    Alert.alert('Успіх', data.Message);
                } else {
                    Alert.alert('Успіх', 'Профіль оновлено.');
                }
            } else {
                const errorData = await response.json().catch(() => null); // Уникайте помилки розбору
                Alert.alert('Помилка', errorData?.Message || 'Не вдалося оновити профіль.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Сталася помилка під час оновлення.');
        }
    };
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Особиста інформація</Text>
                </View>

                <TouchableOpacity style={styles.avatarPicker} onPress={selectAvatar}>
                    <Ionicons name="camera" size={24} color="#FFF" />
                    <Text style={styles.avatarPickerText}>Змінити аватар</Text>
                </TouchableOpacity>
                {avatar && <Image source={{ uri: avatar.uri }} style={styles.avatarPreview} />}
                <View style={styles.form}>
                    <Text style={styles.label}>Ім'я</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введіть ім'я"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Text style={styles.label}>Прізвище</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введіть прізвище"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Зберегти зміни</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4C295',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#D4C295',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    avatarPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    avatarPickerText: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 5,
    },
    avatarPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15,
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F9F3DD',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0D4B3',
    },
    saveButton: {
        backgroundColor: '#A77E40',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PersonalInfoScreen;
