import React, { useContext, useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesModal = () => {

    const { series, getSeries } = useContext(SeriesContext);

    useEffect(() => {
        getSeries();
    })

    return (
        <>
            <Button>Create Series</Button>
            <ListGroup>
                {series.map((s) => {
                    return (
                        <ListGroupItem key={s.id}>{s.name}</ListGroupItem>
                    )
                })}
            </ListGroup>
        </>
    )
}