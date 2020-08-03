import React, { useContext, useState } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Modal } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { SeriesModal } from "./SeriesModal";

export const GoogleBook = ({book}) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const { addBook } = useContext(BookContext);

    const addBookToCollection = () => {
        addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: true,
            CompletionPercentage: 0
        })
    }

    const addBookToWishlist = () => {
        addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: false,
            CompletionPercentage: 0
        })
    }

    return (
        <Card className="googleBook">
            <CardImg src={book.volumeInfo.imageLinks.thumbnail} />
            <CardBody>
                <CardTitle>{book.volumeInfo.title}</CardTitle>
                <CardSubtitle>{book.volumeInfo.subtitle}</CardSubtitle>
            </CardBody>
            <Button color="success" onClick={addBookToCollection}>Save to Collection</Button>
            <Button color="primary" onClick={addBookToWishlist}>Add to Wishlist</Button>
            <Button color="primary" onClick={toggleModal}>Series</Button>
            <Modal isOpen={modal}>
                <SeriesModal toggle={toggleModal}/>
            </Modal>
        </Card>
    )
}