import React, { useContext, useState, useEffect, createContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase.js";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  const [userRole, setUserRole] = useState(0);

  function selectRole(userRole) {
    setUserRole(userRole);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <UserContext.Provider value={{ userRole, selectRole, signUp }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const { userRole, selectRole, signUp } = useContext(UserContext);

  return { userRole, selectRole, signUp };
}
