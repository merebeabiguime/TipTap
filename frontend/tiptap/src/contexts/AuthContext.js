import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from "react";

import { jwtDecode } from "jwt-decode";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { QueryCache } from "react-query";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userRole, setUserRole] = useState(0);
  const [userObject, setUserObject] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const userObjectRole = useRef(0);
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});

  function selectRole(userRole) {
    setUserRole(userRole);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });
    //Check if there is a JWT Token, if not automatically logout user from Firebase
    if (accessToken) {
      console.log("token", jwtDecode(accessToken));
      setUserObject(jwtDecode(accessToken.data));
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    //Check if there is a JWT Token, if not automatically logout user from Firebase
    if (accessToken) {
      console.log("token", jwtDecode(accessToken));
      setUserObject(jwtDecode(accessToken));
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        userRole,
        selectRole,
        signUp,
        signIn,
        currentUser,
        forgotPassword,
        resetPassword,
        userObject,
        setUserObject,
        percentage,
        setPercentage,
        data,
        setData,
        userObjectRole,
        accessToken,
        setAccessToken,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const {
    userRole,
    selectRole,
    signUp,
    signIn,
    currentUser,
    forgotPassword,
    resetPassword,
    userObject,
    setUserObject,
    percentage,
    setPercentage,
    data,
    setData,
    userObjectRole,
    accessToken,
    setAccessToken,
  } = useContext(UserContext);

  return {
    userRole,
    selectRole,
    signUp,
    signIn,
    currentUser,
    forgotPassword,
    resetPassword,
    userObject,
    setUserObject,
    percentage,
    setPercentage,
    data,
    setData,
    userObjectRole,
    accessToken,
    setAccessToken,
  };
}
