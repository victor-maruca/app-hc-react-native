import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#673AB7',
    secondary: '#009688',
    tertiary: '#3F51B5',
    quaternary: '#9C27B0'
  },
};

export default function Main() {
    return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </NavigationContainer>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
