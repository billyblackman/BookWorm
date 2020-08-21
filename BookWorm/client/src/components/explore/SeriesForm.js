import React, { useRef, useContext, useEffect, useState } from "react";
import { Form, Button, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, Badge } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { BookContext } from "../../providers/BookProvider";
import { SeriesDeleteModal } from "./SeriesDeleteModal";

export const SeriesForm = ({ toggle }) => {

    const { addSeries, series, getSeries, seriesBooks, getSeriesBooks, deleteSeries } = useContext(SeriesContext);
    const { getSeriesGoogleBooksByIds, seriesGoogleBooks } = useContext(GoogleBookContext);
    const { addBookToQueue } = useContext(BookContext);
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

    debugger

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks.length > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.seriesId === s.id)
                return (
                    <>
                        <ListGroup key={s.id}>
                            <ListGroupItem>
                                <h5>{s.name} <Badge>{matchingBooks.length}</Badge></h5>
                                <Button color="danger" onClick={toggleDeleteSeriesModal}>Delete Series</Button>
                                {
                                    matchingBooks.length > 0 ? (

                                        <Button onClick={(click) => {
                                            click.preventDefault();
                                            addSeriesToQueue(matchingBooks);
                                            toggle()
                                        }}>Queue Series</Button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </ListGroupItem>
                        </ListGroup>
                        <Modal isOpen={deleteSeriesModal}>
                            <SeriesDeleteModal toggle={toggleDeleteSeriesModal} seriesId={s.id}/>
                        </Modal>
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
                                <Button color="danger" onClick={(click) => {
                                    click.preventDefault();
                                    deleteSeries(s.id);
                                    toggle()
                                }}>Delete Series</Button>
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