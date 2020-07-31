import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { CollectionBook } from "./CollectionBook";

export default function CollectionList() {

    const { books, getCollection } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    
    const idArrayFunction = () => {
        return books.map((book) => book.googleId)
    }

    useEffect(() => {
        getCollection()
        .then(idArrayFunction)
        .then((bookIdArray) => getGoogleBooksByIds(bookIdArray));
    }, [])
    
    return googleBooks !== [] ? (
        <>
        <div className="bookDiv">
            {googleBooks.map((googleBook) => {
                return (
                    <CollectionBook googleBook={googleBook}/>
            )
        })}
        </div>
        </>
    ) : (
        <>Your Collection is Empty</>
        )
}