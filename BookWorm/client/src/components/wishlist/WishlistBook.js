import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const WishlistBook = ({googleBook, book}) => {

    const { deleteBook, addBookFromWishlistToCollection } = useContext(BookContext);

    const deleteBookFromWishlist = () => {
        deleteBook(book.id);
    }

    const addToCollection = () => {
        addBookFromWishlistToCollection(googleBook.id)
    }

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="wishlistBook">
                <CardBody>
                    <h5><CardTitle>{googleBook.volumeInfo.title}</CardTitle></h5>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                <Button onClick={addToCollection}>Add to Collection</Button>
                <Button color="danger" onClick={deleteBookFromWishlist}>Delete</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}