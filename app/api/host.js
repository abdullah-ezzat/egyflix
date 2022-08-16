const { getDatabase, ref, update } = require("firebase/database");
const { initializeApp } = require("firebase/app");
const { url } = require("./enviroment.json");
const { firebaseConfig } = require("./config.json");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const updates = {};
updates["/url/"] = url;

update(ref(db), updates);
