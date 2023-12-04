import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { useIsFetching, useMutation, useQuery } from "react-query";
import { useFetchAuth } from "../fetches/FetchAuth.js";
import { useFetchUsers } from "../fetches/FetchUsers.js";
import { auth } from "../firebase.js";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userRole, setUserRole] = useState(0);
  const [userObject, setUserObject] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const userObjectRole = useRef(0);
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const googleUser = useRef([]);

  const fetchAuth = useFetchAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [navigateTo, setNavigateTo] = useState("");
  const isFetching = useIsFetching();
  const userIdValueQR = useRef(null);
  const staffAuthObject = useRef({});
  const fetchUser = useFetchUsers();
  const resetPasswordURL = useRef("");
  const [otpPhoneNumber, setOtpPhoneNumber] = useState("");

  function setResetPasswordURL(url) {
    resetPasswordURL.current = url;
  }

  const [currentUser, setCurrentUser] = useState(null);

  const getUserInfos = useQuery({
    queryFn: async () => await fetchUser.getUser(currentUser.uid),
    queryKey: "User Infos",
    enabled: !!currentUser,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.status === "Success") {
        console.log("successsss");
        //Pourquoi setAccess Token avant d'appeler loginMutation ?
        setUserObject(data.response);
        if (
          !currentUser.emailVerified &&
          data.response[0].verified === 0 &&
          resetPasswordURL.current === ""
        ) {
          setNavigateTo("/choose-verif-method");
        } else if (resetPasswordURL.current !== "") {
          setNavigateTo(resetPasswordURL.current);
        } else if (data.response[0].role === 1) {
          setNavigateTo("/privateWorker/private-home-worker");
        } else if (data.response[0].role === 2) {
          setNavigateTo("/privateManager/private-home-manager");
        }
      } else {
        //Message d'erreur
      }
    },
  });

  const otherAuthMutation = useMutation({
    mutationFn: async () => await fetchAuth.otherAuth(googleUser.current[0]),
    onSuccess: (data) => {
      if (data.status === "Success") {
        //Pourquoi setAccess Token avant d'appeler loginMutation ?
        setAccessToken(data.accessToken);
        //LOGIN MUTATION
      } else {
        //Message d'erreur
      }
    },
  });

  function selectRole(userRole) {
    setUserRole(userRole);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function verifyEmail() {
    return sendEmailVerification(auth.currentUser);
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
    if (authProvider === "google") {
      provider = googleProvider;
    } else if (authProvider === "facebook") {
      provider = facebookProvider;
    } else if (authProvider === "apple") {
      //provider = facebookProvider;
      provider = googleProvider;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      googleUser.current.push(result.user);
      otherAuthMutation.mutate();
    } catch (error) {
      // Handle Errors here.
      //Message d'erreur
    }
  }

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
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
        signOutFirebase,
        signInWith,
        navigateTo,
        auth,
        setCurrentUser,
        message,
        staffAuthObject,
        getUserInfos,
        verifyEmail,
        resetPasswordURL,
        setResetPasswordURL,
        otpPhoneNumber,
        setOtpPhoneNumber,
      }}
    >
      {!isFetching && !loadingData ? (
        props.children
      ) : (
        <div className="centered-div">
          <Spinner animation="border" />
        </div>
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
    signOutFirebase,
    signInWith,
    navigateTo,
    auth,
    message,
    staffAuthObject,
    getUserInfos,
    verifyEmail,
    resetPasswordURL,
    setResetPasswordURL,
    otpPhoneNumber,
    setOtpPhoneNumber,
    setCurrentUser,
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
    signOutFirebase,
    signInWith,
    navigateTo,
    auth,
    message,
    staffAuthObject,
    getUserInfos,
    verifyEmail,
    resetPasswordURL,
    setResetPasswordURL,
    otpPhoneNumber,
    setOtpPhoneNumber,
    setCurrentUser,
  };
}
