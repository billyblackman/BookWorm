import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { BookContext } from "../../providers/BookProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";

export const SeriesModal = ({book, toggle}) => {

    const { series, getSeries, seriesBooks, getSeriesBooks, addSeriesBook } = useContext(SeriesContext);
    const { addBook, books, getBooks } = useContext(BookContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);

    const idArrayFunction = (seriesBooks) => {
        return seriesBooks.map((sb) => sb.book.googleId)
    }

    useEffect(() => {
        getSeriesBooks()
        .then(idArrayFunction)
        .then((bookIdArray) => getSeriesGoogleBooksByIds(bookIdArray))
        .then(setBooksLoaded(true));
    }, [])

    useEffect(() => {
        getSeries();
    }, [])

    const addWishlistBookFunction = () => {
        return addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: false,
            CompletionPercentage: 0
        });
    }

    const addCollectionBookFunction = () => {
        return addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: true,
            CompletionPercentage: 0
        });
    }

    const addBookToSeriesFunction = (seriesId, bookId) => {
        addSeriesBook({
            seriesId: seriesId,
            bookId: bookId
        })
    }
    
    const addWishlistBookToSeries = (seriesId) => {
        addWishlistBookFunction()
        .then((book) => addBookToSeriesFunction(seriesId, book.id))
    }

    const addCollectionBookToSeries = (seriesId) => {
        addCollectionBookFunction()
        .then((book) => addBookToSeriesFunction(seriesId, book.id))
    }

    const seriesRender = () => {
        if (seriesGoogleBooks.length > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                                {matchingBooks.map(b => {
                                    debugger
                                    const matchingGoogleBook = seriesGoogleBooks.find(sgb => sgb.id === b.book.googleId)
                                    console.log(matchingBooks);
                                    return (
                                        <ListGroupItemText>{matchingGoogleBook.volumeInfo.title}</ListGroupItemText>
                                    )
                                })}
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addWishlistBookToSeries(s.id);
                                    toggle()}}>
                                        Add wishlist book
                                </Button>
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addCollectionBookToSeries(s.id);
                                    toggle()}}>
                                        Add collection book
                                </Button>
                        </ListGroupItem>
                        
                    </ListGroup>
                )
            })
        } else {
            return (
                <ListGroup>
                    {series.map(s => {
                        return (
                            <ListGroupItem>
                                <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addWishlistBookToSeries(s.id);
                                    toggle()}}>
                                        Add wishlist book
                                </Button>
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addCollectionBookToSeries(s.id);
                                    toggle()}}>
                                        Add collection book
                                </Button>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            )
        }
    }

    return (
        <>
            <ListGroup>
                {seriesRender()}
                <Button color="danger" onClick={toggle}>Cancel</Button>
            </ListGroup>
        </>
    )
}