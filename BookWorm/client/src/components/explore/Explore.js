import React, { useContext, useRef, useState } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Label, Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import "../../styles/book.css"
import { GoogleBook } from "./GoogleBook";

export default function Explore() {

    const { googleBooks, searchByTitle, searchByAuthor, searchByPublisher, searchByCategory } = useContext(GoogleBookContext);
    const [dropdownState, setDropdownState] = useState("Title");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const searchTerms = useRef();

    const search = () => {
        switch (dropdownState) {

            case "Title":
                searchByTitle(searchTerms.current.value)
                break;

            case "Author":
                searchByAuthor(searchTerms.current.value)
                break;

            case "Publisher":
                searchByPublisher(searchTerms.current.value)
                break;

            case "Category":
                searchByCategory(searchTerms.current.value)
                break;
        }
    }

    const bookItems = googleBooks.items;

    const conditionalBookRender = () => {
        return bookItems !== undefined ? (
            <>
            <div className="bookDiv">
                {bookItems.map((book) => {
                    return (
                        <GoogleBook book={book}/>
                )
            })}
            </div>
            </>
        ) : (
            <></>
            )
            
    }
    
    return (
        <>
            <Form>
                <FormGroup>
                        <Dropdown toggle={toggle} isOpen={dropdownOpen}>
                            <DropdownToggle caret>
                                Search by {dropdownState}
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem onClick={(click) => {
                                    click.preventDefault();
                                    setDropdownState("Title");
                                }}>
                                    Title
                                </DropdownItem>
                                <DropdownItem onClick={(click) => {
                                    click.preventDefault();
                                    setDropdownState("Author");
                                }}>
                                    Author
                                </DropdownItem>
                                <DropdownItem onClick={(click) => {
                                    click.preventDefault();
                                    setDropdownState("Publisher");
                                }}>
                                    Publisher
                                </DropdownItem>
                                <DropdownItem onClick={(click) => {
                                    click.preventDefault();
                                    setDropdownState("Category");
                                }}>
                                    Category
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    <input type="text" name="title" ref={searchTerms}></input>
                </FormGroup>
                <Button color="primary" onClick={search}>Go</Button>
            </Form>
            {conditionalBookRender()}
        </>
    );
}