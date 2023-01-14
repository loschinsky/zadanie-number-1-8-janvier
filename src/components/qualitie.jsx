import React from "react";
import PropTypes from "prop-types";
const MakeQuality = ({ color, name }) => {
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default MakeQuality;
MakeQuality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
