import React from "react";
import MakeBookmark from "./bookmark";
import MakeQuality from "./qualitie";
import PropTypes from "prop-types";
const MakeUser = ({
    name,
    completedMeetings,
    profession,
    qualities,
    rate,
    _id,
    bookmark,
    onHandleDelete,
    onHandleToggleBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((item) => (
                    <MakeQuality key={item._id} {...item} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                <MakeBookmark
                    status={bookmark}
                    onClick={() => onHandleToggleBookmark(_id)}
                    
                    
                />
            </td>
            <td>
                <button
                    onClick={() => onHandleDelete(_id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    );
};
export default MakeUser;
MakeUser.propTypes = {
    name: PropTypes.string.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.array.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onHandleDelete1: PropTypes.func.isRequired,
    onHandleToggleBookmark1: PropTypes.func.isRequired
};
