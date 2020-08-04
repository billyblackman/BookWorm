import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";

export const BookContext = createContext();

export const BookProvider = (props) => {

    const [books, setBooks] = useState([]);

    const { getToken } = useContext(UserContext);
    
    const getBooks = () =>
        getToken().then((token) =>
        fetch(`/api/book`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {setBooks(res);
          let books = res;
          return books})
      );

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

      const getQueue = () =>
        getToken().then((token) =>
        fetch(`/api/book/queue`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setBooks)
      );

      const addBook = (book) =>
      getToken().then((token) => {
      return fetch("/api/book", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        }).then((res) => res.json())
          .then((res) => {getBooks();
          let newBook = res;
          return newBook})
      });

      const editBook = (book) => 
        getToken().then((token) =>
        fetch(`/api/book/${book.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              },
              body: JSON.stringify(book),
          }).then(getBooks)
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

      const addBookToQueue = (googleId) =>
        getToken().then((token) =>
        fetch(`/api/book/addBookToQueue/${googleId}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        }).then((res) => res.json())
          .then(getCollection)
      );

      const removeBookFromQueue = (googleId) =>
        getToken().then((token) =>
        fetch(`/api/book/removeBookFromQueue/${googleId}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        }).then(getQueue)
      );
      
    const addBookFromWishlistToCollection = (googleId) => {
      return getToken().then((token) =>
        fetch(`/api/book/wishlistToCollection/${googleId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((resp) => {
          if (resp.ok) {
            getWishlist();
          } else {
            throw new Error("Unauthorized");
          }
        })
      );
    };


    return (
        <BookContext.Provider
          value={{
            books,
            getBooks,
            getCollection,
            getWishlist,
            addBook,
            editBook,
            addBookFromWishlistToCollection,
            getQueue,
            addBookToQueue,
            removeBookFromQueue,
            deleteBookByGoogleId
          }}
        >
          {props.children}
        </BookContext.Provider>
      );
}