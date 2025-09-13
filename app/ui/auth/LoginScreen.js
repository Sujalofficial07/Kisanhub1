import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DB from '../../data/db/DatabaseHelper';
import CryptoJS from 'crypto-js';

export default function LoginScreen({navigation}){
  const [phone,setPhone]=useState(''); const [pass,setPass]=useState('');
  const onLogin = async ()=>{
    if(!phone||!pass){ Alert.alert('Enter credentials'); return; }
    try{
      const user = await DB.findUserByPhone(phone);
      if(!user){ Alert.alert('No user'); return; }
      const hashed = CryptoJS.SHA256(pass + user.salt).toString();
      if(hashed !== user.passwordHash){ Alert.alert('Invalid'); return; }
      navigation.replace('Home', { userId: user.id, userName: user.name });
    }catch(err){
      console.log(err); Alert.alert('Login error');
    }
  };
  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Login</Text>
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{borderWidth:1,marginTop:8,padding:8}} keyboardType="phone-pad" />
      <TextInput placeholder="Password" value={pass} onChangeText={setPass} style={{borderWidth:1,marginTop:8,padding:8}} secureTextEntry />
      <View style={{height:12}}/>
      <Button title="Login" onPress={onLogin} />
      <View style={{height:8}}/>
      <Button title="Signup" onPress={()=>navigation.navigate('Signup')} />
    </View>
  );
    }
                                                                   
