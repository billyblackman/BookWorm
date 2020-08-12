import React from "react";
import { Pagination, PaginationItem } from "reactstrap";

export const Paginator = ({ setStartIndex }) => {

    return (
        <>
            <Pagination>
                <PaginationItem>1</PaginationItem>
                <PaginationItem>2</PaginationItem>
                <PaginationItem>3</PaginationItem>
                <PaginationItem>4</PaginationItem>
                <PaginationItem>5</PaginationItem>
                <PaginationItem>6</PaginationItem>
                <PaginationItem>7</PaginationItem>
                <PaginationItem>8</PaginationItem>
                <PaginationItem>9</PaginationItem>
                <PaginationItem>10</PaginationItem>
            </Pagination>
        </>
    )
}