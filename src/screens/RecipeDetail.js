import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeDetail({ route, navigation }) {
  const { recipe } = route.params;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
        setLiked(favoritesArray.some(r => r.id === recipe.id));
      } catch (error) {
        console.log('Error reading favorites:', error);
      }
    };

    checkFavorite();
  }, [recipe.id]);

  const toggleLike = async () => {
    try {
      
      const email = await AsyncStorage.getItem('userEmail');

      if (!email) {
        Alert.alert(
          'Login Required',
          'You need an account to save favorites.',
          [{ text: 'Login', onPress: () => navigation.navigate('Login') }]
        );
        return;
      }

      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (liked) {
        favoritesArray = favoritesArray.filter(r => r.id !== recipe.id);
        setLiked(false);
      } else {
        favoritesArray.push(recipe);
        setLiked(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.log('Error updating favorites:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>

      <View style={styles.card}>
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      </View>

      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={28}
          color={liked ? 'red' : 'gray'}
        />
        <Text style={styles.likeText}>
          {liked ? 'Liked' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>

      <Image source={recipe.image} style={styles.image} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  instructions: {
    fontSize: 18,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  likeText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 40,
    resizeMode: 'contain',
  },
});
