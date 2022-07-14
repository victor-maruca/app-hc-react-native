import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IDView } from './Pages/ID';
import { FAQView } from './Pages/FAQ'
import { MapView } from './Pages/Map';
import { ChecklistView } from './Pages/Checklist/ChecklistView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Carteira"
      shifting={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Carteira') {
            iconName = 'address-card'
          } else if (route.name === 'FAQ') {
            iconName = 'question-circle'
          } else if (route.name === 'Mapa') {
            iconName = 'map-marker'
          } else if (route.name === 'Checklist') {
            iconName = 'list-ul'
          }

          return <Icon name={iconName} color={color} size={22}/>;
        },
      })}
    >
        <Tab.Screen name="Carteira" options={{ tabBarColor: colors.quaternary }} component={IDView} />
        <Tab.Screen name="Checklist" options={{ tabBarColor: colors.primary }} component={ChecklistView} />
        <Tab.Screen name="FAQ" options={{ tabBarColor: colors.tertiary }} component={FAQView} />
    </Tab.Navigator>
  );
};

export default App;
