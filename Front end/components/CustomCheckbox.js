import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles';

export const CustomCheckbox = ({ value, onValueChange, label }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={() => onValueChange(!value)}>
    <View style={[styles.checkbox, value && styles.checkboxChecked]} />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

 
