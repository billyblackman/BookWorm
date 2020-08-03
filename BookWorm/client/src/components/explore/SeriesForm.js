import React, { useRef, useContext } from "react";
import { Form, Button, FormGroup, Input } from "reactstrap";
import { SeriesContext } from "../../providers/SeriesProvider";

export const SeriesForm = (toggle) => {

    const { addSeries } = useContext(SeriesContext);

    const name = useRef("");

    const constructNewSeries = () => {
        debugger
        return addSeries({
            Name: name.current.value
        }).then(toggle)
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <Input type="text" innerRef={name} placeholder="Series Name" />
                    <Button onClick={(click) => {
                                    click.preventDefault();
                                    constructNewSeries()
                                    .then(toggle);
                                }}>
                                    Save
                    </Button>
                </FormGroup>
            </Form>
        </>
    )
}