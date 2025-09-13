import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import DB from './app/data/db/DatabaseHelper';

export default function App() {
  useEffect(() => { DB.initDB().catch(e => console.warn(e)); }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
