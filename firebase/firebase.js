import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
console.log(process.env.apiKey);
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};
console.log("sdsdsfsdfdsdfsfs",process.env.NEXT_PUBLIC_apiKey)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);