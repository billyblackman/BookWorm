import React, { useContext } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const GoogleBook = ({book}) => {

    const { addBook } = useContext(BookContext);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const addBookToCollection = () => {
        addBook({
            GoogleId: book.id,
            UserId: user.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: true,
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
            <Button color="primary">Add to Wishlist</Button>
        </Card>
    )
}