import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Button, Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { CollectionBook } from "./CollectionBook";

export default function CollectionList() {

    const { books, getAllBooks } = useContext(BookContext);
    const { getGoogleBooksByIds, googleBooks } = useContext(GoogleBookContext);



    const idArrayFunction = () => {
        return books.map((book) => book.googleId)
    }
    
    
    useEffect(() => {
        debugger
        getAllBooks()
        .then(idArrayFunction)
        .then((bookIdArray) => getGoogleBooksByIds(bookIdArray));
        debugger
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