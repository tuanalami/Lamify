import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20; 

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={recipe.image} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.footer}>
          <View style={styles.likes}>
            <FontAwesome name="heart" size={16} color="#FF6B35" />
            <Text style={styles.likeText}>{recipe.likes || 0}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>{recipe.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  textBox: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: { flexDirection: 'row', alignItems: 'center' },
  likeText: { marginLeft: 5, fontSize: 14, color: '#333' },
  category: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: { color: '#fff', fontSize: 12 },
});
