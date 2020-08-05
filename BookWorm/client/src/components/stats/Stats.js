import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../../providers/BookProvider";
import { ListGroup, ListGroupItemHeading, ListGroupItem, Spinner } from "reactstrap";

export default function Stats() {

    const { books, getBooks } = useContext(BookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);

    useEffect(() => {
        getBooks()
        .then(setBooksLoaded(true));
    }, [])

    const collectionArray = books.filter(b => b.purchased === true);
    const wishlistArray = books.filter(b => b.purchased === false);
    const queueArray = books.filter(b => b.queuePosition > 0);

    const queueComplete = books.map(b => b.completionPercentage)
    const totalQueueComplete = queueComplete.reduce((a, b) => a + b, 0)
    const totalPercentage = (queueArray.length * 100);
    const completePercentage = (totalQueueComplete / totalPercentage * 100).toFixed(2);


    return booksLoaded ? (
        <>
            <ListGroup>
                <ListGroupItemHeading>Stats</ListGroupItemHeading>
                <ListGroupItem>Total Books: {books.length}</ListGroupItem>
                <ListGroupItem>Collection: {collectionArray.length}</ListGroupItem>
                <ListGroupItem>Wishlist: {wishlistArray.length}</ListGroupItem>
                <ListGroupItem>Queued: {queueArray.length}</ListGroupItem>
                <ListGroupItem>Queue Completion: {completePercentage}%</ListGroupItem>

            </ListGroup>
        </>
    ) : (
        <Spinner />
    )

}