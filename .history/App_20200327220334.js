import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTab from '../components/tab-navigation/home';
import SearchTab from '../components/tab-navigation/search';
import AddMediaTab from '../components/tab-navigation/add-media';
import LikesTab from '../components/tab-navigation/likes';
import ProfileTab from '../components/tab-navigation/profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Search" component={SearchTab} />
      <Tab.Screen name="Add Media" component={AddMediaTab} />
      <Tab.Screen name="Likes" component={LikesTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
