import React, { useState, useEffect, createContext } from "react";

export const GoogleBookContext = createContext();

export const GoogleBookProvider = (props) => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes?q="

    const [googleBooks, setGoogleBooks] = useState([]);

    const searchByTitle = (searchTerms) => {
        return fetch(`${apiUrl}${searchTerms}`)
            .then(setGoogleBooks)
            .then(console.log(googleBooks));

    }
}