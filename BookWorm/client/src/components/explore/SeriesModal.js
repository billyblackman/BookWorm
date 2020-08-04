import React, { useContext, useEffect } from "react";
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesModal = ({book, toggle}) => {

    const { series, getSeries, seriesBooks, getSeriesBooks, addSeriesBook } = useContext(SeriesContext);

    useEffect(() => {
        getSeriesBooks();
        getSeries();
    }, [])

    debugger

    const addBookToSeries = (seriesId) => {
        addSeriesBook({
            seriesId: seriesId,
            bookId: book.id
        })
    }

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.series.id === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                            <Button onClick={addBookToSeries(s.id)}>Add</Button>
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
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            )
        }
    }

    return (
        <>
            <Button>Create Series</Button>
            <ListGroup>
                {seriesRender()}
            </ListGroup>
        </>
    )
}