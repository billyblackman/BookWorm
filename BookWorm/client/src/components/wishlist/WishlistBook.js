import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import "../../styles/button.css"

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
            <Card className="googleBook book">
            <CardBody>
                    <div className="media">
                        <img src={googleBook.volumeInfo.imageLinks.thumbnail} alt="Google book image" />
                        <div className="media-body">
                            <h5><CardTitle>{googleBook.volumeInfo.title}</CardTitle></h5>
                            <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                        </div>
                    </div>
                </CardBody>
                <Button onClick={addToCollection}>Add to Collection</Button>
                <Button className="redButton" onClick={deleteBookFromWishlist}>Delete</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}