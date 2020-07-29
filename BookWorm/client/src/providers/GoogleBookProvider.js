import React, { useState, useEffect, createContext } from "react";

export const GoogleBookContext = createContext();

export const GoogleBookProvider = (props) => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes"
    const apiKey = "AIzaSyBNMegrLmhBQj2J5ASYQxUEKKGYRmtyMhg"

    const [googleBooks, setGoogleBooks] = useState([]);
    const [googleBook, setGoogleBook] = useState({volumeInfo: {imageLinks: {}}});

    const searchByTitle = (searchTerms) => {
        return fetch(`${apiUrl}?q=${searchTerms}&maxResults=40`)
            .then((response) => response.json())
            .then(setGoogleBooks);
    }

    const getGoogleBookById = (googleBookId) => {
      return fetch(`${apiUrl}/${googleBookId}`)
            .then((response) => response.json())
            .then(setGoogleBook);
    }

    return (
        <GoogleBookContext.Provider
          value={{
            searchByTitle,
            googleBook,
            googleBooks,
            getGoogleBookById
          }}
        >
          {props.children}
        </GoogleBookContext.Provider>
      );
}