import React, { useContext } from "react";
import { Form, Button } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesDeleteModal = ({ seriesId, toggle }) => {

    const { deleteSeries } = useContext(SeriesContext);

    return (
        <>
            <Form>
                Do you want to delete the books in this series?
                <Button>Yes</Button>
                <Button onClick={(click) => {
                        click.preventDefault();
                        deleteSeries(seriesId);
                        toggle();
                    }}>No, just the series</Button>
                <Button onClick={toggle}>Cancel</Button>
            </Form>
        </>
    )
}