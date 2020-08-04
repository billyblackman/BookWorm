import React, { useRef, useContext, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";

export const SeriesForm = ({toggle}) => {

    const { addSeries, series, getSeries, seriesBooks, getSeriesBooks } = useContext(SeriesContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const [seriesBooksLoaded, setSeriesBooksLoaded] = useState(false);

    const idArrayFunction = () => {
        return seriesBooks.map((sb) => sb.book.googleId)
    }

    useEffect(() => {
        getSeries()
        .then(getSeriesBooks)
        .then(idArrayFunction)
        .then((bookIdArray) => getSeriesGoogleBooksByIds(bookIdArray))
        .then(setSeriesBooksLoaded(true));
    }, [])

    const name = useRef("");

    const constructNewSeries = () => {
        return addSeries({
            Name: name.current.value
        }).then(toggle)
    }

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks.length > 0 && seriesGoogleBooks.length > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
                            {matchingBooks.map(b => {
                                const matchingGoogleBook = seriesGoogleBooks.find(sgb => sgb.id === b.book.googleId)
                                return (
                                    <ListGroupItemText>{matchingGoogleBook.title}</ListGroupItemText>
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