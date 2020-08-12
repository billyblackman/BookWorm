import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const Paginator = ({ setStartIndex }) => {

    return (
        <>
            <Pagination>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(0)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => setStartIndex(20)}>2</PaginationLink>
                </PaginationItem>
            </Pagination>
        </>
    )
}