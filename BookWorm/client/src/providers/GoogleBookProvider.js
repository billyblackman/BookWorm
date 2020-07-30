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

//GoogleBookIdArray starts as array of promises, when promises resolve, becomes array of google books and is set into state

    const getGoogleBooksByIds = (googleBookIdArray) => {

      Promise.all(googleBookIdArray.map((id) => {
        return fetch(`${apiUrl}/${id}`)
        .then((response) => {
          return response.json()
        })
      }))
      .then((bookArray) => setGoogleBooks(bookArray));
    }

    return (
        <GoogleBookContext.Provider
          value={{
            searchByTitle,
            googleBook,
            googleBooks,
            getGoogleBookById,
            getGoogleBooksByIds
          }}
        >
          {props.children}
        </GoogleBookContext.Provider>
      );
}