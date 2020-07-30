import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";

export const BookContext = createContext();

export const BookProvider = (props) => {

    const [books, setBooks] = useState([]);

    const { getToken } = useContext(UserContext);    

    const getCollection = () =>
        getToken().then((token) =>
        fetch(`/api/book/collection`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setBooks)
      );

      const getWishlist = () =>
        getToken().then((token) =>
        fetch(`/api/book/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setBooks)
      );

      const addBook = (book) =>
      getToken().then((token) =>
      fetch("/api/book", {
          method: "POST",
          headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
      }).then(getCollection())
    );

    const deleteBookByGoogleId = (googleId) => 
      getToken().then((token) =>
      fetch(`/api/book/deleteByGoogleId/${googleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          getCollection();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );



    return (
        <BookContext.Provider
          value={{
            books,
            getCollection,
            getWishlist,
            addBook,
            deleteBookByGoogleId
          }}
        >
          {props.children}
        </BookContext.Provider>
      );
}