import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import aresImage from '../assets/aresImage.jpeg';
import sportMarket from '../assets/sportMarket.jpeg';
import vuhoKom from '../assets/vuhoKom.jpeg';
import doppingYou from '../assets/doppingYou.jpeg';
import goiTeens from '../assets/goiTeens.png';
import colorMarket from '../assets/colorMarket.jpeg';
import goldLemon from '../assets/goldLemon.png';
import hotelLviv from '../assets/hotelLviv.png';
import optician from '../assets/optician.png';

export const MainScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі');
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const categories = [
    'Усі',
    'Медичні послуги',
    'Готелі та ресторани',
    'Магазини',
    'Спорттовари',
    'Розваги та курси',
  ];
  const proposals = [
    {
      id: '1',
      title: 'Ares',
      description: 'Мережа магазинів шкіри та хутра',
      discount: '50% знижки на одяг для військових',
      location: 'просп. Свободи, 41, Львів',
      category: 'Магазини',
      image: aresImage,
    },
    {
      id: '2',
      title: 'Спорт Маркет',
      description: 'Продаж спортивного інвентаря та одягу',
      discount: 'Знижки для військових -10% на усі товари',
      location: 'вул. Городоцька, 10, Львів',
      category: 'Спорттовари',
      image: sportMarket,
    },
    {
      id: '3',
      title: 'Вухо.Ком',
      description: 'Продаж аудіотехніки та аксесуарів',
      discount: 'Індивідуальна знижка в залежності від товару',
      location: 'просп. Свободи, 49, Львів',
      category: 'Магазини',
      image: vuhoKom,
    },
    {
      id: '4',
      title: 'Optician',
      description: 'Магазин оптики та окулярів',
      discount: 'Знижки для військових -20%',
      location: 'вул. Городоцька, Львів',
      category: 'Медичні послуги',
      image: optician,
    },
    {
      id: '5',
      title: 'Готель Львів',
      description: 'Готель для відпочинку у центрі міста',
      discount: 'Знижка -15% при наявності посвідчення УБД',
      location: 'просп. В. Чорновола, 7, Львів',
      category: 'Готелі та ресторани',
      image: hotelLviv,
    },
    {
      id: '6',
      title: 'Dopping4You',
      description: 'Продаж спортивного харчування',
      discount: 'Карта лояльності для військових',
      location: 'вул. Івана Франка, 52, Львів',
      category: 'Спорттовари',
      image: doppingYou,
    },
    {
      id: '7',
      title: 'Золотий Лимон',
      description: 'Ресторан української кухні',
      discount: 'Знижка 10% для військових',
      location: 'вул. Академіка А. Сахарова, 19а, Львів',
      category: 'Готелі та ресторани',
      image: goldLemon,
    },
    {
      id: '8',
      title: 'GOITeens',
      description: 'Онлайн-курси програмування для дітей',
      discount: 'Знижки -20% для дітей військових',
      location: 'онлайн-курси, доступ по всій Україні',
      category: 'Розваги та курси',
      image: goiTeens,
    },
    {
      id: '9',
      title: 'Colormarket',
      description: 'Магазин фарб та лакофарбової продукції',
      discount: 'Знижки -20% для військових',
      location: 'вул. Ткацька, 29, Львів',
      category: 'Магазини',
      image: colorMarket,
    },
  ];

  useEffect(() => {
    if (selectedProposal) {
      setIsFavoritesVisible(false);
      setIsSearchVisible(false);
    }
  }, [selectedProposal]);

  const filteredProposals =
    selectedCategory === 'Усі'
      ? proposals
      : proposals.filter((item) => item.category === selectedCategory);

  const handleFavoriteClick = (proposal) => {
    setFavorites((prev) =>
      prev.find((item) => item.id === proposal.id)
        ? prev.filter((item) => item.id !== proposal.id)
        : [...prev, proposal]
    );
    setSelectedProposal(proposal);
  };
  console.log('Selected Proposal:', selectedProposal);

  const addToSearchHistory = (query) => {
    if (typeof query === 'string' && query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory((prev) => [query.trim(), ...prev]);
    }
  };
  
  const handleSearchSubmit = () => {
    if (search.trim() === '') {
      setSearchResults([]); // Якщо пошук порожній, показуємо всі пропозиції
      return;
    }
  
    const filteredProposals = proposals.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  
    setSearchResults(filteredProposals);
    addToSearchHistory(search); // Передаємо рядок пошуку
  };
  

  const handleSearchClick = (proposal) => {
    setSelectedProposal(proposal);
  };
  

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Перелік пропозицій</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => setIsFavoritesVisible(true)}>
            <FontAwesome name="heart" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSearchVisible(true)}>
            <FontAwesome name="search" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProposals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedProposal(item)}>
            <View style={styles.proposalCard}>
              <Image source={item.image} style={styles.proposalImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.proposalTitle}>{item.title}</Text>
                <Text style={styles.proposalDescription}>{item.description}</Text>
                <Text style={styles.proposalDiscount}>{item.discount}</Text>
                <View style={styles.locationContainer}>
                  <FontAwesome name="map-marker" size={16} color="red" />
                  <Text style={styles.proposalLocation}>{item.location}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleFavoriteClick(item)}
                style={styles.favoriteButton}
              >
                <FontAwesome
                  name={favorites.find((fav) => fav.id === item.id) ? 'heart' : 'heart-o'}
                  size={20}
                  color={favorites.find((fav) => fav.id === item.id) ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Favorites Modal */}
      <Modal visible={isFavoritesVisible} animationType="slide">
        <View style={styles.modalFavoriteContainer}>
          <Text style={styles.modalFavoriteTitle}>Обрані</Text>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFavoriteClick(item)}>
                <View style={styles.proposalFavoriteCard}>
                  <Image source={item.image} style={styles.proposalImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.proposalTitle}>{item.title}</Text>
                    <Text style={styles.proposalDescription}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setIsFavoritesVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Search Modal */}
      <Modal visible={isSearchVisible} animationType="slide">
        <View style={styles.modalSearchContainer}>
          <Text style={styles.modalSearchTitle}>Пошук</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Введіть назву пропозиції"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              handleSearchSubmit();
            }}
          />
          <View style={styles.resultsContainer}>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSearchClick(item)}>
                    <View style={styles.proposalCard}>
                      <Image source={item.image} style={styles.proposalImage} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.proposalTitle}>{item.title}</Text>
                        <Text style={styles.proposalDescription}>{item.description}</Text>
                        <Text style={styles.proposalDiscount}>{item.discount}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            
            ) : (
              <Text style={styles.noResultsText}>Нічого не знайдено</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => setIsSearchVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={!!selectedProposal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedProposal(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProposal && (
              <>
                <Image source={selectedProposal.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProposal.title}</Text>
                <Text style={styles.modalDescription}>{selectedProposal.description}</Text>
                <Text style={styles.modalDiscount}>{selectedProposal.discount}</Text>
                {selectedProposal?.location ? (
                    <View style={styles.locationContainer}>
                      <FontAwesome name="map-marker" size={8} color="red" />
                      <Text style={styles.modalLocation}>
                        {selectedProposal.location}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.modalLocation}>Адреса відсутня</Text>
                  )}
                  
                <TouchableOpacity
                  style={styles.closeSearchButton}
                  onPress={() => setSelectedProposal(null)}
                >
                  <Text style={styles.closeSearchButtonText}>Закрити</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4C295',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#D4C295',
    borderColor: 'gray',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  proposalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  proposalFavoriteCard:{
    backgroundColor: 'white',
    width:'90%',
    borderRadius: 10,
    padding: 15,
    marginLeft:20,
    marginTop:10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  proposalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  proposalTextContainer: {
    flex: 1,
  },
  proposalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  proposalDescription: {
    fontSize: 14,
    color: 'gray',
  },
  proposalImageLarge: {
    width: '65%',
    height: 220,
    marginTop:45,
    marginLeft:65,
    borderRadius: 175,
  },
  proposalDiscount: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  proposalLocation: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFavoriteContainer:{
    backgroundColor: '#D4C295',
  },
  modalSearchContainer:{
    backgroundColor: '#D4C295',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalFavoriteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    paddingLeft:15,
  },
  modalSearchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom:10,
    paddingLeft:15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDiscount: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  modalLocation: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 8, 
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#D4C295',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeSearchButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeSearchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer:{
    flex:1,
    flexDirection:'row'
  },
  
});
