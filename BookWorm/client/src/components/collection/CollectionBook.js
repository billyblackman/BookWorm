import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner, Popover, Media, Modal } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import "../../styles/book.css"
import "../../styles/button.css"

export const CollectionBook = ({ googleBook, book }) => {

    const { deleteBook, addBookToQueue } = useContext(BookContext);

    const deleteBookFromCollection = () => {
        deleteBook(book.id);
    }

    const addToQueue = () => {
        addBookToQueue(googleBook.id)
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
                {
                    book.queuePosition > 0 ? (
                        <Button disabled color="success">Queued</Button>
                    ) : (
                            <Button onClick={addToQueue}>Add to Queue</Button>
                        )
                }
                <Button className="redButton" onClick={deleteBookFromCollection}>Delete</Button>
            </Card>
        </>
    ) : (
            <>
                <Spinner />
            </>
        )
}