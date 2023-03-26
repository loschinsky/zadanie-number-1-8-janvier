import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {qualities.map((item) => (
                <Quality key={item} _id={item} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
