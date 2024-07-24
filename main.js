// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/00 firestore";

import { fetchHistoryData } from "./fetch-history-data";
import { submitData } from "./my-modules/submit-data";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjeQnLURWzYxxLjPKP64UDfKl66mSTaTI",
  authDomain: "daily-report-c8f88.firebaseapp.com",
  projectId: "daily-report-c8f88",
  storageBucket: "daily-report-c8f88.appspot.com",
  messagingSenderId: "278060495144",
  appId: "1:278060495144:web:e017f41a3f5ccfbc26601d",
};

// Initialize Firebaseg
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

  // reportsコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));

  // データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${
      doc.data().work
    }</td><td>${doc.data().comment}</td></tr>`;
  });
  document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestorenにデータを送信する
const submitData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      data: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment"),
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

//Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document
    .getElementById("js-form")
    .addEventListener("submit", (e) => submitData(e, addDoc, collection, db));
}
