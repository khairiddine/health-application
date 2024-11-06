import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react'; 

const Drawer = createDrawerNavigator();
import Home from './screens/Home';
import Recommandation from './screens/Recommandation';
import Articles from './screens/Articles';
import Map from './screens/Map';
import Datauser from './screens/Datauser';
import { Ionicons } from '@expo/vector-icons';
import Predictionhealth from './screens/Predictionhealth';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

function App() {
  const [selectedScreen, setSelectedScreen] = useState('Home'); 

  const handleItemPress = (screenName) => {
    setSelectedScreen(screenName); 
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          );
        }}
        screenOptions={({ route }) => ({
          drawerStyle: {
            width: 335
          },
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
            color: route.name === selectedScreen ? 'black' : 'black',
            
          },
          drawerContentOptions: {
            activeBackgroundColor: route.name === selectedScreen ? 'transparent' : 'transparent',  
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color='#4fc65b' />
            )
          }}
        />
        <Drawer.Screen
          name="Data"
          component={Datauser}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="analytics-outline" size={size} color='#4fc65b' />
            )
          }}
        />
        <Drawer.Screen
          name="Articles"
          component={Articles}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="article" size={24} color='#4fc65b' />
            )
          }}
        />
        <Drawer.Screen
          name="Heart disease prediction"
          component={Predictionhealth}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="batch-prediction" size={24} color='#4fc65b' />
            )
          }}
        />
        <Drawer.Screen
          name="Health Recommandation"
          component={Recommandation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="medkit-outline" size={size} color='#4fc65b' />
            )
          }}
        />
        <Drawer.Screen
          name="Map"
          component={Map}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome6 name="map-location-dot" size={24} color='#4fc65b' />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
