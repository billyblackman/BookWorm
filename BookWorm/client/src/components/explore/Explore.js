import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Form, FormGroup, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Collapse } from "reactstrap";
import "../../styles/book.css"
import { GoogleBook } from "./GoogleBook";
import { SeriesForm } from "./SeriesForm";

export default function Explore() {

    const { googleBooks, searchByTitle, searchByAuthor, searchByPublisher, searchByCategory } = useContext(GoogleBookContext);
    const [dropdownState, setDropdownState] = useState("Title");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [collapseState, setCollapseState] = useState(false);
    const toggleCollapse = () => setCollapseState(!collapseState);

    const [bookItems, setBooksItems] = useState([]);

    useEffect(() => {
        if (googleBooks.hasOwnProperty("items")) {
            setBooksItems(googleBooks.items)
        }
    },[googleBooks])


    
    const searchTerms = useRef();
    
    const search = () => {
        
        const currentSearchTerms = searchTerms.current.value;
        const formattedSearchTerms = currentSearchTerms.replace(/\s+/g, '+')
        
        switch (dropdownState) {

            case "Title":
                searchByTitle(formattedSearchTerms)
                break;

            case "Author":
                searchByAuthor(formattedSearchTerms)
                break;

            case "Publisher":
                searchByPublisher(formattedSearchTerms)
                break;

            case "Category":
                searchByCategory(formattedSearchTerms)
                break;
        }
    }

    

    const conditionalBookRender = () => {
        return bookItems.length > 0 ? (
            <>
            <Button onClick={toggleCollapse}>Series</Button>
            <Collapse isOpen={collapseState}>
                <SeriesForm toggle={toggleCollapse}/>
            </Collapse>

            <div className="bookDiv">
                {bookItems.map((book) => {
                    console.log(bookItems);
                    return (
                        <GoogleBook key={book.id} book={book}/>
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