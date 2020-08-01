import React, { useContext, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { QueueBook } from "./QueueBook";

export default function Queue() {

    const { books, getQueue, getBookByGoogleId } = useContext(BookContext);
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
                const book = books.find(b => b.googleId === googleBook.id)
                return (
                    <QueueBook key={googleBook.id} book={book} googleBook={googleBook}/>
            )
        })}
        </div>
        </>
    ) : (
        <>Your Queue is Empty</>
        )
}