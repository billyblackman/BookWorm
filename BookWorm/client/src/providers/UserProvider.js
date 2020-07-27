import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext();

export function UserProvider(props) {
  const apiUrl = "/api/user";

  const user = sessionStorage.getItem("user");
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(user != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUser(signInResponse.user.uid))
      .then((user) => {
        if (user.isActive === false) {
          return alert("Invalid email or password")
        } else {
          sessionStorage.setItem("user", JSON.stringify(user));
          setIsLoggedIn(true);
        }
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (user, password) => {
    debugger
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password)
      .then((createResponse) =>
        saveUser({ ...user, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUser) => {
        sessionStorage.setItem("user", JSON.stringify(savedUser));
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserByUserId = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/getById/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getUser = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getActiveUsers = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/activeUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setUsers)
    );
  };


  const saveUser = (user) => {
    debugger
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((resp) => resp.json())
    );
  };

  
  const updateUser = (user) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(getActiveUsers)
    );

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getUser,
        users,
        getUserByUserId,
        updateUser,
        getActiveUsers
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
          <Spinner className="app-spinner dark" />
        )}
    </UserContext.Provider>
  );
}
