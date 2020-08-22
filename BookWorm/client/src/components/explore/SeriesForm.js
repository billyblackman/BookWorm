import React, { useRef, useContext, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, Modal, Badge, ModalBody, Spinner, Collapse, Card } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { BookContext } from "../../providers/BookProvider";

export const SeriesForm = ({ toggle }) => {

    const { addSeries, series, getSeries, seriesBooks, getSeriesBooks, deleteSeries } = useContext(SeriesContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const { addBookToQueue, deleteBook } = useContext(BookContext);
    const [seriesBooksLoaded, setSeriesBooksLoaded] = useState(false);
    const [deleteSeriesModal, setDeleteSeriesModal] = useState(false);
    const toggleDeleteSeriesModal = () => setDeleteSeriesModal(!deleteSeriesModal);

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

    const deleteSeriesBooks = (matchingBooks, seriesId) => {
        debugger
        deleteSeries(seriesId);
        matchingBooks.map(b => deleteBook(b.bookId));
        toggleDeleteSeriesModal();

    }

    const seriesRender = () => {
        if (seriesBooksLoaded) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <>
                        <ListGroup>
                            <ListGroupItem key={s.id}>
                                <h5>{s.name} <Badge>{matchingBooks.length}</Badge></h5>
                                {
                                    matchingBooks.length > 0 ? (
                                        <>
                                            <Button color="danger" onClick={toggleDeleteSeriesModal}>Delete Series</Button>
                                            <Button onClick={(click) => {
                                                click.preventDefault();
                                                addSeriesToQueue(matchingBooks);
                                                toggle();
                                            }}>Queue Series</Button>
                                        </>
                                    ) : (
                                            <Button color="danger" onClick={(click) => {
                                                click.preventDefault();
                                                deleteSeries(s.id);
                                                toggle();
                                            }}>Delete Series</Button>
                                        )
                                }
                                <Collapse isOpen={deleteSeriesModal}>
                                    <Card>
                                        Do you want to delete the books in this series?
                                        <Button onClick={(click) => {
                                            click.preventDefault();
                                            deleteSeriesBooks(matchingBooks, s.id);
                                            toggle();
                                        }}>Yes</Button>
                                        <Button onClick={(click) => {
                                            click.preventDefault();
                                            deleteSeries(s.id);
                                            toggle();
                                        }}>No, just the series</Button>
                                        <Button onClick={toggleDeleteSeriesModal}>Cancel</Button>
                                    </Card>
                                </Collapse>
                            </ListGroupItem>
                        </ListGroup>
                    </>
                )
            })
        } else {
            return (
                <Spinner />
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