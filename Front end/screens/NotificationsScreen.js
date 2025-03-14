import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Імітація запиту до API
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Замініть цей URL на ваш endpoint
      const response = await fetch('https:/localhost:5225/api/user/notifications');
      const data = await response.json();

      setNotifications(data.notifications || []);
    } catch (err) {
      setError('Не вдалося завантажити сповіщення.');
    } finally {
      setIsLoading(false);
    }
  };

  // Завантаження сповіщень при завантаженні компонента
  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сповіщення</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#D4C295" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchNotifications} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Повторити спробу</Text>
          </TouchableOpacity>
        </View>
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noNotifications}>Немає нових сповіщень</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D4C295',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notification: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#D4C295',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555',
  },
  noNotifications: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 32,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 8,
  },
  retryButton: {
    padding: 10,
    borderWidth:1,
    borderColor:'gray',
    backgroundColor: '#D4C295',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotificationsScreen;
