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
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useFetchAuth } from "../fetches/FetchAuth.js";
import { useMutation, useQuery } from "react-query";
import { Spinner } from "react-bootstrap";
import { useFetchUsers } from "../fetches/FetchUsers.js";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userRole, setUserRole] = useState(0);
  const [userObject, setUserObject] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const userObjectRole = useRef(0);
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});
  const googleUser = useRef([]);
  const logoutMy = useRef(false);
  const enableRefreshQuery = useRef(false);
  const enableGoogleAuth = useRef(false);
  const fetchAuth = useFetchAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  let loginMutationId = useRef(null);
  const [navigateTo, setNavigateTo] = useState("");

  const logoutMutation = useMutation({
    mutationFn: async () => await fetchAuth.logout(),
  });

  const refreshQuery = useQuery({
    queryKey: ["refreshQuery"],
    queryFn: async () =>
      await myAxios.get("http://localhost:8081/refresh", {
        withCredentials: true,
      }),
    enabled: enableRefreshQuery.current,
    onSuccess: (data) => {
      if (data.data.status === "Success") {
        //On est connecté redirect vers la response(c'est forcément un worker)
        setAccessToken(data.data.accessToken);
        console.log(data);
      } else {
        //On logout de google et on affiche un message d'erreur
        console.log(data);
      }
      enableRefreshQuery.current = false;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () => await fetchAuth.login(loginMutationId.current),
    onSuccess: (data) => {
      console.log("login mutation corect");
      if (data.status === "Success") {
        setAccessToken(data.accessToken);
        setNavigateTo(data.response);
        console.log(data);
        console.log("successfull", data);
      } else {
        console.log("unsucessfull", data);
        setNavigateTo(data.response);
      }
    },
  });

  const otherAuthMutation = useMutation({
    mutationFn: async () => await fetchAuth.otherAuth(googleUser.current[0]),
    onSuccess: (data) => {
      console.log("merebe", data);
      if (data.status === "Success") {
        setAccessToken(data.accessToken);
        console.log("success");

        loginMutationId.current = googleUser.current[0].uid;
        loginMutation.mutate();
      }
    },
  });

  function setNavigateCallback(callback, id) {
    console.log("id", id);
    loginMutationId.current = id;
    loginMutation.mutate();
    callback(navigateTo);
  }

  async function signOutMy() {
    logoutMutation.mutate();
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

  async function signInWith(authProvider) {
    let provider = null;
    if (authProvider == "google") {
      provider = googleProvider;
    } else if (authProvider == "facebook") {
      provider = facebookProvider;
    } else if (authProvider == "apple") {
      //provider = facebookProvider;
      provider = googleProvider;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      googleUser.current.push(result.user);
      otherAuthMutation.mutate();
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("erreur", errorCode, errorMessage);
    }
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

  useEffect(() => {
    !accessToken && refresh();
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
        logoutMutation,
        signOutMy,
        signOutFirebase,
        signInWith,
        loginMutationId,
        navigateTo,
        setNavigateCallback,
        auth,
      }}
    >
      {!loadingData && !refreshQuery.isLoading ? (
        props.children
      ) : (
        <Spinner animation="border" />
      )}
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
    logoutMutation,
    signOutMy,
    signOutFirebase,
    signInWith,
    loginMutationId,
    navigateTo,
    setNavigateCallback,
    auth,
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
    logoutMutation,
    signOutMy,
    signOutFirebase,
    signInWith,
    loginMutationId,
    navigateTo,
    setNavigateCallback,
    auth,
  };
}
