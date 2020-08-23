import React, { useContext, useState } from "react";
import { Button, Card, CardImg, CardTitle, CardSubtitle, CardBody, Modal, Popover, UncontrolledPopover, PopoverBody, ModalBody, Row, Col, ButtonGroup, Collapse, UncontrolledCollapse } from "reactstrap";
import { BookContext } from "../../providers/BookProvider";
import { SeriesModal } from "./SeriesModal";
import "../../styles/book.css"

export const GoogleBook = ({ book }) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [detailsModal, setDetailsModal] = useState(false);
    const toggleDetailsModal = () => setDetailsModal(!detailsModal);

    const [descriptionPopover, setDescriptionPopover] = useState(false);
    const togglePopover = () => setDescriptionPopover(!descriptionPopover);

    const { addBook } = useContext(BookContext);

    const addBookToCollection = () => {
        addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: true,
            CompletionPercentage: 0
        })
    }

    const addBookToWishlist = () => {
        addBook({
            GoogleId: book.id,
            ImageLink: book.volumeInfo.imageLinks.thumbnail,
            Purchased: false,
            CompletionPercentage: 0
        })
    }

    return (
        <Card className="googleBook">
            <CardBody className="bookBody">
                <div className="media">
                    {
                        book.volumeInfo.hasOwnProperty("imageLinks") ?
                            (
                                <img src={book.volumeInfo.imageLinks.thumbnail} />
                            ) : (
                                <></>
                            )
                    }
                    <div className="media-body">
                        <h5><CardTitle>{book.volumeInfo.title}</CardTitle></h5>
                    </div>
                </div>

            </CardBody>
            <Button outline className="detailsButton" onClick={toggleDetailsModal}>
                <image src="https://www.google.com/intl/en/googlebooks/images/gbs_preview_sticker1.png"></image>
                Details
            </Button>
            <Modal isOpen={detailsModal}>
                <Button close outline onClick={toggleDetailsModal}></Button>
                <ModalBody className="detailsModal">
                    {
                        book.volumeInfo.hasOwnProperty("imageLinks") ?
                            (
                                <>
                                    <div>
                                        <CardImg src={book.volumeInfo.imageLinks.thumbnail} />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                    }
                    <div className="detailsDetails">
                        <CardTitle>
                            <h5>{book.volumeInfo.title} </h5>
                        </CardTitle>
                        <CardSubtitle>
                            <h6>{book.volumeInfo.subtitle}</h6>
                        </CardSubtitle>
                        {
                            book.volumeInfo.hasOwnProperty("authors") ?
                                (
                                    <CardSubtitle>Author: {book.volumeInfo.authors[0]}</CardSubtitle>
                                ) : (
                                    <></>
                                )
                        }
                        {
                            book.volumeInfo.hasOwnProperty("publishedDate") ?
                                (
                                    <CardSubtitle>{(book.volumeInfo.publishedDate).slice(0, 4)} {book.volumeInfo.publisher}</CardSubtitle>
                                ) : (
                                    <></>
                                )
                        }
                        <CardSubtitle>{book.volumeInfo.pageCount} pages</CardSubtitle>
                        {
                            book.volumeInfo.hasOwnProperty("description") ?
                                (
                                    <>
                                        <Button id="Popover1" color="link">Description</Button>
                                        <Popover placement="left" isOpen={descriptionPopover} target="Popover1" toggle={togglePopover}>
                                            <PopoverBody>
                                                <div>{book.volumeInfo.description}</div>
                                            </PopoverBody>
                                        </Popover>

                                    </>
                                ) : (
                                    <></>
                                )
                        }
                    </div>
                </ModalBody>
            </Modal>
            <ButtonGroup>
                <Button className="columnButton" color="success" onClick={addBookToCollection}>Collection</Button>
                <Button className="columnButton" color="primary" onClick={addBookToWishlist}>Wishlist</Button>
                <Button className="columnButton" color="secondary" onClick={toggleModal}>Series</Button>
            </ButtonGroup>

            <Modal isOpen={modal}>
                <SeriesModal book={book} toggle={toggleModal} />
            </Modal>
        </Card>
    )
}