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
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useFetchAuth } from "../fetches/FetchAuth.js";
import { useMutation, useQuery } from "react-query";
import { Spinner } from "react-bootstrap";

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
  const loginMutationId = useRef(null);
  const [navigateTo, setNavigateTo] = useState("");

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
        console.log("successfull", data);
      } else {
        console.log("unsucessfull", data);
        setNavigateTo(data.response);
      }
    },
  });

  const googleMutation = useMutation({
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

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const googleCredential = GoogleAuthProvider.credentialFromResult(result);
      const googleToken = googleCredential.accessToken;
      // The signed-in user info.
      googleUser.current.push(result.user);
      console.log("google user", googleUser.current[0].auth);
      console.log(result.user);
      console.log("pas d'erreur");
      // Try to connect in Node.js db
      googleMutation.mutate();

      // Execute googleQuery here or set a flag to enable it in the useEffect
      // depending on your use case
      // enableGoogleAuth.current = true;
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("erreur", errorCode, errorMessage);
      // ...
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
        logoutQuery,
        signOutMy,
        signOutFirebase,
        signInWithGoogle,
        loginMutationId,
        navigateTo,
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
    logoutQuery,
    signOutMy,
    signOutFirebase,
    signInWithGoogle,
    loginMutationId,
    navigateTo,
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
    signInWithGoogle,
    loginMutationId,
    navigateTo,
  };
}
