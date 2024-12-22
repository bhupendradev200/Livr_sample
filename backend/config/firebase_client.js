import dotenv from 'dotenv';
dotenv.config(); // Ensure this is called at the very beginning

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import fs from 'fs';


// Check if FIREBASE_CONFIG is defined
if (!process.env.FIREBASE_CONFIG) {
  console.error('FIREBASE_CONFIG is not defined in the environment variables.');
  process.exit(1); // Exit the process with an error code
} else {
  // console.log(`FIREBASE CONFIG: ${process.env.FIREBASE_CONFIG}`);
}

// Read Firebase configuration from environment variables or fallback to secrets file
const firebaseConfig = process.env.FIREBASE_CONFIG 
  ? JSON.parse(process.env.FIREBASE_CONFIG) 
  : JSON.parse(fs.readFileSync('/run/secrets/ApiKey.json', 'utf8'));

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db_client = getFirestore(app);

export { db_client };

