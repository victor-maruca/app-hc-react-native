import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IDView } from './Pages/ID';
import { FAQView } from './Pages/FAQ'
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Carteira"
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Carteira') {
            iconName = 'address-card'
          } else if (route.name === 'FAQ') {
            iconName = 'question-circle'
          }

          return <Icon name={iconName} color={color} size={22}/>;
        },
      })}
    >
        <Tab.Screen name="Carteira" options={{tabBarActiveBackgroundColor: 'red'}} component={IDView} />
        <Tab.Screen name="FAQ" options={{tabBarActiveBackgroundColor: 'red'}} component={FAQView} />
    </Tab.Navigator>
  );
};

export default App;
