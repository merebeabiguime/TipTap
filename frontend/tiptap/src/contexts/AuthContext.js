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
import { useIsFetching, useMutation, useQuery } from "react-query";
import { Spinner } from "react-bootstrap";

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
  const logoutMy = useRef(false);
  const enableRefreshQuery = useRef(false);
  const enableGoogleAuth = useRef(false);
  const fetchAuth = useFetchAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  let loginMutationId = useRef(null);
  const [navigateTo, setNavigateTo] = useState("");
  const isFetching = useIsFetching();
  const userIdValueQR = useRef(null);
  const staffAuthObject = useRef({});

  const qrCodeMutation = useMutation({
    mutationFn: async () =>
      await myAxios.get(`/qrcode/${userIdValueQR.current}`, {
        headers: { Authorization: "Bearer " + accessToken },
      }),
    onSuccess: (data) => {
      if (data.data.status == "Success") {
        //ADD COOLDOWN BEFOFRE GOING TO NEXT PAGE
        setMessage("Success");
        staffAuthObject.current = data.data.response[0];

        setNavigateTo(
          "/privateManager/private-home-manager/add-staff/select-staff-role"
        );
      } else {
        //setValidation(data.response);
        setMessage(data.data.response);
        setNavigateTo("/privateManager/private-home-manager/");
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => await fetchAuth.logout(),
  });

  function qrCodeCall(uId) {
    userIdValueQR.current = uId;
    qrCodeMutation.mutate();
  }

  const refreshMutation = useMutation({
    mutationFn: async () =>
      await myAxios.get("/refresh", {
        withCredentials: true,
      }),
    enabled: enableRefreshQuery.current,
    onSuccess: (data) => {
      if (data.data.status === "Success") {
        //On est connecté redirect vers la response(c'est forcément un worker)
        setAccessToken(data.data.accessToken);
        setUserObject(jwtDecode(data.data.accessToken));
      } else {
        //On logout de google et on affiche un message d'erreur
        //Message d'erreur
        signOutFirebase();
      }
      enableRefreshQuery.current = false;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () => await fetchAuth.login(loginMutationId.current),
    onSuccess: (data) => {
      if (data.status === "Success") {
        setAccessToken(data.accessToken);
        setUserObject(jwtDecode(data.accessToken));
        setNavigateTo(data.response);
      } else {
        //Message d'erreur
        setNavigateTo(data.response);
      }
    },
  });

  const otherAuthMutation = useMutation({
    mutationFn: async () => await fetchAuth.otherAuth(googleUser.current[0]),
    onSuccess: (data) => {
      if (data.status === "Success") {
        setAccessToken(data.accessToken);

        loginMutationId.current = googleUser.current[0].uid;
        loginMutation.mutate();
      } else {
        //Message d'erreur
      }
    },
  });

  function setNavigateCallback(callback, id) {
    loginMutationId.current = id;
    loginMutation.mutate();
    callback(navigateTo);
  }

  async function signOutMy() {
    logoutMutation.mutate();
  }

  function refresh() {
    refreshMutation.mutate();
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
      //Message d'erreur
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
    if (!accessToken) {
      refresh();
    }
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
        qrCodeCall,
        qrCodeMutation,
        message,
        staffAuthObject,
      }}
    >
      {!loadingData && !isFetching ? (
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
    refresh,
    logoutMutation,
    signOutMy,
    signOutFirebase,
    signInWith,
    loginMutationId,
    navigateTo,
    setNavigateCallback,
    auth,
    qrCodeCall,
    qrCodeMutation,
    message,
    staffAuthObject,
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
    qrCodeCall,
    qrCodeMutation,
    message,
    staffAuthObject,
  };
}
