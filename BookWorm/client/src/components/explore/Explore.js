import React, { useContext, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function Explore() {

    const { googleBooks, searchByTitle } = useContext(GoogleBookContext);

    return (
        <>
            <Form>
                <FormGroup>
                    <Label>Search by Title</Label>
                    <Input type="text"></Input>
                </FormGroup>
                <Button>Search</Button>
            </Form>
        </>
    );
}