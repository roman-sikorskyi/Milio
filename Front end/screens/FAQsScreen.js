import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQsScreen = ({navigation}) => {
    const [openSections, setOpenSections] = useState({}); // Стан для управління відкриттям секцій

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section], // Змінюємо стан для певної секції
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>FAQs</Text>
            
            {/* Перша секція */}
            <TouchableOpacity style={styles.section} onPress={() => toggleSection('why')}>
                <Text style={styles.title}>Навіщо мені Milio?</Text>
                <View style={styles.iconWrapper}>
                    <Ionicons 
                        name={openSections['why'] ? 'remove-circle-outline' : 'add-circle-outline'} 
                        size={24} 
                        color="gray" 
                    />
                </View>
            </TouchableOpacity>
            {openSections['why'] && (
                <View style={styles.content}>
                    <Text> З нашим додатком Ви можете дізнатись про актуальні пропозиції та знижки, 
                    які підійдуть саме Вам.</Text>
                </View>
            )}

            {/* Друга секція */}
            <TouchableOpacity style={styles.section} onPress={() => toggleSection('props')}>
                <Text style={styles.title}>Де можна переглянути пропозиції?</Text>
                <View style={styles.iconWrapper}>
                    <Ionicons 
                        name={openSections['props'] ? 'remove-circle-outline' : 'add-circle-outline'} 
                        size={24} 
                        color="gray" 
                    />
                </View>
            </TouchableOpacity>
            {openSections['props'] && (
                <View style={styles.content}>
                    <Text>Перелік усіх пропозицій Milio ти можеш переглянути лише у цьому мобільному додатку, 
                        а саме у вкладці "Пропозиції".Всі знижки доступні лише нашим учасникам.
                    </Text>
                </View>
            )}
             {/* Третя секція */}
             <TouchableOpacity style={styles.section} onPress={() => toggleSection('how')}>
                <Text style={styles.title}>Які знижки є у додатку?</Text>
                <View style={styles.iconWrapper}>
                    <Ionicons 
                        name={openSections['how'] ? 'remove-circle-outline' : 'add-circle-outline'} 
                        size={24} 
                        color="gray" 
                    />
                </View>
            </TouchableOpacity>
            {openSections['how'] && (
                <View style={styles.content}>
                    <Text>Наші пропозицій поділяються на кілька категорій, наприклад: спортзали, ресторани, кафе , готелі та ін.</Text>
                </View>
            )}
             {/* Четверта секція */}
             <TouchableOpacity style={styles.section} onPress={() => toggleSection('where')}>
                <Text style={styles.title}>Де та як використати акції?</Text>
                <View style={styles.iconWrapper}>
                    <Ionicons 
                        name={openSections['where'] ? 'remove-circle-outline' : 'add-circle-outline'} 
                        size={24} 
                        color="gray" 
                    />
                </View>
            </TouchableOpacity>
            {openSections['where'] && (
                <View style={styles.content}>
                    <Text>У вкладці "Пропозиції" знаходите акцію, яка вам пасує. 
                    Згодом на вкладці "Мапа" знаходите розташування акції. При відвідуванні 
                    покажіть ваше повсідчення УБД.</Text>
                </View>
            )}
            <Text style={styles.help}>Потрібна допомога?</Text>
            <TouchableOpacity style={{ backgroundColor: '#A3763E',padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }} onPress={() => navigation.navigate('Support')}>
                    <Text style={{color: '#fff', fontWeight: 'bold',}} >Підтримка</Text>
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
    help:{
        textAlign: 'center',
        fontSize:16,
        marginTop:200,
    },
    section: {
        backgroundColor: '#D4C295',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 17,
        color: '#333',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#D4C295',
        padding: 15,
        borderRadius: 8,
        marginTop: -5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default FAQsScreen;
