import React, { useRef, useContext, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { BookContext } from "../../providers/BookProvider";

export const SeriesForm = ({ toggle }) => {

    const { addSeries, series, getSeries, seriesBooks, getSeriesBooks } = useContext(SeriesContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const { addBookToQueue } = useContext(BookContext);
    const [seriesBooksLoaded, setSeriesBooksLoaded] = useState(false);

    const idArrayFunction = () => {
        return seriesBooks.map((sb) => sb.book.googleId)
    }

    useEffect(() => {
            getSeriesBooks()
            .then(idArrayFunction)
            .then((bookIdArray) => getSeriesGoogleBooksByIds(bookIdArray))
            .then(setSeriesBooksLoaded(true));
    }, [])

    useEffect(() => {
        getSeries();
    }, [])

    const name = useRef("");

    const constructNewSeries = () => {
        addSeries({
            Name: name.current.value
        });
        toggle();
    }

    const addSeriesToQueue = (matchingBooks) => {
        matchingBooks.map(seriesBook => {
            addBookToQueue(seriesBook.book.googleId)
        });
    }

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks.length > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <>
                        <ListGroup>
                            <ListGroupItem>
                                {s.name}
                            </ListGroupItem>
                        </ListGroup>
                        <Button onClick={(click) => {
                                    click.preventDefault();
                                    addSeriesToQueue(matchingBooks);
                                    toggle()}}>Add Series to Queue</Button>
                    </>
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
            <Form>
                <FormGroup>
                    <Input type="text" innerRef={name} placeholder="New Series" />
                    <Button onClick={(click) => {
                        click.preventDefault();
                        constructNewSeries()
                    }}>
                        Save
                    </Button>
                </FormGroup>
            </Form>
            {seriesRender()}
        </>
    )
}