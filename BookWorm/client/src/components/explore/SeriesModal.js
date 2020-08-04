import React, { useContext, useEffect } from "react";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { BookContext } from "../../providers/BookProvider";

export const SeriesModal = ({book, toggle}) => {

    const { series, getSeries, seriesBooks, getSeriesBooks, addSeriesBook } = useContext(SeriesContext);
    const { addBook, books, getBooks } = useContext(BookContext);

    useEffect(() => {
        getSeriesBooks();
        getSeries();
        getBooks()
    }, [])

    const addBookFunction = () => {
        return addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: false,
            CompletionPercentage: 0
        });
    }

    const addBookToSeriesFunction = (seriesId, bookId) => {
        addSeriesBook({
            seriesId: seriesId,
            bookId: bookId
        })
    }
    
    const addBookToSeries = (seriesId) => {
        addBookFunction()
        .then((book) => addBookToSeriesFunction(seriesId, book.id))
    }

    //what is going on

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks.length > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.series.id === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                            <Button onClick={(click) => {
                                    click.preventDefault();
                                    addBookToSeries(s.id)}}>
                                        Add
                            </Button>
                            {matchingBooks.map(b => {
                                return (
                                    <ListGroupItemText>{b.book.title}</ListGroupItemText>
                                )
                            })}
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
                                    addBookToSeries(s.id);
                                    toggle()}}>
                                        Add
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
            </ListGroup>
        </>
    )
}