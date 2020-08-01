import React, { useContext, useEffect } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner, Progress } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const QueueBook = ({ googleBook, book }) => {

    const { removeBookFromQueue } = useContext(BookContext);

    const deleteBookFromQueue = () => {
        removeBookFromQueue(googleBook.id)
    }

    const conditionalProgress = () => {
        if (book !== undefined) {
            if (book.completionPercentage > 0) {
                return (
                    <>
                        <Progress value={book.completionPercentage}>{book.completionPercentage}% Complete</Progress>
                        <Button>Log progress</Button>
                    </>
                )
            } else {
                return (
                    <Button>Start Book</Button>
                )
            }
        } else {
            return <></>
        }
    }

    return googleBook.hasOwnProperty("volumeInfo") ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                {conditionalProgress}
                <Button color="danger" onClick={deleteBookFromQueue}>Remove from Queue</Button>
            </Card>
        </>
    ) : (
            <>
                <Spinner />
            </>
        )
}