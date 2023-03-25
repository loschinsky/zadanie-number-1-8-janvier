import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { getQuality } = useQualities();
    const newQualties = [];
    qualities.map((item) => {
        const currentQuality = getQuality(item);
        return newQualties.push(currentQuality);
    });

    return (
        <>
            {newQualties.map((item) => (
                <Quality key={item._id} {...item} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
