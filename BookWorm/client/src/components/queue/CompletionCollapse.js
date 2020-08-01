import React from "react";
import { Form } from "reactstrap";

export const CompletionCollapse = ({ googleBook,book }) => {

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="completionPercentage">Current page</Label>
                    <Input type="number" placeholder="with a placeholder" />
                </FormGroup>
            </Form>
        </>
    )
}