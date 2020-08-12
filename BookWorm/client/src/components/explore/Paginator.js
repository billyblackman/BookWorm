import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../../styles/explore.css"

export const Paginator = ({ setStartIndex }) => {

    return (
        <>
            <Pagination className="block">
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(0)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20)}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 2)}>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 3)}>4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 4)}>5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 5)}>6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 6)}>7</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 7)}>8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 8)}>9</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20 * 9)}>10</PaginationLink>
                </PaginationItem>
            </Pagination>
        </>
    )
}