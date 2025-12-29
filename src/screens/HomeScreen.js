import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { recipes } from '../data/recipes';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns - 10;

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
   <TouchableOpacity
  style={styles.itemContainer}
  onPress={() => navigation.getParent()?.navigate('RecipeDetail', { recipe: item })}
>
  <Image source={item.image} style={styles.image} />
  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
</TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      {/* Title above recipes */}
      <Text style={styles.recipesTitle}>RECIPES</Text>
   
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 5
  },
   recipesTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
    textAlign: 'center', // center the text
   },
  itemContainer: {
    width: itemWidth,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3
  },
  image: {
    width: '100%',
    height: itemWidth,
    resizeMode: 'cover'
  },
  title: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  }
});

