import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Button, Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import "../../styles/book.css"
import { BookContext } from "../../providers/BookProvider";
import { CollectionBook } from "./CollectionBook";

export default function CollectionList() {

    const { books, getAllBooks } = useContext(BookContext);

    useEffect(() => {
        getAllBooks();
    })
    
    return books !== [] ? (
        <>
        <div className="bookDiv">
            {books.map((book) => {
                return (
                    <CollectionBook book={book}/>
            )
        })}
        </div>
        </>
    ) : (
        <>Your Collection is Empty</>
        )
}