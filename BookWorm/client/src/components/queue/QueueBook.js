import React, { useContext, useState } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Progress, Collapse, Badge } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { CompletionCollapse } from "./CompletionCollapse";
import "../../styles/book.css"
import "../../styles/button.css"

export const QueueBook = ({ googleBook, book, books, index }) => {

    const { removeBookFromQueue } = useContext(BookContext);

    const [collapseState, setCollapseState] = useState(false);
    const toggleCollapse = () => setCollapseState(!collapseState);

    const deleteBookFromQueue = () => {
        removeBookFromQueue(googleBook.id);
    }

    const conditionalProgress = () => {
        if (book !== undefined) {
            if (book.completionPercentage > 0) {
                return (
                    <>
                        <Progress onClick={toggleCollapse} className="progressBar" value={book.completionPercentage}>{book.completionPercentage}%</Progress>
                        
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
            <Card className="queueBook">
                <CardBody>
                    <h5><Badge color="primary">#{index}</Badge></h5>
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