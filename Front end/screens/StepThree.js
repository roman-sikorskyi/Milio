import React, { useState } from 'react';
import { View, Text,Image, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import { useUser } from '../components/UserProvider';
import * as ImagePicker from 'expo-image-picker';

export const StepThree = ({ navigation }) => {
    const { userData } = useUser();
    const [avatar, setAvatar] = useState(null);
    const API_BASE_URL = "http://localhost:5225/api/Auth";
    
    const pickImage = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          alert('Доступ до галереї зображень не надано!');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          setAvatar(result.assets[0].uri);
        }
      } catch (error) {
        console.error('Помилка при виборі зображення:', error.message);
      }
    };
  
    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append("FirstName", userData.firstName);
        formData.append("LastName", userData.lastName);
        formData.append("Email", userData.email);
        formData.append("Password", userData.password);
        formData.append("ConfirmPassword", userData.password);
    
        if (avatar) {
          const fileName = avatar.split('/').pop(); // Ім'я файлу з URI
          const fileType = fileName.split('.').pop() || 'jpeg'; // Тип файлу
          formData.append("Avatar", {
            uri: avatar,
            name: fileName,
            type: `image/${fileType}`,
          });
        }
    
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text(); // Отримати текст помилки
          try {
            const errorData = JSON.parse(errorText); // Спробувати парсити JSON
            throw new Error(errorData.Error || "Щось пішло не так.");
          } catch (e) {
            throw new Error(errorText || "Щось пішло не так.");
          }
        }
        const data = await response.json(); // Якщо ок, парсити JSON
        Alert.alert("Успіх", "Реєстрація завершена!");
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Помилка", error.message);
      }
    };
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Крок 3: Аватар</Text>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text>Додати аватар</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Завершити</Text>
        </TouchableOpacity>
      </View>
    );
  };

