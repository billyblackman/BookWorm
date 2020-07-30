import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { WishlistBook } from "./WishlistBook";

export default function Wishlist() {

    const { books, getWishlist } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);

    const idArrayFunction = () => {
        return books.map((book) => book.googleId)
    }

    useEffect(() => {
        getWishlist()
        .then(idArrayFunction)
        .then((bookIdArray) => getGoogleBooksByIds(bookIdArray));
    }, [books])
    
    debugger

    return googleBooks.length > 0 ? (
        <>
        <div className="bookDiv">
            {googleBooks.map((googleBook) => {
                return (
                    <WishlistBook googleBook={googleBook}/>
            )
        })}
        </div>
        </>
    ) : (
        <>Your Wishlist is Empty</>
        )
}