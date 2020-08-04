import React, { useContext, useEffect } from "react";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesModal = ({book, toggle}) => {

    const { series, getSeries, seriesBooks, getSeriesBooks, addSeriesBook } = useContext(SeriesContext);

    useEffect(() => {
        getSeriesBooks();
        getSeries();
        
    }, [])

    
    const addBookToSeries = (seriesId) => {
        debugger
        addSeriesBook({
            seriesId: seriesId,
            bookId: book.id
        })
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
                                    addBookToSeries(s.id)}}>
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