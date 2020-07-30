import React, { useContext, useState, useEffect } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider"

export const CollectionBook = ({googleBook}) => {


    // useEffect(() => {
    //     getGoogleBookById(book.googleId)
    // }, [])

    debugger

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                <Button>Add to Queue</Button>
                <Button color="danger">Delete from Collection</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}