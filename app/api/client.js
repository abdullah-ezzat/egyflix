import { create } from "apisauce";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./config.json";

let BASEURL = "";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const url = ref(db, "url/");
onValue(url, (snapshot) => {
  const data = snapshot.val();
  BASEURL = data;
});

const API = create({
  baseURL: BASEURL,
});

export default {
  API,
};
