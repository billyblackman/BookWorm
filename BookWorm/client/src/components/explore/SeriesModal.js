import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { BookContext } from "../../providers/BookProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import "../../styles/button.css"

export const SeriesModal = ({ book, toggle }) => {

    const { series, getSeries, seriesBooks, getSeriesBooks, addSeriesBook } = useContext(SeriesContext);
    const { addBook, books, getBooks } = useContext(BookContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const [booksLoaded, setBooksLoaded] = useState(false);

    const idArrayFunction = () => {
        return seriesBooks.map((sb) => sb.book.googleId)
    }

    useEffect(() => {
        getSeriesBooks();
        getSeries();
    }, [])


    useEffect(() => {
        if (seriesBooks.length > 0) {
            let idArray = idArrayFunction();
            getSeriesGoogleBooksByIds(idArray)
                .then(() => setBooksLoaded(true))
        }
    }, [seriesBooks])


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
        if (seriesGoogleBooks.length > 0 && booksLoaded) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem key={s.id}>
                            <ListGroupItemHeading><h4>{s.name}</h4></ListGroupItemHeading>
                            {matchingBooks.map(b => {
                                const matchingGoogleBook = seriesGoogleBooks.find(sgb => sgb.id === b.book.googleId)
                                return (
                                    <ListGroupItemText><h6>{matchingGoogleBook.volumeInfo.title}</h6></ListGroupItemText>
                                )
                            })}
                            <Button color="success" onClick={(click) => {
                                click.preventDefault();
                                addCollectionBookToSeries(s.id);
                                toggle()
                            }}>
                                Collection
                                </Button>
                            <Button color="primary" onClick={(click) => {
                                click.preventDefault();
                                addWishlistBookToSeries(s.id);
                                toggle()
                            }}>
                                Wishlist
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
                            <ListGroupItem key={s.id}>
                                <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addWishlistBookToSeries(s.id);
                                    toggle()
                                }}>
                                    Add wishlist book
                                </Button>
                                <Button onClick={(click) => {
                                    click.preventDefault();
                                    addCollectionBookToSeries(s.id);
                                    toggle()
                                }}>
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
                <Button close onClick={toggle} />
                {seriesRender()}
                <Button className="redButton" onClick={toggle}>Cancel</Button>
            </ListGroup>
        </>
    )
}