import React from 'react';
import { ScrollView, Text, StyleSheet,Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUsScreen = ({ navigation }) => {
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Не вдалося відкрити посилання", err));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Привіт👋
            </Text>
            <Text style={styles.text}>
                Ми Milio - програма знижок/акцій/пропозицій для військових УБД, створена організацією 
                зі студентів Львівської Політехніки "Gongo". Відтепер ти частина нашого ком'юніті, ці 
                знижки, подарунки, акції - це найменше що ми можемо для вас зробити. Дякуємо вам за захист
                та спокійні ночі від лиця усіх студентів.
            </Text>
            <Text style={styles.text}>
                Так-Так,з Milio ти зможеш отримувати більше, бо серед наших партнерів є бренди різних 
                категорій: продуктові магазини та супермаркети, готелі,ресторани, магазини одягу,кафе,
                аптеки та клініки,інтернет-магазини, спортзали та ще багато інших.
            </Text>
            <Text style={styles.text}>
                Ми хочемо, щоб наше ком'юніті росло 🙌 щодня: щоб долучалися нові учасники, щоб все більше
                і більше брендів давали класні знижки та подарунки.Саме заради цього ми працюємо, не зважаючи ні на що.
            </Text>
            <Text style={styles.text}>
                Ми любимо комунікувати з тобою:
            </Text>
            <Text style={styles.text}>
                <Text style={styles.link} onPress={() => openLink('https://www.instagram.com/milio.gongo?igsh=OHRueTFhY3I1ZWYz')}>Instagram</Text> - 
                це місце, де ми показуватимемо усі новинки та актуальні пропозиції від наших партнерів 😏
            </Text>
            <Text style={styles.text}>
                Щоразу, коли ти плануєш щось купити, заходь у цей додаток та перевіряй, чи цікавий тобі бренд є у 
                переліку партнерів.
                Якщо є - ти отримаєш більше вигоди, звісно ж 😉 А якщо немає - обовʼязково поділись з нами своїм побажанням,
                залишивши назву бренду у формі і ми докладемо всіх зусиль,щоб його додати.
            </Text>
            <Text style={styles.text}>
               Ну все переходь у розділ "Пропозиції" та пірнай у море вигоди 🔥
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4C295',
        padding: 20,
    },
    header: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeader:{
        fontSize: 14,
        textAlign: 'justify',
    },
    text: {
        fontSize: 15,
        color: '#333',
        textAlign: 'left',
        marginBottom: 10, // Відступ між абзацами
        textIndent: 20, // Відступ для абзацу
    },
    link: {
        fontSize: 15,
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
});

export default AboutUsScreen;
