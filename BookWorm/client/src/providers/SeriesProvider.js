import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";

export const SeriesContext = createContext();

export const SeriesProvider = (props) => {

    const [series, setSeries] = useState([]);
    const [seriesBooks, setSeriesBooks] = useState([]);

    const { getToken } = useContext(UserContext);

    const getSeries = () =>
        getToken().then((token) =>
            fetch(`/api/series`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setSeries)
        );

    const getSeriesBooks = () =>
        getToken().then((token) =>
            fetch(`/api/seriesBook`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setSeriesBooks)
        );

    const addSeries = (series) =>
        getToken().then((token) =>
            fetch("/api/series", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(series),
            }).then(getSeries)
        );

    const addSeriesBook = (seriesBook) =>
        getToken().then((token) =>
            fetch("/api/seriesBook", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(seriesBook),
            }).then(getSeriesBooks)
        );

    return (
        <SeriesContext.Provider
            value={{
                series,
                seriesBooks,
                getSeries,
                getSeriesBooks,
                addSeries,
                addSeriesBook
            }}
        >
            {props.children}
        </SeriesContext.Provider>
    );
}