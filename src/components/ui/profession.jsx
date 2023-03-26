import React from "react";
import { useProffesions } from "../../hooks/useProffesion";
import PropTypes from "prop-types";
const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProffesions();
    const prof = getProfession(id);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
