import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Додано іконки
import aresImage from '../assets/aresImage.jpeg';
import sportMarket from '../assets/sportMarket.jpeg';
import vuhoKom from '../assets/vuhoKom.jpeg';
import doppingYou from '../assets/doppingYou.jpeg';
import goiTeens from '../assets/goiTeens.png';
import colorMarket from '../assets/colorMarket.jpeg';
import goldLemon from '../assets/goldLemon.png';
import hotelLviv from '../assets/hotelLviv.png';
import optician from '../assets/optician.png';

export const MapScreen = () => {
  const categories = [
    { label: 'Усі', value: 'all' },
    { label: 'Медичні послуги', value: 'Медичні послуги' },
    { label: 'Готелі та ресторани', value: 'Готелі та ресторани' },
    { label: 'Магазини', value: 'Магазини' },
    { label: 'Спорттовари', value: 'Спорттовари' },
    { label: 'Розваги та курси', value: 'Розваги та курси' },
  ];

  const proposals = [
    {
      id: '1',
      title: 'Ares',
      description: 'Мережа магазинів шкіри та хутра',
      discount: '50% знижки на одяг для військових',
      location: { latitude: 49.8410, longitude: 24.0260 },
      address: 'просп. Свободи, 41, Львів',
      category: 'Магазини',
      image: aresImage,
    },
    {
      id: '2',
      title: 'Спорт Маркет',
      description: 'Продаж спортивного інвентаря та одягу',
      discount: 'Знижки для військових -10% на усі товари',
      location: { latitude: 49.841850, longitude: 24.026550 },
      address: 'вул. Городоцька, 10, Львів',
      category: 'Спорттовари',
      image: sportMarket,
    },
    {
      id: '3',
      title: 'Вухо.Ком',
      description: 'Продаж аудіотехніки та аксесуарів',
      discount: 'Індивідуальна знижка в залежності від товару',
      location: { latitude: 49.8420, longitude: 24.0265 },
      address: 'просп. Свободи, 49, Львів',
      category: 'Магазини',
      image: vuhoKom,
    },
    {
      id: '4',
      title: 'Optician',
      description: 'Магазин оптики та окулярів',
      discount: 'Знижки для військових -20%',
      location: { latitude: 49.8425, longitude: 24.0125 },
      address: 'вул. Городоцька, Львів',
      category: 'Медичні послуги',
      image: optician,
    },
    {
      id: '5',
      title: 'Готель Львів',
      description: 'Готель для відпочинку у центрі міста',
      discount: 'Знижка -15% при наявності посвідчення УБД',
      location: { latitude: 49.8480, longitude: 24.0260 },
      address: 'просп. В. Чорновола, 7, Львів',
      category: 'Готелі та ресторани',
      image: hotelLviv,
    },
    {
      id: '6',
      title: 'Dopping4You',
      description: 'Продаж спортивного харчування',
      discount: 'Карта лояльності для військових',
      location: { latitude: 49.8325, longitude: 24.0235 },
      address: 'вул. Івана Франка, 52, Львів',
      category: 'Спорттовари',
      image: doppingYou,
    },
    {
      id: '7',
      title: 'Золотий Лимон',
      description: 'Ресторан української кухні',
      discount: 'Знижка 10% для військових',
      location: { latitude: 49.8320, longitude: 24.0035 },
      address: 'вул. Академіка А. Сахарова, 19а, Львів',
      category: 'Готелі та ресторани',
      image: goldLemon,
    },
    {
      id: '8',
      title: 'GOITeens',
      description: 'Онлайн-курси програмування для дітей',
      discount: 'Знижки -20% для дітей військових',
      location: { latitude: 49.8397, longitude: 24.0299 },
      address: 'онлайн-курси, доступ по всій Україні',
      category: 'Розваги та курси',
      image: goiTeens,
    },
    {
      id: '9',
      title: 'Colormarket',
      description: 'Магазин фарб та лакофарбової продукції',
      discount: 'Знижки -20% для військових',
      location: { latitude: 49.8322, longitude: 24.0455 },
      address: 'вул. Ткацька, 29, Львів',
      category: 'Магазини',
      image: colorMarket,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Стан для модального вікна

  const filteredMarkers = proposals.filter((proposal) => {
    const matchesCategory =
      selectedCategory === 'all' || proposal.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' || proposal.title.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesCategory && matchesSearch;
  });
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мапа пропозицій</Text>

      {/* Поле для пошуку з кнопкою */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук місця..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setSearchQuery(searchQuery)}
        >
          <Text style={styles.searchButtonText}>Пошук</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Icon name="filter-list" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Модальне вікно для фільтру */}
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Фільтрувати за категорією:</Text>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setIsFilterVisible(false); // Закриваємо модальне вікно після вибору
              }}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFilterVisible(false)}
            >
              <Text style={styles.closeButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Карта */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.8381,
          longitude: 24.0232,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {filteredMarkers.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Нічого не знайдено
          </Text>
        ) : (
          filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.location}
              title={marker.title}
              description={`${marker.description}\n${marker.discount}`}
            />
          ))
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#D4C295',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1, // Інпут займає весь доступний простір
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10, // Відступ між інпутом і кнопками
  },
  searchButton: {
    backgroundColor: '#D4C295',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 5, // Відступ між кнопками
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#D4C295',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  map: {
    flex: 1,
    margin:0
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#D4C295',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
