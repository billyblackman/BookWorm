import React, { useContext, useRef, useState, useEffect } from "react";
import { GoogleBookContext } from "../../providers/GoogleBookProvider";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Collapse, InputGroup, InputGroupAddon, InputGroupButtonDropdown } from "reactstrap";
import "../../styles/book.css"
import "../../styles/explore.css"
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
    }, [googleBooks])



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

    //Clears the background from the search bar on click

    function backgroundClear() {
        searchTerms.current.classList.add("searchInputClicked");
    }

    const conditionalBookRender = () => {
        return bookItems.length > 0 ? (
            <>


                <div className="bookDiv">
                    {bookItems.map((book) => {
                        return (
                            <GoogleBook key={book.id} book={book} />
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
            <br />
            <InputGroup id="searchFormGroup">
                <InputGroupButtonDropdown addonType="prepend" toggle={toggle} isOpen={dropdownOpen}>
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
                </InputGroupButtonDropdown>
                <input className="searchInput" type="text" name="title" ref={searchTerms} onClick={backgroundClear}></input>
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={search}>Go</Button>
                </InputGroupAddon>
            <Button id="seriesButton" onClick={toggleCollapse}>Series</Button>
            </InputGroup>
            <Collapse isOpen={collapseState}>
                <SeriesForm toggle={toggleCollapse} />
            </Collapse>
            {conditionalBookRender()}
        </>
    );
}