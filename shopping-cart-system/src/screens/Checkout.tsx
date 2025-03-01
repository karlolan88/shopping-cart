import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ScreenProps } from '../navigation/types';

const CheckoutScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { cart, clearCart } = useContext(CartContext);

  // Fix: Explicitly type sum and item
  const totalPrice = cart.reduce((sum: number, item: { price: number; quantity: number }) => 
    sum + item.price * item.quantity, 
    0
  );

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      'Thank you for your purchase!',
      [{ text: 'OK', onPress: () => {
          clearCart();
          navigation.navigate('Home');
        } 
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>No items to checkout.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {item.quantity} x ${item.price.toFixed(2)} = ${(
                  item.price * item.quantity
                ).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <>
          <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
          {/* Fix: Correct Button syntax */}
          <Button title="Checkout" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
};

// Fix: Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
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
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
  },
});

export default CheckoutScreen;
