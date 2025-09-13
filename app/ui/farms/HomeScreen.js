import React, {useEffect, useState} from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import DB from '../../data/db/DatabaseHelper';

export default function HomeScreen({route, navigation}){
  const userId = route.params?.userId;
  const userName = route.params?.userName;
  const [farms, setFarms] = useState([]);
  const [newName, setNewName] = useState('');

  const load = async ()=> {
    const f = await DB.getFarmsByUser(userId);
    setFarms(f);
  };
  useEffect(()=>{ load(); const int = setInterval(load,2000); return ()=>clearInterval(int); },[]);

  const create = async ()=>{
    if(!newName.trim()){ Alert.alert('Enter name'); return; }
    await DB.createFarm(userId, newName.trim());
    setNewName('');
    load();
  };

  return (
    <View style={{padding:12}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Welcome, {userName}</Text>
      <View style={{marginVertical:12}}>
        <TextInput placeholder="New farm name" value={newName} onChangeText={setNewName} style={{borderWidth:1,padding:8}} />
        <View style={{height:8}}/>
        <Button title="Create Farm" onPress={create} />
      </View>
      <Text style={{fontWeight:'bold',marginTop:12}}>Your farms</Text>
      <FlatList
        data={farms}
        keyExtractor={i=>i.id.toString()}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('FarmDetail',{farmId:item.id, farmName:item.name, userId})}>
            <View style={{padding:12,borderBottomWidth:1}}>
              <Text style={{fontSize:16}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{height:12}} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile',{userId})} />
    </View>
  );
}
