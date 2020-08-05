import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const CollectionBook = ({googleBook}) => {

    const { deleteBookByGoogleId, addBookToQueue } = useContext(BookContext);

    const deleteBookFromCollection = () => {
        deleteBookByGoogleId(googleBook.id)
    }

    const addToQueue = () => {
        addBookToQueue(googleBook.id)
    }

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                <Button onClick={addToQueue}>Add to Queue</Button>
                <Button color="danger" onClick={deleteBookFromCollection}>Delete</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}