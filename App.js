import * as  React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from './src/core/theme'
import ProfilScreen from './src/screens/ProfilScreen'
import MarketPlace from './src/screens/MarketPlace'
import Ecosysteme from './src/screens/Ecosysteme'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Profil" component={ProfilScreen} />
          <Tab.Screen name="MarketPlace" component={MarketPlace} />
          <Tab.Screen name="Ecosysteme" component={Ecosysteme} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}