import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MilioInfoScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Інформація про Milio</Text>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.title}>Політика конфіденційності</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Rules')}>
                <Text style={styles.title}>Правила</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon2} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AboutUs')}>
                <Text style={styles.title}>Про нас</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon3} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4C295',
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#D4C295',
        padding: 15,
        flexDirection:'row',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    arrowIcon:{
        paddingLeft:70,
    },
    arrowIcon2:{
        paddingLeft:235,
    },
    arrowIcon3:{
        paddingLeft:240,
    },
});

export default MilioInfoScreen;
