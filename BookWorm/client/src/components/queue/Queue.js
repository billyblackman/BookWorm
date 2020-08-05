import React, { useContext, useEffect, useState } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { QueueBook } from "./QueueBook";
import { Spinner } from "reactstrap";

export default function Queue() {

    const { books, getBooks } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);



    const idArrayFunction = () => {
        const matchingBooks = books.filter(book => book.queuePosition > 0).sort((a, b) => (a.queuePosition > b.queuePosition) ? 1 : -1);
        return matchingBooks.map((book) => book.googleId)
    }

    useEffect(() => {
        getBooks()
            
    }, [])

    useEffect(() => {
        if (books.length > 0) {
            let idArray = idArrayFunction();
            getGoogleBooksByIds(idArray)
            .then(() => setBooksLoaded(true))
        }
    }, [books])

    return googleBooks.length > 0 && booksLoaded ? (
        <>
            <div className="bookDiv">
                {googleBooks.map((googleBook) => {
                    const book = books.find(b => b.googleId === googleBook.id) || {}
                    return (
                        <QueueBook key={book.id} books={books} book={book} googleBook={googleBook} />
                    )
                })}
            </div>
        </>
    ) : (
            <>
                <Spinner />
            </>
        )
}