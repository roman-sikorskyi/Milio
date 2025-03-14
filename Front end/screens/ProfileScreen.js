import React, { useEffect, useState } from 'react';
import {View,Text,Alert, StyleSheet, Image,TouchableOpacity, ScrollView } from 'react-native';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetchWithAuth('http://localhost:5225/api/user/Profile',{},navigation);
                if (response && response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    Alert.alert('Помилка', 'Не вдалося завантажити дані профілю.');
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Помилка', 'Щось пішло не так.');
            }
        };

        fetchProfileData();
    }, []);

    const getFullAvatarUrl = (avatarPath) => {
        const BASE_URL = 'http://localhost:5225';
        return avatarPath
            ? `${BASE_URL}${avatarPath}`
            : 'https://via.placeholder.com/150';
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subHeader}>
                    <Text style={styles.title}>Профіль</Text>
                    <Ionicons name="notifications-outline" size={30} color="#000" style={styles.notIcon} onPress={() => navigation.navigate('Notifications')} />
                </View>
                <Image
                    source={{ uri: getFullAvatarUrl(profileData?.avatarPath) }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>
                    {`${profileData?.firstName || ''} ${profileData?.lastName || ''}`}
                </Text>
                <Text style={styles.email}>
                    {`${profileData?.email || ''}`}
                </Text>
            </View>

            {/* Особиста інформація */}
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PersonalInfo')}>  
               <View style={styles.SectionLeft}>
                    <Text style={styles.sectionTitle}>Особиста інформація</Text>
                    <Text style={styles.sectionSubTitle}>Ім'я, E-mail</Text>
               </View>
               <View style={styles.SectionRight}>
                    <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon} />
                </View>
            </TouchableOpacity>

            {/* Налаштування */}
            <View>
                <TouchableOpacity  style={styles.section} onPress={() => navigation.navigate('Settings')}>
                   <View style={styles.SectionLeft}>
                        <Text style={styles.sectionTitle}>Налаштування</Text>
                        <Text style={styles.sectionSubTitle}>Сповіщення, Пароль</Text>
                   </View>
                   <View style={styles.SectionRight}>
                        <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon2} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Інформація про Milio */}
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('MilioInfo')}>
                <View style = {styles.SectionLeft}>
                    <Text style={styles.sectionTitle}>Про Milio</Text>
                    <Text style={styles.sectionSubTitle}>Політика, Правила, Про нас </Text>
                </View>
                <View style={styles.SectionRight}>
                        <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon3} />
                    </View>
            </TouchableOpacity>

            {/* Допомога */}
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Help')} >
                <View style={styles.SectionLeft}>
                    <Text style={styles.sectionTitle}>Допомога</Text>
                    <Text style={styles.sectionSubTitle}>FAQs, Підтримка</Text>
                </View>
                <View style={styles.SectionRight}>
                    <Ionicons name="chevron-forward-outline" size={20} color="gray" style={styles.arrowIcon4} />
                </View>
            </TouchableOpacity>

            {/* Вийти та Видалити акаунт */}
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Logout')}>
                <Text style={styles.actionText}>Вийти</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('DeleteAccount')}>
                <Text style={[styles.actionText, { color: 'red' }]}>
                    Видалити акаунт
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    arrowIcon:{
        paddingLeft:135,
        paddingTop:15,
    },
    arrowIcon2:{
        paddingLeft:185,
        paddingTop:15,
    },
    arrowIcon3:{
        paddingLeft:130,
        paddingTop:15,
    },
    arrowIcon4:{
        paddingLeft:207,
        paddingTop:15,
    },
    container: {
        flex: 1,
        backgroundColor: '#D4C295',
    },
    header: {
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom:20,
    },
    subHeader:{
        flexDirection:'row',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    email:{
        fontSize:14,
        color:'gray',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#D4C295',
        padding: 15,    
        paddingLeft:25,
        borderRadius: 10,
        flexDirection:'row',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    sectionSubTitle: {
        fontSize: 14,
        color: 'gray',
    },
    title:{
        alignItems:'center',
        fontWeight:'bold',
        fontSize:24,
        marginBottom:20,
        paddingLeft:135,
        paddingRight:105,
    },
    actionButton: {
        paddingHorizontal: 10,
        paddingVertical:5,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ProfileScreen;
