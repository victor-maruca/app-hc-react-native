import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { IDView } from './Pages/ID';
import { FAQView } from './Pages/FAQ'
import { ChecklistView } from './Pages/Checklist/ChecklistView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import { HomeView } from './Pages/Home';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          switch(route.name) {
            case 'Carteira': iconName = 'address-card'; break;
            case 'FAQ': iconName = 'question-circle'; break;
            case 'Checklist': iconName = 'commenting'; break;
            case 'Home': iconName = 'home'; break;
          }
          return <Icon name={iconName} color={color} size={22}/>;
        },
      })}
    >
        <Tab.Screen name="Home" options={{ tabBarColor: colors.secondary, title: "Bem vindo!" }} component={HomeView} />
        <Tab.Screen name="Carteira" options={{ tabBarColor: colors.quaternary, title: "Carteira HC" }} component={IDView} />
        <Tab.Screen name="Checklist"  options={{ tabBarColor: colors.primary, title: "Dr. Virtual" }} component={ChecklistView} />
        <Tab.Screen name="FAQ" options={{ tabBarColor: colors.tertiary }} component={FAQView} />
    </Tab.Navigator>
  );
};

export default App;
