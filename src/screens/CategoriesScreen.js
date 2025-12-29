import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
  {
    id: '1',
    title: 'Sweet',
    key: 'sweet',
    color: '#FFB6C1',
  },
  {
    id: '2',
    title: 'Meal',
    key: 'meal',
    color: '#87CEFA',
  },
  {
    id: '3',
    title: 'Breakfast',
    key: 'breakfast',
    color: '#FFA07A',
  },
  {
    id: '4',
    title: 'Lunch',
    key: 'lunch',
    color: '#98FB98',
  },
  {
    id: '5',
    title: 'Dinner',
    key: 'dinner',
    color: '#FFD700',
  },
];


export default function CategoriesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() =>
        navigation.navigate('CategoryRecipes', {
          category: item.key,
          title: item.title,
        })
      }
    >
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipe Categories</Text>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  categoryCard: {
    width: width - 20,
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
