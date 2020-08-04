import React, { useRef, useContext, useEffect } from "react";
import { Form, Button, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesForm = ({toggle}) => {

    const { addSeries, series, getSeries, seriesBooks, getSeriesBooks } = useContext(SeriesContext);

    useEffect(() => {
        getSeriesBooks();
        getSeries();
    }, [])

    debugger

    const name = useRef("");

    const constructNewSeries = () => {
        return addSeries({
            Name: name.current.value
        }).then(toggle)
    }

    const seriesRender = () => {
        if (series.length > 0 && seriesBooks > 0) {
            return series.map(s => {
                const matchingBooks = seriesBooks.filter(sb => sb.series.id === s.id)
                return (
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{s.name}</ListGroupItemHeading>
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