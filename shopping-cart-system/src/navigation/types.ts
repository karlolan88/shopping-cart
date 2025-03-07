import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

export interface ScreenProps {
  navigation: NavigationProp<RootStackParamList>;
}
