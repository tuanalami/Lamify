import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { recipes } from '../data/recipes';

const { width } = Dimensions.get('window');

export default function CategoryRecipes({ route, navigation }) {
  const { category, title } = route.params;

  const filteredRecipes = recipes.filter(
    (item) => item.category === category
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('RecipeDetail', {
          recipe: item,
        })
      }
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.subText}>Tap to view recipe</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    height: 120,
  },
  image: {
    width: 120,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});
