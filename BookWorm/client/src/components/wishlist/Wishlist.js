import React, { useContext, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { WishlistBook } from "./WishlistBook";
import { Spinner } from "reactstrap";

export default function Wishlist() {

    const { books, getBooks } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);

    
    const idArrayFunction = () => {
        const matchingBooks = books.filter(book => book.purchased === false);
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
                    const book = books.find(b => b.googleId === googleBook.id && b.purchased === false) || {}
                    return (
                        <WishlistBook key={book.id} book={book} googleBook={googleBook}/>
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
    