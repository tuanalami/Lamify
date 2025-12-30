import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import { recipes } from '../data/recipes';

const NUM_COLUMNS = 3;
const SPACING = 10;

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();

  
  const ITEM_SIZE =
    (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { width: ITEM_SIZE, height: ITEM_SIZE }]}
      onPress={() =>
        navigation.getParent()?.navigate('RecipeDetail', {
          recipe: item
        })
      }
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RECIPES</Text>

      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12
  },
  item: {
    margin: SPACING / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3
  },
  image: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover'
  },
  title: {
    height: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    paddingTop: 4
  }
});
