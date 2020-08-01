import React, { useContext, useState } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Spinner, Progress, Collapse } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { CompletionCollapse } from "./CompletionCollapse";

export const QueueBook = ({ googleBook, book }) => {

    const { removeBookFromQueue } = useContext(BookContext);

    const [collapseState, setCollapseState] = useState(false);
    const toggleCollapse = () => setCollapseState(!collapseState);

    const deleteBookFromQueue = () => {
        removeBookFromQueue(googleBook.id)
    }

    const conditionalProgress = () => {
        if (book !== undefined) {
            if (book.completionPercentage > 0) {
                return (
                    <>
                        <Progress value={book.completionPercentage}>{book.completionPercentage}% Complete</Progress>
                        <Button onClick={toggleCollapse}>Log progress</Button>
                    </>
                )
            } else {
                return (
                    <Button onClick={toggleCollapse}>Start Book</Button>
                )
            }
        } else {
            return <></>
        }
    }

    return googleBook.hasOwnProperty("volumeInfo") && book !== undefined ? (
        <>
            <Card className="googleBook">
                <CardImg src={googleBook.volumeInfo.imageLinks.thumbnail} />
                <CardBody>
                    <CardTitle>{googleBook.volumeInfo.title}</CardTitle>
                    <CardSubtitle>{googleBook.volumeInfo.subtitle}</CardSubtitle>
                </CardBody>
                {conditionalProgress()}
                <Collapse isOpen={collapseState}>
                    <CompletionCollapse toggle={toggleCollapse} book={book} googleBook={googleBook}/>
                </Collapse>
                <Button color="danger" onClick={deleteBookFromQueue}>Remove from Queue</Button>
            </Card>
        </>
    ) : (
            <>
            </>
        )
}