import React, { useContext, useRef, useState } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Button, Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import "../../styles/book.css"

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
                        <Card className="googleBook">
                            <CardImg src={book.volumeInfo.imageLinks.thumbnail} />
                            <CardBody>
                                <CardTitle>{book.volumeInfo.title}</CardTitle>
                                <CardSubtitle>{book.volumeInfo.subtitle}</CardSubtitle>
                            </CardBody>
                            <Button color="success">Save to Collection</Button>
                            <Button color="primary">Save to Wishlist</Button>
                        </Card>
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