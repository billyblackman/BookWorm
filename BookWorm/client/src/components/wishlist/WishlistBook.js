import React, { useContext, useState } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const WishlistBook = ({googleBook}) => {

    const { deleteBookByGoogleId, addBookFromWishlistToCollection } = useContext(BookContext);
    const [componentState, setComponentState] = useState(false);
    const update = () => setComponentState(!componentState);

    const deleteBookFromWishlist = () => {
        deleteBookByGoogleId(googleBook.id);
        update();
    }

    const addToCollection = () => {
        addBookFromWishlistToCollection(googleBook.id)
    }

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