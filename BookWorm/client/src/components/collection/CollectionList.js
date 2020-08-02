import React, { useContext, useEffect, useState } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { CollectionBook } from "./CollectionBook";
import { Spinner } from "reactstrap";

export default function CollectionList() {

    const { books, getBooks } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);
    
    const matchingBooks = books.filter(book => book.purchased === true);

    const idArrayFunction = () => {
        return matchingBooks.map((book) => book.googleId)
    }

    useEffect(() => {
        getBooks()
        .then(idArrayFunction)
        .then((bookIdArray) => getGoogleBooksByIds(bookIdArray))
        .then(setBooksLoaded(true));
    }, [])
    
    return googleBooks.length > 0 && booksLoaded ? (
        <>
        <div className="bookDiv">
            {googleBooks.map((googleBook) => {
                const book = books.find(b => b.googleId === googleBook.id);
                return (
                    <CollectionBook key={book.id} book={book} googleBook={googleBook}/>
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