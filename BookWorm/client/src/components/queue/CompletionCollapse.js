import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";

export const CompletionCollapse = ({ googleBook, book, toggle }) => {

    const { editBook } = useContext(BookContext);
    const [updatedBook, setBook] = useState(book);

    const currentPage = Math.ceil((book.completionPercentage / 100) * googleBook.volumeInfo.pageCount);



    const placeHolder = () => {
        return `${currentPage}/${googleBook.volumeInfo.pageCount}`
    }

    const handleControlledInputChange = (event) => {
        const newBook = Object.assign({}, updatedBook);
        newBook.completionPercentage = Math.floor((parseInt(event.target.value) / googleBook.volumeInfo.pageCount) * 100);

        if (book.startDate = "0001-01-01T00:00:00") {
            newBook.startDate = new Date().toLocaleString();
        }
        
        setBook(newBook);
        debugger
    };

    const editBookOnClick = () => {
        editBook(updatedBook)
            .then(toggle);
        debugger
    }


    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="completionPercentage">Current page</Label>
                    <Input type="number" defaultValue={currentPage} placeholder={placeHolder()} onChange={handleControlledInputChange} />
                </FormGroup>
                <Button onClick={(e) => {
                    e.preventDefault();
                    editBookOnClick();
                }}>Save Progress</Button>
            </Form>
        </>
    )
}