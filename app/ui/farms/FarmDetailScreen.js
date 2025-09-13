import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import DB from '../../data/db/DatabaseHelper';

export default function FarmDetailScreen({route}){
  const farmId = route.params?.farmId;
  const farmName = route.params?.farmName;
  const [txList,setTxList] = useState([]);
  const [type,setType] = useState('EXPENSE');
  const [category,setCategory] = useState('');
  const [amount,setAmount] = useState('');
  const [totals, setTotals] = useState({income:0,expense:0,profit:0});

  const load = async ()=> {
    const t = await DB.getTransactionsByFarm(farmId);
    setTxList(t);
    const tot = await DB.getTotalsForFarm(farmId);
    setTotals(tot);
  };
  useEffect(()=>{ load(); const int=setInterval(load,2000); return ()=>clearInterval(int); },[]);

  const add = async ()=>{
    const amt = parseFloat(amount);
    if(!category || !amt){ Alert.alert('Enter category and amount'); return; }
    await DB.addTransaction(farmId, type, category, amt, '');
    setCategory(''); setAmount('');
    load();
  };

  const del = async (id)=> {
    await DB.initDB(); // ensure
    const db = await DB.initDB();
    await db.executeSql('DELETE FROM Transactions WHERE id = ?;', [id]);
    load();
  };

  return (
    <View style={{padding:12}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>Farm: {farmName}</Text>
      <View style={{marginVertical:10}}>
        <Text>Total Income: ₹ {totals.income.toFixed(2)}</Text>
        <Text>Total Expense: ₹ {totals.expense.toFixed(2)}</Text>
        <Text style={{marginTop:6}}>{totals.profit>0?`Profit: ₹ ${totals.profit.toFixed(2)}`: totals.profit<0?`Loss: ₹ ${(-totals.profit).toFixed(2)}`:'Break-even'}</Text>
      </View>

      <View style={{marginVertical:8}}>
        <TextInput placeholder="Type (INCOME / EXPENSE)" value={type} onChangeText={setType} style={{borderWidth:1,padding:8}} />
        <TextInput placeholder="Category (Seeds, Labour...)" value={category} onChangeText={setCategory} style={{borderWidth:1,padding:8,marginTop:8}} />
        <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={{borderWidth:1,padding:8,marginTop:8}} />
        <View style={{height:8}}/>
        <Button title="Add Transaction" onPress={add} />
      </View>

      <Text style={{fontWeight:'bold',marginTop:12}}>Transactions</Text>
      <FlatList data={txList} keyExtractor={i=>i.id.toString()} renderItem={({item})=>(
        <TouchableOpacity onLongPress={()=> Alert.alert('Delete','Delete?',[{text:'Cancel'},{text:'Delete', style:'destructive', onPress:()=>del(item.id)}])}>
          <View style={{padding:8,borderBottomWidth:1}}>
            <Text style={{fontWeight:'bold'}}>{item.type} — ₹ {parseFloat(item.amount).toFixed(2)}</Text>
            <Text>{item.category} • {new Date(item.dateMillis).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
      )} />
    </View>
  );
}
