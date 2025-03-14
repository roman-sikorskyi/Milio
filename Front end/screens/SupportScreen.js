import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = ({navigation}) => {
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Не вдалося відкрити посилання", err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Маєш запитання?</Text>
            <Text style={styles.text}>Контактуй з нами зручним тобі способом:</Text>
            <View style={styles.contactRow}>
                <Ionicons name="mail-outline" size={40} color="gray" style={styles.icon} />
                <Text style={styles.link}>
                    milio.gongo@gmail.com
                </Text>
            </View>
            <View style={styles.contactRow}>
                <Ionicons name="logo-instagram" size={40} color="gray" style={styles.icon} />
                <Text style={styles.link} onPress={() => openLink('https://www.instagram.com/milio.gongo?igsh=OHRueTFhY3I1ZWYz')}>
                    Instagram
                </Text>
            </View>
            <Text style={styles.faqs}>Відповіді на актуальні запитання:</Text>
            <TouchableOpacity style={{ backgroundColor: '#A3763E',paddingVertical: 15,paddingHorizontal:95, borderRadius: 10, alignItems: 'center', marginTop: 20 }} onPress={() => navigation.navigate('FAQs')}>
                    <Text style={{color: '#fff', fontWeight: 'bold',}} >Переглянути FAQs</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D4C295',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    faqs:{
        textAlign: 'center',
        fontSize:16,
        marginTop:280,
    },
    text: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        alignSelf: 'flex-start', // Вирівнювання по лівому краю
        marginLeft: 20, // Відступ від лівого краю екрана
    },
    icon: {
        marginRight: 15,
    },
    link: {
        fontSize: 16,
        color: '#000',
        
    },
});

export default SupportScreen;
