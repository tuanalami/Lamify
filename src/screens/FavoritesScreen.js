import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IMAGE_SIZE = 300;

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favoritesArray);
      } catch (error) {
        console.log('Error fetching favorites:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchFavorites);

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>You have no favorite recipes yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // one per row
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center', // center horizontally
    marginBottom: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 15,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 450,
  },
});

