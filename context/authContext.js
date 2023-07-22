import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import apiCaller from "@/api/apiCaller";

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userSettings, setUserSettings] = useState({}); // Initialize user settings with an empty object

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const updateUserSettings = async (user) => {
    if (user && user.email) {
      try {;
        const response = await apiCaller.getUserDetails(user.email);
        setUserSettings(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      updateUserSettings(currentUser).then(() => setUser(currentUser));
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userSettings, googleSignIn, logOut, setUserSettings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
