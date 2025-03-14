import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Допомога</Text>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('FAQs')}>
                <Text style={styles.title}>FAQs</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Support')}>
                <Text style={styles.title}>Підтримка</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon2} />
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
        paddingLeft:265,
    },
    arrowIcon2:{
        paddingLeft:215,
    },
});

export default HelpScreen;
