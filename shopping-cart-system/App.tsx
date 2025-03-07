import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <AppNavigator />
      </SafeAreaView>
    </CartProvider>
  );
}
