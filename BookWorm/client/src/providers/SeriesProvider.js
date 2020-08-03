import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";

export const SeriesContext = createContext();

export const SeriesProvider = (props) => {

    const [series, setSeries] = useState([]);

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

    return (
        <SeriesContext.Provider
            value={{
                series,
                getSeries,
                addSeries
            }}
        >
            {props.children}
        </SeriesContext.Provider>
    );
}