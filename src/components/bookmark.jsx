import React from "react";
import PropTypes from "prop-types";
const MakeBookmark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-0-circle" + (status ? "-fill" : "")}></i>
        </button>
    );
};
export default MakeBookmark;
MakeBookmark.propTypes = {
    status: PropTypes.bool.isRequired
};
