import React from "react";
import PropTypes from "prop-types";
import MakeQuality from "./qualitie";
const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <MakeQuality key={item._id} {...item} />
            ))}
        </>
    );
};

export default QualitiesList;

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
