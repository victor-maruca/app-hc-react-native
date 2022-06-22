import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.viewContainer}>
      <StatusBar barStyle='light-content' />
      <Text style={styles.helloText}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  helloText: {
    fontSize: 30
  }
});

export default App;
