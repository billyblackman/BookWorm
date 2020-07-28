import React, { useState, useEffect, createContext } from "react";

export const GoogleBookContext = createContext();

export const GoogleBookProvider = (props) => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes?q="
    const apiKey = "AIzaSyBNMegrLmhBQj2J5ASYQxUEKKGYRmtyMhg"

    const [googleBooks, setGoogleBooks] = useState([]);

    const searchByTitle = (searchTerms) => {
        return fetch(`${apiUrl}${searchTerms}`)
            .then((response) => response.json())
            .then(setGoogleBooks)
            .then(console.log(googleBooks));

    }

    return (
        <GoogleBookContext.Provider
          value={{
            searchByTitle,
            googleBooks
          }}
        >
          {props.children}
        </GoogleBookContext.Provider>
      );
}