import React, { useContext, useRef, useState } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Button, Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import "../../styles/book.css"
import { GoogleBook } from "./GoogleBook";

export default function Explore() {

    const { googleBooks, searchByTitle } = useContext(GoogleBookContext);

    const title = useRef();

    const search = () => {
        searchByTitle(title.current.value);
    }

    const bookItems = googleBooks.items;

    const conditionalBookRender = () => {
        return bookItems !== undefined ? (
            <>
            <div className="bookDiv">
                {bookItems.map((book) => {
                    return (
                        <GoogleBook book={book}/>
                )
            })}
            </div>
            </>
        ) : (
            <></>
            )
            
    }
    
    return (
        <>
            <Form>
                <FormGroup>
                    <Label>Search by Title</Label>
                    <input type="text" name="title" ref={title}></input>
                </FormGroup>
                <Button onClick={search}>Search</Button>
            </Form>
            {conditionalBookRender()}
        </>
    );
}