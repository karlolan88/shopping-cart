import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ScreenProps } from '../navigation/types';

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <Text>Loading...</Text>;
  }

  const { addToCart, cart, products } = cartContext;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PGR: Replica Store</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productDetails}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        style={[styles.goToCartButton, cart.length === 0 && styles.disabledButton]} 
        onPress={() => navigation.navigate('Cart')} 
        disabled={cart.length === 0}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF0000', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF', 
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productDetails: {
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#FF0000', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  goToCartButton: {
    backgroundColor: '#FF0000', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#B0B0B0', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
