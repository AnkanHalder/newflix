import {useContext,createContext,useState,useEffect} from "react";
const AuthContext = createContext();
export const AuthContextProvider = ({childern}) => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>
}
export const UserAuth = () => {
    return useContext(AuthContext);
}