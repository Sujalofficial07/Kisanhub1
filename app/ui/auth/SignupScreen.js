import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DB from '../../data/db/DatabaseHelper';

export default function SignupScreen({navigation}){
  const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [pass,setPass]=useState('');
  const onSignup = async ()=>{
    if(!name||!phone||pass.length<4){ Alert.alert('Error','Fill fields, password >=4'); return; }
    try{
      await DB.createUser(name, phone, pass);
      Alert.alert('Success','Account created, please login');
      navigation.replace('Login');
    }catch(err){
      console.log(err); Alert.alert('Error','Could not create user (maybe phone exists)');
    }
  };
  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Signup</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{borderWidth:1,marginTop:8,padding:8}} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{borderWidth:1,marginTop:8,padding:8}} keyboardType="phone-pad" />
      <TextInput placeholder="Password" value={pass} onChangeText={setPass} style={{borderWidth:1,marginTop:8,padding:8}} secureTextEntry />
      <View style={{height:12}}/>
      <Button title="Create Account" onPress={onSignup} />
    </View>
  );
}
