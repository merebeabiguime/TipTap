import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../firebase.js";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [userRole, setUserRole] = useState(0);
  const staffObject = useRef({});
  const [userObject, setUserObject] = useState({});
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState({});
  const [staffListFilter, setStaffListFilter] = useState([{}]);
  const [staffList, setStaffList] = useState([{}]);

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
      setUserObject({});
      console.log("AUTH DETRUIT");
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
        staffObject,
        userObject,
        setUserObject,
        percentage,
        setPercentage,
        data,
        setData,
        staffListFilter,
        setStaffListFilter,
        staffList,
        setStaffList,
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
    staffObject,
    userObject,
    setUserObject,
    percentage,
    setPercentage,
    data,
    setData,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
  } = useContext(UserContext);

  return {
    userRole,
    selectRole,
    signUp,
    signIn,
    currentUser,
    forgotPassword,
    resetPassword,
    staffObject,
    userObject,
    setUserObject,
    percentage,
    setPercentage,
    data,
    setData,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
  };
}
