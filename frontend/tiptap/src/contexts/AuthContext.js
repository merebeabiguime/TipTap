import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { myAxios } from "../axios/axios";

import { jwtDecode } from "jwt-decode";

import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useFetchAuth } from "../fetches/FetchAuth.js";
import { useQuery } from "react-query";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userRole, setUserRole] = useState(0);
  const [userObject, setUserObject] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const userObjectRole = useRef(0);
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});
  const logoutMy = useRef(false);
  const enableRefreshQuery = useRef(false);
  const fetchAuth = useFetchAuth();

  const logoutQuery = useQuery({
    queryKey: ["logoutQuery"],
    queryFn: async () => await fetchAuth.logout(),
    enabled: logoutMy.current,
    onSuccess: () => {
      logoutMy.current = false;
    },
  });

  const refreshQuery = useQuery({
    queryKey: ["refreshQuery"],
    queryFn: async () =>
      await await myAxios.get("http://localhost:8081/refresh", {
        withCredentials: true,
      }),
    enabled: enableRefreshQuery.current,
    onSuccess: (data) => {
      if (data.status === "Success") {
        setAccessToken(data.accessToken);
      } else {
        signOutFirebase();
      }
      enableRefreshQuery.current = false;
    },
  });

  async function signOutMy() {
    logoutMy.current = true;
  }

  async function refresh() {
    enableRefreshQuery.current = true;
  }

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

  function signOutFirebase() {
    return signOut(auth);
  }

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    //Check if there is a JWT Token, if not automatically logout user from Firebase
    if (accessToken) {
      console.log("token", jwtDecode(accessToken));
      setUserObject(jwtDecode(accessToken));
    }
  }, [accessToken]);

  const verifyRefreshToken = async () => {
    try {
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    !accessToken && verifyRefreshToken();
  }, []);

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
        refresh,
        logoutQuery,
        signOutMy,
        signOutFirebase,
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
    refresh,
    logoutQuery,
    signOutMy,
    signOutFirebase,
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
    refresh,
    logoutQuery,
    signOutMy,
    signOutFirebase,
  };
}
