import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4NjOfYAhYJYZOnYcROAwHtEEBaBKoa48",
  authDomain: "insta-b6569.firebaseapp.com",
  projectId: "insta-b6569",
  storageBucket: "insta-b6569.appspot.com",
  messagingSenderId: "451745410505",
  appId: "1:451745410505:web:53ab0fec359abfc45b8c18"
};

// getApps()返回所有已初始化程序的数组 getApp()返回应用程序
// 如果为空 初始化app 如果已经初始化数组不为空 则获取app 
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// db直接使用getFirestore();之前是用app.firestore(); 应该进化了
export { app, db, storage };
