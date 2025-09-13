import SQLite from 'react-native-sqlite-storage';
import CryptoJS from 'crypto-js';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_NAME = 'kisanhub.db';
let db = null;

const hash = (password, salt) => CryptoJS.SHA256(password + salt).toString();
const genSalt = () => CryptoJS.lib.WordArray.random(8).toString();

async function initDB(){
  if (db) return db;
  db = await SQLite.openDatabase({name: DB_NAME, location: 'default'});
  await db.executeSql(`CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT UNIQUE,
    passwordHash TEXT,
    salt TEXT
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS Farms(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS Transactions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmId INTEGER,
    type TEXT,
    category TEXT,
    amount REAL,
    dateMillis INTEGER,
    note TEXT
  );`);
  return db;
}

// USER
async function createUser(name, phone, password){
  const salt = genSalt();
  const passwordHash = hash(password, salt);
  const database = await initDB();
  const res = await database.executeSql(
    'INSERT INTO Users (name, phone, passwordHash, salt) VALUES (?, ?, ?, ?);',
    [name, phone, passwordHash, salt]
  );
  return res[0].insertId;
}
async function findUserByPhone(phone){
  const database = await initDB();
  const res = await database.executeSql('SELECT * FROM Users WHERE phone = ? LIMIT 1;', [phone]);
  const rows = res[0].rows;
  return rows.length ? rows.item(0) : null;
}

// FARMS
async function createFarm(userId, farmName){
  const database = await initDB();
  const res = await database.executeSql('INSERT INTO Farms (userId, name) VALUES (?, ?);', [userId, farmName]);
  return res[0].insertId;
}
async function getFarmsByUser(userId){
  const database = await initDB();
  const res = await database.executeSql('SELECT * FROM Farms WHERE userId = ? ORDER BY id DESC;', [userId]);
  const arr = []; const rows = res[0].rows;
  for (let i=0;i<rows.length;i++) arr.push(rows.item(i));
  return arr;
}

// TRANSACTIONS
async function addTransaction(farmId, type, category, amount, note=''){
  const database = await initDB();
  await database.executeSql(
    'INSERT INTO Transactions (farmId, type, category, amount, dateMillis, note) VALUES (?, ?, ?, ?, ?, ?);',
    [farmId, type, category, amount, Date.now(), note]
  );
}
async function getTransactionsByFarm(farmId){
  const database = await initDB();
  const res = await database.executeSql('SELECT * FROM Transactions WHERE farmId = ? ORDER BY dateMillis DESC;', [farmId]);
  const arr = []; const rows = res[0].rows;
  for(let i=0;i<rows.length;i++) arr.push(rows.item(i));
  return arr;
}
async function getTotalsForFarm(farmId){
  const database = await initDB();
  const r1 = await database.executeSql("SELECT SUM(amount) as total FROM Transactions WHERE farmId = ? AND type = 'INCOME';", [farmId]);
  const r2 = await database.executeSql("SELECT SUM(amount) as total FROM Transactions WHERE farmId = ? AND type = 'EXPENSE';", [farmId]);
  const income = (r1[0].rows.length && r1[0].rows.item(0).total) || 0;
  const expense = (r2[0].rows.length && r2[0].rows.item(0).total) || 0;
  return { income: Number(income), expense: Number(expense), profit: Number(income) - Number(expense) };
}
async function getTotalsAllFarms(userId){
  const database = await initDB();
  const r1 = await database.executeSql(
    `SELECT SUM(t.amount) as totalIncome FROM Transactions t
     JOIN Farms f on t.farmId = f.id WHERE f.userId = ? AND t.type = 'INCOME';`, [userId]);
  const r2 = await database.executeSql(
    `SELECT SUM(t.amount) as totalExpense FROM Transactions t
     JOIN Farms f on t.farmId = f.id WHERE f.userId = ? AND t.type = 'EXPENSE';`, [userId]);
  const income = (r1[0].rows.length && r1[0].rows.item(0).totalIncome) || 0;
  const expense = (r2[0].rows.length && r2[0].rows.item(0).totalExpense) || 0;
  return { income: Number(income), expense: Number(expense), profit: Number(income) - Number(expense) };
}

export default {
  initDB,
  createUser, findUserByPhone,
  createFarm, getFarmsByUser,
  addTransaction, getTransactionsByFarm,
  getTotalsForFarm, getTotalsAllFarms
};
    
