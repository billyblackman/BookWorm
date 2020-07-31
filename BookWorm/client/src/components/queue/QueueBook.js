import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const QueueBook = ({googleBook}) => {

    const { removeBookFromQueue } = useContext(BookContext);

    const deleteBookFromQueue = () => {
        removeBookFromQueue(googleBook.id)
    }

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                <Button color="danger" onClick={deleteBookFromQueue}>Remove from Queue</Button>
            </Card>
        </>
    ) : (
        <>
            <Spinner />
        </>
    )
}