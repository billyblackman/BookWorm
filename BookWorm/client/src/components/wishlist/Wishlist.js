import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { WishlistBook } from "./WishlistBook";
import { Spinner } from "reactstrap";

export default function Wishlist() {

    const { books, getBooks, getWishlist } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);

    const matchingBooks = books.filter(book => book.purchased === false);

    const idArrayFunction = () => {
        return books.map((book) => book.googleId)
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
    