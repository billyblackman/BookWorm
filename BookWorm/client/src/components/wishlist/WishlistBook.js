import React, { useContext, useState, useEffect } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider"

export const WishlistBook = ({googleBook}) => {

    const { deleteBookByGoogleId, addBookFromWishlistToCollection } = useContext(BookContext);

    const deleteBookFromWishlist = () => {
        deleteBookByGoogleId(googleBook.id)
    }

    const addToCollection = () => {
        addBookFromWishlistToCollection(googleBook.id)
    }

    debugger

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                <Button onClick={addToCollection}>Add to Collection</Button>
                <Button color="danger" onClick={deleteBookFromWishlist}>Delete from Wishlist</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}