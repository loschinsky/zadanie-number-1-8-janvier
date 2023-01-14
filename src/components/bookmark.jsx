import React from "react";
import PropTypes from "prop-types";
const MakeBookmark = ({ onHandleToggleBookmark1, status, id }) => {
    return (
        <button onClick={() => onHandleToggleBookmark1(id)}>
            <i className={"bi bi-0-circle" + (status ? "-fill" : "")}></i>
        </button>
    );
};
export default MakeBookmark;
MakeBookmark.propTypes = {
    onHandleToggleBookmark1: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};
