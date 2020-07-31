import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { QueueBook } from "./QueueBook";

export default function Queue() {

    const { books, getQueue } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    
    const idArrayFunction = () => {
        return books.map((book) => book.googleId)
    }

    useEffect(() => {
        getQueue()
        .then(idArrayFunction)
        .then((bookIdArray) => getGoogleBooksByIds(bookIdArray));
    }, [])
    
    return googleBooks.length > 0 ? (
        <>
        <div className="bookDiv">
            {googleBooks.map((googleBook) => {
                return (
                    <QueueBook googleBook={googleBook}/>
            )
        })}
        </div>
        </>
    ) : (
        <>Your Collection is Empty</>
        )
}