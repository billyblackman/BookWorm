import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";

export const BookContext = createContext();

export const BookProvider = (props) => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    const [books, setBooks] = useState([]);

    const { getToken } = useContext(UserContext);    

    const getAllBooks = (id) =>
        getToken().then((token) =>
        fetch(`/api/book/getByUser/${id}`, {
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
      }).then(getAllBooks(user.id))
  );

    return (
        <BookContext.Provider
          value={{
            books,
            addBook
          }}
        >
          {props.children}
        </BookContext.Provider>
      );
}