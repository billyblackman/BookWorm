import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner, Popover, Media, Modal } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const CollectionBook = ({googleBook, book}) => {

    const { deleteBook, addBookToQueue } = useContext(BookContext);

    const deleteBookFromCollection = () => {
        deleteBook(book.id);
    }

    const addToQueue = () => {
        addBookToQueue(googleBook.id)
    }

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardBody>
                    <h5><CardTitle>{googleBook.volumeInfo.title}</CardTitle></h5>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                {
                    book.queuePosition > 0 ? (
                        <Button disabled color="success">Queued</Button>
                    ) : (
                        <Button onClick={addToQueue}>Add to Queue</Button>
                    )
                }
                <Button color="danger" onClick={deleteBookFromCollection}>Delete</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}