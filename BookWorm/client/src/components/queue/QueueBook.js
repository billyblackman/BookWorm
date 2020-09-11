import React, { useContext, useState } from "react";
import { Button, Card, CardTitle, CardBody, Progress, Collapse, Badge } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { CompletionCollapse } from "./CompletionCollapse";
import "../../styles/book.css"
import "../../styles/button.css"

export const QueueBook = ({ googleBook, book, index }) => {

    const { removeBookFromQueue } = useContext(BookContext);

    const [collapseState, setCollapseState] = useState(false);
    const toggleCollapse = () => setCollapseState(!collapseState);

    const deleteBookFromQueue = () => {
        removeBookFromQueue(googleBook.id);
    }

    const conditionalProgress = () => {
        if (book !== undefined) {
            if (book.completionPercentage > 0) {
                return book.completionPercentage < 100 ? (
                    <>
                        <Progress animated onClick={toggleCollapse} className="progressBar" value={book.completionPercentage}>{book.completionPercentage}%</Progress>
                    </>
                ) : (
                    <>
                        <Button className="green" color="success" disabled>Complete &#10004;</Button>
                    </>
                )
            } else {
                return (
                    <Button className="blueHighlight" onClick={toggleCollapse}>Start Book</Button>
                )
            }
        } else {
            return <></>
        }
    }

    return googleBook.hasOwnProperty("volumeInfo") && book !== undefined ? (
        <>
            <Card className="queueBook">
                <CardBody>
                    <h5><Badge className="blue blueHighlight">#{index}</Badge></h5>
                    <h5><CardTitle>{googleBook.volumeInfo.title}</CardTitle></h5>
                </CardBody>
                {conditionalProgress()}
                <Collapse isOpen={collapseState}>
                    <CompletionCollapse toggle={toggleCollapse} book={book} googleBook={googleBook}/>
                </Collapse>
                <Button className="redButton" onClick={deleteBookFromQueue}>Remove from Queue</Button>
            </Card>
        </>
    ) : (
            <>
            </>
        )
}