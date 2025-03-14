import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

export const BackButton = ({ navigation }) => (
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#A3763E" style={{ marginLeft: 10 }} />
    <Text style={{ color: '#A3763E', fontWeight: 'bold' }}>Назад</Text>
  </TouchableOpacity>
);



