import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import DB from '../../data/db/DatabaseHelper';

export default function ProfileScreen({route, navigation}){
  const userId = route.params?.userId;
  const [totals, setTotals] = useState({income:0,expense:0,profit:0});

  const load = async ()=> {
    const t = await DB.getTotalsAllFarms(userId);
    setTotals(t);
  };
  useEffect(()=>{ load(); const int=setInterval(load,3000); return ()=>clearInterval(int); },[]);

  return (
    <View style={{padding:12}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Profile</Text>
      <Text style={{marginTop:12}}>Combined Income: ₹ {totals.income.toFixed(2)}</Text>
      <Text>Combined Expense: ₹ {totals.expense.toFixed(2)}</Text>
      <Text style={{marginTop:6}}>{totals.profit>0?`Profit: ₹ ${totals.profit.toFixed(2)}`: totals.profit<0?`Loss: ₹ ${(-totals.profit).toFixed(2)}`:'Break-even'}</Text>
      <View style={{height:12}}/>
      <Button title="Back to Home" onPress={()=>navigation.navigate('Home', { userId })} />
    </View>
  );
}
